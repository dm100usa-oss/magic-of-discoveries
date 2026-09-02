import type { UiLang } from "@/data/books";

/* ---------------------------------------------------------------------------
   Слова, которые покупатель видит после оплаты.

   Лежат отдельно от общего словаря сайта намеренно: один и тот же текст
   идет и на страницу благодарности, и в письмо со ссылкой. Держать его
   в одном месте надежнее, чем сводить два похожих набора.
--------------------------------------------------------------------------- */

export type ShopCopy = {
  /** Заголовок страницы после оплаты. */
  title: string;
  /** Первая строка: что произошло и что делать. */
  lead: string;
  /** Надпись на кнопке скачивания. */
  download: string;
  /** Сколько ссылка живет. */
  expiry: string;
  /** Письмо тоже отправлено, проверьте папку со спамом. */
  emailed: string;
  /** Что делать, если файл не скачался. */
  help: string;
  /** Заголовок письма. */
  emailSubject: string;
  /** Первая строка письма. */
  emailLead: string;
  /** Подпись под письмом. */
  emailSign: string;
  /** Если оплата не прошла или ссылку открыли без заказа. */
  notFound: string;
  backHome: string;
};

export const shopCopy: Record<UiLang, ShopCopy> = {
  en: {
    title: "Thank you. Your book is ready.",
    lead: "Payment went through. The file is yours to keep, print at home as many times as you like.",
    download: "Download the PDF",
    expiry: "This link works for the next 24 hours.",
    emailed:
      "We have also sent the link to your email. If it is not there in a few minutes, check the spam folder.",
    help: "Trouble downloading? Write to magicofdiscoveries@gmail.com and we will help.",
    emailSubject: "Your printable book from Magic of Discoveries",
    emailLead:
      "Thank you for your purchase. Here is your book, ready to print at home.",
    emailSign:
      "Magic of Discoveries LLC, Miami, Florida. Reply to this message if anything is wrong and we will sort it out.",
    notFound:
      "We could not find this order. If you have paid and cannot reach your file, write to magicofdiscoveries@gmail.com and we will send it straight away.",
    backHome: "Back to the books",
  },
  es: {
    title: "Gracias. Su libro está listo.",
    lead: "El pago se realizó correctamente. El archivo es suyo: puede imprimirlo en casa cuantas veces quiera.",
    download: "Descargar el PDF",
    expiry: "Este enlace funciona durante las próximas 24 horas.",
    emailed:
      "También le enviamos el enlace por correo. Si no llega en unos minutos, revise la carpeta de correo no deseado.",
    help: "¿Problemas con la descarga? Escriba a magicofdiscoveries@gmail.com y le ayudamos.",
    emailSubject: "Su libro para imprimir de Magic of Discoveries",
    emailLead:
      "Gracias por su compra. Aquí tiene su libro, listo para imprimir en casa.",
    emailSign:
      "Magic of Discoveries LLC, Miami, Florida. Responda a este mensaje si algo no está bien y lo resolvemos.",
    notFound:
      "No encontramos este pedido. Si ya pagó y no puede abrir su archivo, escriba a magicofdiscoveries@gmail.com y se lo enviamos enseguida.",
    backHome: "Volver a los libros",
  },
  ru: {
    title: "Спасибо. Книга готова.",
    lead: "Оплата прошла. Файл ваш, печатайте дома сколько угодно раз.",
    download: "Скачать PDF",
    expiry: "Ссылка работает сутки.",
    emailed:
      "Ссылку мы отправили и на почту. Если письма нет через несколько минут, посмотрите папку со спамом.",
    help: "Файл не скачивается? Напишите на magicofdiscoveries@gmail.com, поможем.",
    emailSubject: "Ваша книга для печати от Magic of Discoveries",
    emailLead: "Спасибо за покупку. Вот ваша книга, готовая к печати дома.",
    emailSign:
      "Magic of Discoveries LLC, Майами, Флорида. Ответьте на это письмо, если что-то не так, и мы разберемся.",
    notFound:
      "Не нашли этот заказ. Если оплата прошла, а файла нет, напишите на magicofdiscoveries@gmail.com, вышлем сразу.",
    backHome: "Вернуться к книгам",
  },
};
