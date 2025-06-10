import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";
import { menuItems } from "../data/content";

export default function Menu() {
  const { t } = useLanguage();

  const menuData = [
    {
      id: "alitas",
      image: images.menu.alitas,
      alt: "Traditional rice with salad and fried plantains"
    },
    {
      id: "churrasco",
      image: images.menu.churrasco,
      alt: "Grilled meat platter with rice and chorizo"
    },
    {
      id: "tacos",
      image: images.menu.tacos,
      alt: "Traditional tacos with colorful salsas and lime"
    },
    {
      id: "burger",
      image: images.menu.burger,
      alt: "Gourmet burger with cheese and french fries"
    },
    {
      id: "hotdog",
      image: images.menu.hotdog,
      alt: "Loaded hot dog with toppings and crispy fries"
    },
    {
      id: "yuca",
      image: images.menu.yuca,
      alt: "Golden fried yuca pieces with dipping sauce"
    }
  ];

  return (
    <section id="menu" className="py-16 md:py-24 bg-white dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            {t('menu.title')}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            {t('menu.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData.map((item) => (
            <div key={item.id} className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                  {t(`menu.${item.id}.title`)}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  {t(`menu.${item.id}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
