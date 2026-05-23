/**
 * Renders public/og-share-card.svg → App Router OG assets (1200×630).
 * Run: npm run generate-og-image
 */
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public", "og-share-card.svg");
const svg = readFileSync(svgPath, "utf8");

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: "Georgia",
  },
});

const png = resvg.render().asPng();
const appDir = join(root, "src", "app");
const targets = [
  join(appDir, "opengraph-image.png"),
  join(appDir, "twitter-image.png"),
  join(root, "public", "og-image.png"),
];

for (const path of targets) {
  writeFileSync(path, png);
  console.log(`Wrote ${path.replace(root + "/", "")}`);
}

console.log(`Rendered ${png.length} bytes (1200×630)`);
