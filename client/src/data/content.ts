// Central content management file for easy editing
export const restaurantInfo = {
  name: "Chicuinaco",
  fullName: "Hacienda & Restaurante Chicuinaco",
  pronunciation: "Chee-quee-nacco",
  location: "Teotepeque, La Libertad, El Salvador",
  mountainRange: "Cordillera del Bálsamo (Balsam Mountain Range)",
  plusCode: "765GHFWJ+39",
  phone: "+503 6446-2404",
  phoneClean: "50364462404",
  coordinates: {
    lat: 13.59525,
    lng: -89.51903
  },
  hours: {
    daily: "11:00 AM - 7:30 PM"
  },
  estate: {
    acres: 65,
    manzanas: 40,
    hikeDurationHours: 3,
    waterfallPoolMinutes: 30
  },
  capacity: {
    restaurant: 50,
    events: 100,
    accommodation: 8,
    bedrooms: 2,
    beds: "4 double beds (1 in first bedroom, 3 in second)",
    bathrooms: "1 shared bathroom + living room"
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61558176405317",
    facebookName: "Comedor Chicuinaco"
  }
};

export const menuItems = [
  {
    id: "alitas",
    name: "Alitas Especiales",
    category: "specialties"
  },
  {
    id: "churrasco",
    name: "Churrasco Asada",
    category: "grilled"
  },
  {
    id: "tacos",
    name: "Tacos Típicos",
    category: "traditional"
  },
  {
    id: "yuca",
    name: "Yuca Frita",
    category: "traditional"
  },
  {
    id: "burger",
    name: "Hamburguesa Especial",
    category: "american"
  },
  {
    id: "hotdog",
    name: "Hot Dog Especial",
    category: "american"
  }
];

export const contactInfo = {
  email: "restaurantechicuinaco@gmail.com",
  whatsapp: "50364462404",
  phoneDisplay: "+503 6446-2404"
};

export function getWhatsAppUrl(customMessage?: string): string {
  const base = `https://wa.me/${contactInfo.whatsapp}`;
  if (!customMessage) return base;
  return `${base}?text=${encodeURIComponent(customMessage)}`;
}

export function getPhoneUrl(): string {
  return `tel:+${contactInfo.whatsapp}`;
}

export function getGoogleMapsUrl(): string {
  return `https://maps.google.com/?q=${restaurantInfo.coordinates.lat},${restaurantInfo.coordinates.lng}`;
}
