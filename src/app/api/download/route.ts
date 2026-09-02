import { NextResponse } from "next/server";
import {
  assetPath,
  verifyDownload,
  DOWNLOAD_LIMIT,
} from "@/lib/pdfShop";
import { downloadsSoFar, countDownload } from "@/lib/stripe";

/* Отдает купленный файл.

   Ссылка подписана, живет тридцать дней и работает пять раз. Правку
   внутри ссылки распознаем сразу: подпись перестает сходиться.

   Прямого адреса файла покупатель не видит: он получает эту ссылку,
   а настоящее место хранения остается внутри сайта.

   Если проверить счетчик не удалось, файл все равно отдаем. Покупатель
   заплатил, и оставлять его без книги из-за нашего сбоя нельзя. */

export const runtime = "nodejs";

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

  const origin = new URL(request.url).origin;
  const response = NextResponse.redirect(
    origin + assetPath(claim.id, claim.format),
    302
  );
  response.headers.set("Cache-Control", "no-store");
  return response;
}
