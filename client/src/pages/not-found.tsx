import { Link } from "wouter";
import { useLanguage } from "@/components/LanguageProvider";
import { Eyebrow } from "@/components/motion";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="grain min-h-screen w-full flex flex-col justify-between bg-paper text-ink px-5 sm:px-8 lg:px-12 py-12">
      <div>
        <Link href="/">
          <a className="font-lavishly text-[2.2rem] leading-none text-ink">Chicuinaco</a>
        </Link>
      </div>

      <main className="max-w-3xl my-auto py-16">
        <Eyebrow>{t("not_found.eyebrow")}</Eyebrow>
        <h1 className="type-h1 text-ink mt-6">{t("not_found.title")}</h1>
        <p className="type-body mt-6 max-w-[52ch]">{t("not_found.description")}</p>
        <div className="mt-10">
          <Link href="/">
            <a className="btn-primary">{t("not_found.back_home")}</a>
          </Link>
        </div>
      </main>

      <div className="border-t border-rule pt-6 text-[0.75rem] tracking-[0.08em] text-muted-ink">
        13.595° N · 89.519° W — Teotepeque, La Libertad, El Salvador
      </div>
    </div>
  );
}
