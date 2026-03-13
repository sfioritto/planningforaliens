import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const BREAKPOINTS = [200, 400, 600, 800, 1200];
const QUALITY = 80;
const PUBLIC_DIR = path.resolve("public/images");

const IMAGE_SOURCES = [
  {
    slug: "falcon-heavy",
    dir: "src/routes/blog/falcon-heavy",
    extensions: [".jpg"],
  },
  {
    slug: "health-wins",
    dir: "src/routes/blog/health-wins",
    extensions: [".png"],
  },
  {
    slug: "how-the-new-mac-pro-site-works",
    dir: "src/routes/blog/how-the-new-mac-pro-site-works",
    extensions: [".png"],
  },
  {
    slug: "why-javascript-development-is-crazy",
    dir: "src/routes/blog/why-javascript-development-is-crazy",
    extensions: [".png"],
  },
  {
    slug: "github-ghost-towns-1",
    dir: "src/routes/blog/github-ghost-towns-1",
    extensions: [".png"],
  },
  {
    slug: "sketching-with-css",
    dir: "src/routes/sketching-with-css",
    extensions: [".png"],
  },
];

async function processImage(srcPath, slug, filename) {
  const meta = await sharp(srcPath).metadata();
  const srcWidth = meta.width;
  const srcHeight = meta.height;
  const baseName = path.parse(filename).name;
  const outDir = path.join(PUBLIC_DIR, slug);
  await mkdir(outDir, { recursive: true });

  const srcsetParts = [];

  for (const w of BREAKPOINTS) {
    if (w > srcWidth) continue;
    const outPath = path.join(outDir, `${baseName}-${w}w.webp`);
    await sharp(srcPath).resize(w).webp({ quality: QUALITY }).toFile(outPath);
    srcsetParts.push(`/images/${slug}/${baseName}-${w}w.webp ${w}w`);
  }

  // If the source is smaller than the largest breakpoint, add it at its native size
  // but only if it's not already a breakpoint width
  if (srcWidth < BREAKPOINTS[BREAKPOINTS.length - 1] && !BREAKPOINTS.includes(srcWidth)) {
    const outPath = path.join(outDir, `${baseName}-${srcWidth}w.webp`);
    await sharp(srcPath)
      .resize(srcWidth)
      .webp({ quality: QUALITY })
      .toFile(outPath);
    srcsetParts.push(`/images/${slug}/${baseName}-${srcWidth}w.webp ${srcWidth}w`);
  }

  const maxW = Math.min(srcWidth, BREAKPOINTS[BREAKPOINTS.length - 1]);
  const scaledHeight = Math.round((srcHeight * maxW) / srcWidth);

  return {
    baseName,
    srcset: srcsetParts.join(", "),
    width: maxW,
    height: scaledHeight,
  };
}

async function main() {
  let totalFiles = 0;

  for (const source of IMAGE_SOURCES) {
    console.log(`\n=== ${source.slug} ===`);
    const files = await readdir(source.dir);
    const imageFiles = files.filter((f) =>
      source.extensions.some((ext) => f.toLowerCase().endsWith(ext)),
    );

    for (const file of imageFiles.sort()) {
      const srcPath = path.join(source.dir, file);
      const result = await processImage(srcPath, source.slug, file);
      totalFiles++;
      console.log(`  ${file}:`);
      console.log(`    srcset="${result.srcset}"`);
      console.log(`    width="${result.width}" height="${result.height}"`);
    }
  }

  console.log(`\nDone! Processed ${totalFiles} images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
