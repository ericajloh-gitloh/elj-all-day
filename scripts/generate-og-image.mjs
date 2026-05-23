/**
 * OG share card (1200×1200): tall portrait card, full-bleed cover + compact footer.
 * Run: npm run generate-og-image
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 1200;
const TEXT_BAND = Math.round(HEIGHT * 0.17);
const IMAGE_HEIGHT = HEIGHT - TEXT_BAND;
const CORNER_RADIUS = 32;
const PAD_X = 48;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photoPath = join(
  root,
  "public",
  "images",
  "roman-b-IgcV3eno6D4-unsplash.jpg",
);

function hex(rgb) {
  return `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function textColors([r, g, b]) {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return {
    primary: luminance > 0.55 ? "#0a0a12" : "#f4f2ef",
    muted: luminance > 0.55 ? "#5c5652" : "#b8b2aa",
  };
}

const photo = sharp(photoPath);

const imagePanel = await photo
  .clone()
  .resize(WIDTH, IMAGE_HEIGHT, {
    fit: "cover",
    position: "attention",
  })
  .toBuffer();

const { data: edgePixels } = await sharp(imagePanel)
  .extract({ left: 0, top: IMAGE_HEIGHT - 1, width: WIDTH, height: 1 })
  .raw()
  .toBuffer({ resolveWithObject: true });

let r = 0;
let g = 0;
let b = 0;
for (let i = 0; i < WIDTH; i++) {
  r += edgePixels[i * 3];
  g += edgePixels[i * 3 + 1];
  b += edgePixels[i * 3 + 2];
}
r = Math.round(r / WIDTH);
g = Math.round(g / WIDTH);
b = Math.round(b / WIDTH);

const previewHex = hex([r, g, b]);
const { primary, muted } = textColors([r, g, b]);

const textBandSvg = `
<svg width="${WIDTH}" height="${TEXT_BAND}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${TEXT_BAND}" fill="${previewHex}"/>
  <text x="${PAD_X}" y="92" font-family="Georgia, 'Times New Roman', serif" font-size="38" font-weight="400" fill="${primary}">Strategic design for sports, media &amp; fandom.</text>
  <text x="${PAD_X}" y="168" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="0.08em" fill="${muted}">eljallday.com</text>
</svg>
`;

const textBandPng = await sharp(Buffer.from(textBandSvg)).png().toBuffer();

const flat = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: { r, g, b },
  },
})
  .composite([
    { input: imagePanel, left: 0, top: 0 },
    { input: textBandPng, left: 0, top: IMAGE_HEIGHT },
  ])
  .png()
  .toBuffer();

const roundMask = Buffer.from(
  `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${WIDTH}" height="${HEIGHT}" rx="${CORNER_RADIUS}" ry="${CORNER_RADIUS}" fill="#fff"/>
  </svg>`,
);

const card = await sharp(flat)
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

console.log(
  `Rendered ${WIDTH}x${HEIGHT} (cover ${WIDTH}x${IMAGE_HEIGHT}, footer ${TEXT_BAND}px @ ${previewHex})`,
);
