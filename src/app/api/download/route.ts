import { NextResponse } from "next/server";
import { get, issueSignedToken, presignUrl } from "@vercel/blob";
import {
  blobPath,
  assetFileName,
  verifyDownload,
  DOWNLOAD_LIMIT,
} from "@/lib/pdfShop";
import { downloadsSoFar, countDownload } from "@/lib/stripe";

/* Отдает купленный файл.

   Ссылка подписана, живет тридцать дней и работает пять раз. Правку
   внутри ссылки распознаем сразу: подпись перестает сходиться.

   Сам файл лежит в закрытой кладовке, публичного адреса у него нет.
   Убедившись, что покупка настоящая, выписываем на него разовый пропуск
   на пятнадцать минут и отправляем покупателя по нему. Пропуск истекает
   сам, дальше по нему никто не пройдет.

   Если выписать пропуск не вышло, отдаем файл сами, через сайт. Дороже
   и медленнее, зато покупатель без книги не остается.

   Если проверить счетчик не удалось, файл все равно отдаем. Покупатель
   заплатил, и оставлять его без книги из-за нашего сбоя нельзя. */

export const runtime = "nodejs";
export const maxDuration = 60;

/* Сколько живет разовый пропуск в кладовку. Пятнадцать минут: с запасом
   на то, чтобы человек успел нажать и файл начал качаться, и слишком
   мало, чтобы такую ссылку имело смысл кому-то пересылать. */
const PASS_TTL_MS = 15 * 60 * 1000;

const REFUSAL =
  "This download link is no longer active. Links work for 30 days and up to " +
  `${DOWNLOAD_LIMIT} downloads.\n` +
  "Write to magicofdiscoveries@gmail.com and we will send you a new one.\n\n" +
  "Este enlace de descarga ya no está activo. Los enlaces duran 30 días y " +
  `hasta ${DOWNLOAD_LIMIT} descargas.\n` +
  "Escriba a magicofdiscoveries@gmail.com y le enviaremos uno nuevo.\n";

const refuse = () =>
  new NextResponse(REFUSAL, {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

/** Разовый пропуск в кладовку: на один файл и на короткое время. */
async function pass(pathname: string): Promise<string> {
  const validUntil = Date.now() + PASS_TTL_MS;
  const token = await issueSignedToken({
    pathname,
    operations: ["get"],
    validUntil,
  });
  const { presignedUrl } = await presignUrl(token, {
    access: "private",
    operation: "get",
    pathname,
    validUntil,
  });
  return presignedUrl;
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("t") ?? "";
  const claim = verifyDownload(token);
  if (!claim) return refuse();

  if (claim.session) {
    try {
      const used = await downloadsSoFar(claim.session);
      if (used >= DOWNLOAD_LIMIT) return refuse();
      await countDownload(claim.session, used);
    } catch (error) {
      console.error("download counter failed", error);
    }
  }

  const pathname = blobPath(claim.id, claim.format);

  try {
    const response = NextResponse.redirect(await pass(pathname), 302);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("blob pass failed, serving through the site", error);
  }

  try {
    const file = await get(pathname, { access: "private" });
    if (!file || file.statusCode !== 200) {
      console.error("book missing in the store", pathname);
      return refuse();
    }
    return new NextResponse(file.stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(file.blob.size),
        "Content-Disposition": `inline; filename="${assetFileName(
          claim.id,
          claim.format
        )}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("book download failed", pathname, error);
    return refuse();
  }
}
