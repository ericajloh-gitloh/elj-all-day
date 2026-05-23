/**
 * Renders public/og-share-card.svg to public/og-share-card-v2.png (1200x630).
 * Run: npm run generate-og-image
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public", "og-share-card.svg"), "utf8");

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: "Georgia",
  },
}).render().asPng();

const out = join(root, "public", "og-share-card-v2.png");
writeFileSync(out, png);
console.log(`Wrote public/og-share-card-v2.png (${png.length} bytes, 1200x630)`);
