import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/Chrome";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/books";

export function generateStaticParams() {
  return activeLangs.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!activeLangs.includes(lang as UiLang)) notFound();
  const l = lang as UiLang;
  return (
    <div lang={dictionaries[l].htmlLang}>
      <Header lang={l} />
      <main>{children}</main>
      <Footer lang={l} />
    </div>
  );
}
