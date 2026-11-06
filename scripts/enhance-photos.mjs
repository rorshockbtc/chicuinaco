import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("attached_assets");
const OUT_DIR = path.resolve("attached_assets/enhanced");

fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Tailored editorial lighting & color grade presets per photo.
 * Uses adaptive local contrast (CLAHE with low maxSlope) to open shadows
 * in valleys and covered arches while preserving sky/water highlights,
 * paired with color vibrance modulation and optical sharpening.
 */
const JOBS = [
  {
    src: "hero-view-from-chicuinaco_1749570846060.png",
    out: "hero-sunset-valley.webp",
    maxWidth: 2200,
    clahe: { width: 80, height: 80, maxSlope: 2 },
    modulate: { brightness: 1.07, saturation: 1.32, hue: 2 },
    linear: [1.08, -8],
    sharpen: { sigma: 0.95, m1: 0.8, m2: 1.6 },
    quality: 88
  },
  {
    src: "feature-chicuinaco-under-construction-new_1749573527274.png",
    out: "hacienda-arches.webp",
    maxWidth: 1800,
    clahe: { width: 72, height: 72, maxSlope: 2 },
    modulate: { brightness: 1.08, saturation: 1.26 },
    linear: [1.07, -6],
    sharpen: { sigma: 0.9, m1: 0.7, m2: 1.4 },
    quality: 86
  },
  {
    src: "feature-chicuinaco-restaurant_1749570846057.png",
    out: "restaurant-exterior.webp",
    maxWidth: 1600,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.09, saturation: 1.28 },
    linear: [1.07, -6],
    sharpen: { sigma: 0.9, m1: 0.7, m2: 1.4 },
    quality: 86
  },
  {
    src: "waterfall-hikers-climb.jpeg",
    out: "waterfall-hikers-climb.webp",
    maxWidth: 1600,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.07, saturation: 1.30 },
    linear: [1.08, -7],
    sharpen: { sigma: 1.0, m1: 0.8, m2: 1.6 },
    quality: 86
  },
  {
    src: "waterfall-cascade-pools.jpeg",
    out: "waterfall-cascade-pools.webp",
    maxWidth: 1600,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.07, saturation: 1.30 },
    linear: [1.08, -7],
    sharpen: { sigma: 1.0, m1: 0.8, m2: 1.6 },
    quality: 86
  },
  {
    src: "waterfall-trail-valley.jpeg",
    out: "waterfall-trail-valley.webp",
    maxWidth: 1600,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.09, saturation: 1.28 },
    linear: [1.07, -6],
    sharpen: { sigma: 0.95, m1: 0.8, m2: 1.5 },
    quality: 86
  },
  {
    src: "event-covered-patio-banquet.jpeg",
    out: "event-covered-patio-banquet.webp",
    maxWidth: 1600,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.14, saturation: 1.22 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.3 },
    quality: 86
  },
  {
    src: "view-event-large_1749570846059.png",
    out: "view-event-large.webp",
    maxWidth: 1400,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.15, saturation: 1.24 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.3 },
    quality: 86
  },
  {
    src: "view-event-baby-shower_1749570846059.png",
    out: "view-event-baby-shower.webp",
    maxWidth: 1400,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.13, saturation: 1.22 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.3 },
    quality: 86
  },
  {
    src: "view-from-dining-area_1749570846060.png",
    out: "view-from-dining-area.webp",
    maxWidth: 1600,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.10, saturation: 1.30 },
    linear: [1.08, -7],
    sharpen: { sigma: 0.9, m1: 0.8, m2: 1.5 },
    quality: 86
  },
  {
    src: "menu-churrasco-asada_1749570846060.png",
    out: "menu-churrasco-asada.webp",
    maxWidth: 1200,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.06, saturation: 1.22 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.4 },
    quality: 85
  },
  {
    src: "menu-alitas_1749570846060.png",
    out: "menu-alitas.webp",
    maxWidth: 1200,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.06, saturation: 1.20 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.4 },
    quality: 85
  },
  {
    src: "menu-tacos-tipicos_1749570846060.png",
    out: "menu-tacos-tipicos.webp",
    maxWidth: 1200,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.07, saturation: 1.24 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.4 },
    quality: 85
  },
  {
    src: "menu-yuca-frita_1749570846060.png",
    out: "menu-yuca-frita.webp",
    maxWidth: 1200,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.06, saturation: 1.22 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.4 },
    quality: 85
  },
  {
    src: "menu-hamburguesa-papas-fritas_1749570846060.png",
    out: "menu-hamburguesa-papas-fritas.webp",
    maxWidth: 1200,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.07, saturation: 1.22 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.4 },
    quality: 85
  },
  {
    src: "menu-hot-dog-papas-fritas_1749570846060.png",
    out: "menu-hot-dog-papas-fritas.webp",
    maxWidth: 1200,
    clahe: { width: 64, height: 64, maxSlope: 2 },
    modulate: { brightness: 1.07, saturation: 1.22 },
    linear: [1.06, -5],
    sharpen: { sigma: 0.85, m1: 0.7, m2: 1.4 },
    quality: 85
  }
];

async function run() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const job of JOBS) {
    const inPath = path.join(SRC_DIR, job.src);
    const outPath = path.join(OUT_DIR, job.out);
    const beforeSize = fs.statSync(inPath).size;
    totalBefore += beforeSize;

    let pipeline = sharp(inPath).rotate();

    const meta = await pipeline.metadata();
    if (meta.width && meta.width > job.maxWidth) {
      pipeline = pipeline.resize({ width: job.maxWidth, withoutEnlargement: true });
    }

    if (job.clahe) {
      pipeline = pipeline.clahe(job.clahe);
    }
    if (job.modulate) {
      pipeline = pipeline.modulate(job.modulate);
    }
    if (job.linear) {
      pipeline = pipeline.linear(job.linear[0], job.linear[1]);
    }
    if (job.sharpen) {
      pipeline = pipeline.sharpen(job.sharpen);
    }

    await pipeline
      .webp({ quality: job.quality, effort: 6, smartSubsample: true })
      .toFile(outPath);

    const afterSize = fs.statSync(outPath).size;
    totalAfter += afterSize;

    console.log(
      `✓ ${job.out.padEnd(36)} ${(beforeSize / 1024).toFixed(0).padStart(5)} KB -> ${(afterSize / 1024).toFixed(0).padStart(4)} KB`
    );
  }

  console.log(
    `\nTotal payload: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> ${(totalAfter / 1024 / 1024).toFixed(2)} MB (${(
      (1 - totalAfter / totalBefore) *
      100
    ).toFixed(1)}% reduction)`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
