/* ---------------------------------------------------------------------------
   Разговор со Stripe.

   Сторонняя библиотека здесь намеренно не подключается: нам нужны всего
   два обращения, а у проекта до сих пор ровно две зависимости, и это
   его сильная сторона. Меньше чужого кода на сайте оплаты означает
   меньше поводов для беспокойства.

   Ключ лежит в настройках проекта, в коде его нет и быть не должно.
--------------------------------------------------------------------------- */

const API = "https://api.stripe.com/v1/";

function key(): string {
  const value = process.env.STRIPE_SECRET_KEY;
  if (!value) throw new Error("STRIPE_SECRET_KEY не задан");
  return value;
}

/** Отправляет запрос в Stripe. Значения передаются парами имя-значение,
    как того требует их приемная. */
export async function stripe(
  path: string,
  body?: Record<string, string>
): Promise<Record<string, unknown>> {
  const response = await fetch(API + path, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${key()}`,
      ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
    cache: "no-store",
  });

  const raw = await response.text();
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error(
      `Stripe ответил ${response.status}: ${raw.slice(0, 200)}`
    );
  }
  if (!response.ok) {
    const error = data.error as { message?: string } | undefined;
    throw new Error(error?.message ?? `Stripe ответил ${response.status}`);
  }
  return data;
}

/** Оплачен ли заказ. Возвращает то, что нужно для выдачи файла. */
export type PaidOrder = {
  book: string;
  format: string;
  lang: string;
  email: string | null;
};

export async function paidOrder(sessionId: string): Promise<PaidOrder | null> {
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;

  const session = await stripe(`checkout/sessions/${sessionId}`);
  if (session.payment_status !== "paid") return null;

  const meta = (session.metadata ?? {}) as Record<string, string>;
  const details = session.customer_details as { email?: string } | undefined;

  return {
    book: meta.book ?? "",
    format: meta.format ?? "",
    lang: meta.lang ?? "en",
    email: details?.email ?? null,
  };
}
