import { NextResponse } from "next/server";
import { assetPath, verifyDownload } from "@/lib/pdfShop";

/* Отдает купленный файл.

   Ссылка подписана и содержит срок годности. Если срок вышел или
   в ссылке что-то поправили, файл не выдается: покупатель видит
   короткое объяснение и адрес почты, куда написать.

   Прямого адреса файла покупатель не видит: он получает эту ссылку,
   а настоящее место хранения остается внутри сайта. */

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("t") ?? "";
  const claim = verifyDownload(token);

  if (!claim) {
    return new NextResponse(
      "This download link has expired. Links stay active for 24 hours.\n" +
        "Write to magicofdiscoveries@gmail.com and we will send a new one.\n\n" +
        "Este enlace de descarga ha caducado. Los enlaces duran 24 horas.\n" +
        "Escriba a magicofdiscoveries@gmail.com y le enviaremos uno nuevo.\n",
      {
        status: 410,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const origin = new URL(request.url).origin;
  const response = NextResponse.redirect(
    origin + assetPath(claim.id, claim.format),
    302
  );
  response.headers.set("Cache-Control", "no-store");
  return response;
}
