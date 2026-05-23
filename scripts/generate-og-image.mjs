/**
 * OG share card (1200×1200): full-bleed photo only (no baked-in text footer).
 * Text for link previews comes from Open Graph metadata (one native footer in iMessage).
 * Run: npm run generate-og-image
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 1200;
const CORNER_RADIUS = 32;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photoPath = join(
  root,
  "public",
  "images",
  "roman-b-IgcV3eno6D4-unsplash.jpg",
);

const photo = sharp(photoPath);

const imagePanel = await photo
  .resize(WIDTH, HEIGHT, {
    fit: "cover",
    position: "attention",
  })
  .toBuffer();

const roundMask = Buffer.from(
  `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${WIDTH}" height="${HEIGHT}" rx="${CORNER_RADIUS}" ry="${CORNER_RADIUS}" fill="#fff"/>
  </svg>`,
);

const card = await sharp(imagePanel)
  .composite([{ input: roundMask, blend: "dest-in" }])
  .png()
  .toBuffer();

const outputs = [
  join(root, "src", "app", "opengraph-image.png"),
  join(root, "src", "app", "twitter-image.png"),
  join(root, "public", "og-share-card-v4.png"),
];

for (const path of outputs) {
  writeFileSync(path, card);
  console.log(`Wrote ${path.replace(root + "/", "")}`);
}

console.log(`Rendered ${WIDTH}x${HEIGHT} (photo only, no text footer)`);
