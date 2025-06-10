import { useLanguage } from "./LanguageProvider";
import { Building, Users, Home } from "lucide-react";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Building,
      titleKey: 'features.restaurant.title',
      descriptionKey: 'features.restaurant.description',
      items: [
        'features.restaurant.local_dishes',
        'features.restaurant.american_favorites',
        'features.restaurant.daily_hours'
      ]
    },
    {
      icon: Users,
      titleKey: 'features.events.title',
      descriptionKey: 'features.events.description',
      items: [
        'features.events.capacity',
        'features.events.covered',
        'features.events.organizations'
      ]
    },
    {
      icon: Home,
      titleKey: 'features.accommodation.title',
      descriptionKey: 'features.accommodation.description',
      items: [
        'features.accommodation.bedrooms',
        'features.accommodation.guests',
        'features.accommodation.views'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6 text-primary-blue" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {t(feature.descriptionKey)}
                </p>
                <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-2">
                  {feature.items.map((itemKey, itemIndex) => (
                    <li key={itemIndex}>{t(itemKey)}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
