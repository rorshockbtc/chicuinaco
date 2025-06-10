import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";
import { restaurantInfo } from "../data/content";
import { MapPin, Clock, Phone } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16 md:py-24 bg-neutral-800 dark:bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-neutral-300">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location */}
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-blue/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary-blue" />
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">
              {t('contact.location.title')}
            </h3>
            <p className="text-neutral-300 mb-2">
              {t('contact.location.address')}
            </p>
            <a 
              href={`https://maps.google.com/?q=${restaurantInfo.coordinates.lat},${restaurantInfo.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:text-primary-blue-light transition-colors text-sm"
            >
              {t('contact.location.directions')}
            </a>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-blue/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary-blue" />
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">
              {t('contact.hours.title')}
            </h3>
            <p className="text-neutral-300">
              {t('contact.hours.daily')}
            </p>
          </div>

          {/* Phone */}
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-blue/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary-blue" />
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">
              {t('contact.phone.title')}
            </h3>
            <a 
              href={`tel:${restaurantInfo.phone}`}
              className="text-neutral-300 hover:text-primary-blue transition-colors"
            >
              {restaurantInfo.phone}
            </a>
          </div>
        </div>
        
        {/* View Section */}
        <div className="mt-16 text-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <img 
              src={images.contact.view}
              alt={images.contact.alt}
              className="w-full h-64 md:h-80 object-cover" 
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white font-playfair text-2xl md:text-3xl font-bold text-center px-4">
                {t('contact.view.text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
