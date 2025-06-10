import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-neutral-900 text-neutral-400 text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-lavishly text-2xl text-primary-blue mb-4">
          Chicuinaco
        </div>
        <p className="text-sm">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
