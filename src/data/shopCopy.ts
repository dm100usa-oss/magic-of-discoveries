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
  /* Первая и последняя строки письма написаны в двух видах.
     Раскраски Маленького Макса покупают малышу, и там уместно
     говорить о ребенке. Раскраски "Передышка" покупают взрослые
     себе, и обращение к малышу выглядело бы ошибкой. */
  emailLeadKids: string;
  emailLeadGeneral: string;
  emailCloseKids: string;
  emailCloseGeneral: string;
  /** Строка "Формат:" перед размером листа. */
  emailFormat: string;
  /** Что делать, если файл не скачался. Для письма, с ответом на него. */
  emailHelp: string;
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
    expiry: "This download link is valid for 24 hours.",
    emailed:
      "We have also sent the link to your email. If it is not there in a few minutes, check the spam folder.",
    help: "Trouble downloading? Write to magicofdiscoveries@gmail.com and we will help.",
    emailSubject: "Your printable book from Magic of Discoveries",
    emailLeadKids:
      "Thank you for your purchase! We hope this book brings your little one many happy, creative moments. 💛",
    emailLeadGeneral:
      "Thank you for your purchase! We hope this book brings you many happy, creative moments. 💛",
    emailCloseKids: "Wishing you and your little one happy coloring!",
    emailCloseGeneral: "Wishing you happy coloring!",
    emailFormat: "Format",
    emailHelp:
      "If the file will not download, or if you have any questions, just reply to this message or write to magicofdiscoveries@gmail.com. We will be glad to help.",
    emailSign: "Magic of Discoveries LLC, Miami, Florida",
    notFound:
      "We could not find this order. If you have paid and cannot reach your file, write to magicofdiscoveries@gmail.com and we will send it straight away.",
    backHome: "Back to the books",
  },
  es: {
    title: "Gracias. Su libro está listo.",
    lead: "El pago se realizó correctamente. El archivo es suyo: puede imprimirlo en casa cuantas veces quiera.",
    download: "Descargar el PDF",
    expiry: "Este enlace de descarga es válido durante 24 horas.",
    emailed:
      "También le enviamos el enlace por correo. Si no llega en unos minutos, revise la carpeta de correo no deseado.",
    help: "¿Problemas con la descarga? Escriba a magicofdiscoveries@gmail.com y le ayudamos.",
    emailSubject: "Su libro para imprimir de Magic of Discoveries",
    emailLeadKids:
      "¡Gracias por su compra! Esperamos que este libro le regale a su pequeño muchos momentos felices y creativos. 💛",
    emailLeadGeneral:
      "¡Gracias por su compra! Esperamos que este libro le regale muchos momentos felices y creativos. 💛",
    emailCloseKids: "¡Que disfruten mucho coloreando!",
    emailCloseGeneral: "¡Que disfrute mucho coloreando!",
    emailFormat: "Formato",
    emailHelp:
      "Si el archivo no se descarga o tiene alguna pregunta, responda a este mensaje o escríbanos a magicofdiscoveries@gmail.com. Con mucho gusto le ayudamos.",
    emailSign: "Magic of Discoveries LLC, Miami, Florida",
    notFound:
      "No encontramos este pedido. Si ya pagó y no puede abrir su archivo, escriba a magicofdiscoveries@gmail.com y se lo enviamos enseguida.",
    backHome: "Volver a los libros",
  },
  ru: {
    title: "Спасибо. Книга готова.",
    lead: "Оплата прошла. Файл ваш, печатайте дома сколько угодно раз.",
    download: "Скачать PDF",
    expiry: "Ссылка для скачивания действует 24 часа.",
    emailed:
      "Ссылку мы отправили и на почту. Если письма нет через несколько минут, посмотрите папку со спамом.",
    help: "Файл не скачивается? Напишите на magicofdiscoveries@gmail.com, поможем.",
    emailSubject: "Ваша книга для печати от Magic of Discoveries",
    emailLeadKids:
      "Спасибо за покупку! Надеемся, эта книга подарит вашему малышу много приятных и творческих минут. 💛",
    emailLeadGeneral:
      "Спасибо за покупку! Надеемся, эта книга подарит вам много приятных и творческих минут. 💛",
    emailCloseKids: "Желаем вам и вашему малышу приятного раскрашивания!",
    emailCloseGeneral: "Желаем вам приятного раскрашивания!",
    emailFormat: "Формат",
    emailHelp:
      "Если файл не скачивается или возникнут вопросы, просто ответьте на это письмо или напишите нам на magicofdiscoveries@gmail.com, мы обязательно поможем.",
    emailSign: "Magic of Discoveries LLC, Майами, Флорида",
    notFound:
      "Не нашли этот заказ. Если оплата прошла, а файла нет, напишите на magicofdiscoveries@gmail.com, вышлем сразу.",
    backHome: "Вернуться к книгам",
  },
};
