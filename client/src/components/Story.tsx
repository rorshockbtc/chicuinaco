import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";

export default function Story() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-16 md:py-24 bg-white dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
              {t('story.title')}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t('story.paragraph1')}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t('story.paragraph2')}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300">
                {t('story.paragraph3')}
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src={images.story.hacienda}
              alt={images.story.alt}
              className="rounded-2xl shadow-xl w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
