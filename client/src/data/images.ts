// Central image management system using provided assets
// Authentic images from Restaurante Chicuinaco

import heroViewPath from "@assets/hero-view-from-chicuinaco_1749570846060.png";
import restaurantPath from "@assets/feature-chicuinaco-restaurant_1749570846057.png";
import underConstructionPath from "@assets/feature-chicuinaco-under-construction_1749570846060.png";
import alitasPath from "@assets/menu-alitas_1749570846060.png";
import churrascoPath from "@assets/menu-churrasco-asada_1749570846060.png";
import tacosPath from "@assets/menu-tacos-tipicos_1749570846060.png";
import burgerPath from "@assets/menu-hamburguesa-papas-fritas_1749570846060.png";
import hotdogPath from "@assets/menu-hot-dog-papas-fritas_1749570846060.png";
import yucaPath from "@assets/menu-yuca-frita_1749570846060.png";
import diningViewPath from "@assets/view-from-dining-area_1749570846060.png";

export const images = {
  hero: {
    main: heroViewPath,
    alt: "Panoramic view from Chicuinaco showing beautiful Salvadoran valley and mountains"
  },
  story: {
    hacienda: underConstructionPath,
    alt: "Hacienda Chicuinaco under construction with green trim and covered seating area"
  },
  restaurant: {
    main: restaurantPath,
    alt: "Restaurante Chicuinaco exterior with modern covered structure"
  },
  menu: {
    alitas: alitasPath,
    churrasco: churrascoPath,
    tacos: tacosPath,
    burger: burgerPath,
    hotdog: hotdogPath,
    yuca: yucaPath
  },
  contact: {
    view: diningViewPath,
    alt: "Beautiful view from restaurant dining area showing lush green valley and mountains"
  }
};

// Image optimization settings
export const imageSettings = {
  hero: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw",
    priority: true
  },
  menu: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority: false
  },
  story: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw", 
    priority: false
  }
};