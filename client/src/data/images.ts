// Central image & media management system using enhanced WebP assets from Chicuinaco

import heroViewPath from "@assets/enhanced/hero-sunset-valley.webp";
import restaurantPath from "@assets/enhanced/restaurant-exterior.webp";
import underConstructionPath from "@assets/enhanced/hacienda-arches.webp";
import alitasPath from "@assets/enhanced/menu-alitas.webp";
import churrascoPath from "@assets/enhanced/menu-churrasco-asada.webp";
import tacosPath from "@assets/enhanced/menu-tacos-tipicos.webp";
import burgerPath from "@assets/enhanced/menu-hamburguesa-papas-fritas.webp";
import hotdogPath from "@assets/enhanced/menu-hot-dog-papas-fritas.webp";
import yucaPath from "@assets/enhanced/menu-yuca-frita.webp";
import diningViewPath from "@assets/enhanced/view-from-dining-area.webp";

// Waterfall Hiking assets (65 acres / 40 manzanas)
import waterfallTrailPath from "@assets/enhanced/waterfall-trail-valley.webp";
import waterfallCascadePath from "@assets/enhanced/waterfall-cascade-pools.webp";
import waterfallHikersPath from "@assets/enhanced/waterfall-hikers-climb.webp";

// Covered Patio Event Venue assets (up to 100 guests)
import eventCoveredPatioPath from "@assets/enhanced/event-covered-patio-banquet.webp";
import eventLargeViewPath from "@assets/enhanced/view-event-large.webp";
import eventBabyShowerPath from "@assets/enhanced/view-event-baby-shower.webp";

// Hacienda Suite & Room assets (up to 8 guests)
import roomPrimaryPath from "@assets/enhanced/room-primary-bedroom.webp";
import roomTriplePath from "@assets/enhanced/room-second-bedroom-triple.webp";
import roomLivingRoomPath from "@assets/enhanced/room-living-room-suite.webp";
import roomBathroomPath from "@assets/enhanced/room-shared-bathroom.webp";

// Balsamo Oil Production videos (Balsam Mountain Range)
import balsamoPressWideVideo from "@assets/balsamo-timber-press-wide.mp4";
import balsamoExtractionCloseVideo from "@assets/balsamo-extraction-closeup.mp4";
import balsamoPressPosterPath from "@assets/enhanced/balsamo-press-poster.webp";
import balsamoExtractionPosterPath from "@assets/enhanced/balsamo-extraction-poster.webp";

export const images = {
  hero: {
    main: heroViewPath,
    alt: "Panoramic sunset view from Chicuinaco showing the Balsam Mountain Range and valley in Teotepeque"
  },
  story: {
    hacienda: underConstructionPath,
    restaurant: restaurantPath,
    alt: "Hacienda Chicuinaco with signature emerald-green arches and covered patio"
  },
  accommodation: {
    cover: underConstructionPath,
    primaryBedroom: roomPrimaryPath,
    secondBedroom: roomTriplePath,
    livingRoom: roomLivingRoomPath,
    bathroom: roomBathroomPath,
    gallery: [
      {
        src: roomLivingRoomPath,
        alt: "Private living room included with the Hacienda suite with arch window and seating",
        captionKey: "accommodation.caption_living"
      },
      {
        src: roomPrimaryPath,
        alt: "Primary bedroom with double bed and rocking chair at Hacienda Chicuinaco",
        captionKey: "accommodation.caption_primary"
      },
      {
        src: roomTriplePath,
        alt: "Spacious second bedroom featuring 3 double beds accommodating families or groups",
        captionKey: "accommodation.caption_triple"
      },
      {
        src: roomBathroomPath,
        alt: "Clean shared full bathroom with walk-in shower and natural stone tile",
        captionKey: "accommodation.caption_bathroom"
      }
    ]
  },
  restaurant: {
    main: restaurantPath,
    alt: "Restaurante Chicuinaco exterior with covered seating and green lawn"
  },
  hiking: {
    main: waterfallHikersPath,
    cascade: waterfallCascadePath,
    trail: waterfallTrailPath,
    gallery: [
      {
        src: waterfallHikersPath,
        alt: "Adventurers climbing the multi-tiered waterfall at the bottom of the Chicuinaco valley",
        captionKey: "hiking.caption_climb"
      },
      {
        src: waterfallCascadePath,
        alt: "Crystal-clear cascading waterfall and natural rock pools at Chicuinaco",
        captionKey: "hiking.caption_pools"
      },
      {
        src: waterfallTrailPath,
        alt: "Lush jungle river trail leading to the Chicuinaco waterfall",
        captionKey: "hiking.caption_trail"
      }
    ]
  },
  events: {
    main: eventCoveredPatioPath,
    banquetValley: eventLargeViewPath,
    celebrationArch: eventBabyShowerPath,
    gallery: [
      {
        src: eventCoveredPatioPath,
        alt: "Large covered arched patio at Chicuinaco set with banquet tables and chairs for up to 100 guests",
        captionKey: "events.caption_banquet"
      },
      {
        src: eventLargeViewPath,
        alt: "Covered patio event setup with red table linens overlooking the Teotepeque mountain valley",
        captionKey: "events.caption_valley"
      },
      {
        src: eventBabyShowerPath,
        alt: "Custom party decoration and balloon arch on the covered terrace at Chicuinaco",
        captionKey: "events.caption_celebration"
      }
    ]
  },
  balsamo: {
    videoWide: balsamoPressWideVideo,
    videoClose: balsamoExtractionCloseVideo,
    posterWide: balsamoPressPosterPath,
    posterClose: balsamoExtractionPosterPath
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
    alt: "Breathtaking view from the Chicuinaco dining area overlooking the lush valley and Cordillera del Bálsamo"
  }
};

export const imageSettings = {
  hero: {
    sizes: "100vw",
    priority: true
  },
  menu: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority: false
  },
  story: {
    sizes: "(max-width: 768px) 100vw, 50vw",
    priority: false
  }
};
