// Central image management system for easy updates
// To change images, simply replace the URLs in this file
// All images should be optimized for web (compressed, proper dimensions)

export const images = {
  hero: {
    main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    alt: "Panoramic view of Salvadoran mountain valley at sunset"
  },
  story: {
    hacienda: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=600",
    alt: "Hacienda Chicuinaco under construction with green trim and arched architecture"
  },
  menu: {
    alitas: "https://pixabay.com/get/g674d9545a7f8e07ed4936a6ae042efcdfb176722c08292f896865fb2c6ba3c764cb3b17b10a28a60659a48d806bfc8df2d147f6f33e0b55803638f3275e2e929_1280.jpg",
    churrasco: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
    tacos: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
    burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
    hotdog: "https://pixabay.com/get/gab43b94b3858c5d576339a3f02ddb80b862ffc1e1bbb1994146311dcb497aad42b57c269f4ed65854c30b27bbb747f51120f22dc44523b517f955750eda4d92a_1280.jpg",
    yuca: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300"
  },
  contact: {
    view: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx4fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600",
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
