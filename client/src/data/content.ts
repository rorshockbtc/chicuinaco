// Central content management file for easy editing by non-technical users
// To update content, simply modify the values in this file

export const restaurantInfo = {
  name: "Chicuinaco",
  fullName: "Restaurante Chicuinaco",
  location: "Teotepeque, El Salvador",
  phone: "+503 6446-2404",
  coordinates: {
    lat: 13.59525,
    lng: -89.51903
  },
  hours: {
    daily: "11:00 AM - 7:30 PM"
  },
  capacity: {
    restaurant: 50,
    events: 100,
    accommodation: 6
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
    id: "burger",
    name: "Hamburguesa Especial",
    category: "american"
  },
  {
    id: "hotdog",
    name: "Hot Dog Especial",
    category: "american"
  },
  {
    id: "yuca",
    name: "Yuca Frita",
    category: "traditional"
  }
];

// Easy way to update social media links and contact info
export const contactInfo = {
  email: "info@chicuinaco.com", // Update with actual email
  facebook: "", // Update with actual Facebook page
  instagram: "", // Update with actual Instagram
  whatsapp: "+50312345678" // Update with actual WhatsApp number
};
