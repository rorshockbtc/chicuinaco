import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";

export default function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${images.hero.main}')` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4">
          {t('hero.title')}
        </h1>
        <p className="font-playfair text-xl md:text-2xl mb-2 italic">
          {t('hero.subtitle')}
        </p>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection('menu')}
            className="inline-flex items-center px-8 py-3 bg-primary-blue hover:bg-primary-blue-dark text-white font-medium rounded-lg transition-colors"
          >
            {t('hero.menu_button')}
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-neutral-900 text-white font-medium rounded-lg transition-colors"
          >
            {t('hero.contact_button')}
          </Button>
        </div>
      </div>
    </section>
  );
}
