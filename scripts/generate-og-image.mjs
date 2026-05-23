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

const SANS = "Arial, Helvetica, sans-serif";

function footerTextColors([r, g, b]) {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (luminance > 0.55) {
    return { tagline: "#0a0a12", url: "#5c5652" };
  }
  return { tagline: "#ffffff", url: "rgba(255, 255, 255, 0.62)" };
}

const photo = sharp(photoPath);

const imagePanel = await photo
  .clone()
  .resize(WIDTH, IMAGE_HEIGHT, {
    fit: "cover",
    position: "attention",
  })
  .toBuffer();

const stripH = Math.max(24, Math.round(IMAGE_HEIGHT * 0.06));
const { data: footerSample } = await sharp(imagePanel)
  .extract({ left: 0, top: IMAGE_HEIGHT - stripH, width: WIDTH, height: stripH })
  .resize(1, 1)
  .raw()
  .toBuffer({ resolveWithObject: true });

const r = footerSample[0];
const g = footerSample[1];
const b = footerSample[2];

const previewHex = hex([r, g, b]);
const { tagline, url } = footerTextColors([r, g, b]);

const textBandSvg = `
<svg width="${WIDTH}" height="${TEXT_BAND}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${TEXT_BAND}" fill="${previewHex}"/>
  <text x="${PAD_X}" y="88" font-family="${SANS}" font-size="36" font-weight="700" fill="${tagline}">Strategic design for sports, media &amp; fandom.</text>
  <text x="${PAD_X}" y="158" font-family="${SANS}" font-size="24" font-weight="400" fill="${url}">eljallday.com</text>
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
