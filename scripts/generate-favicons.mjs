/**
 * Pattern-based ELJ All Day icons from public/favicon.svg
 * (diagonal checker + slash — no letterforms)
 * Run: npm run generate-favicons
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "src", "app");
const publicDir = join(root, "public");
const svg = readFileSync(join(publicDir, "favicon.svg"), "utf8");

function renderPng(size) {
  return new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "#0a0a12",
  }).render().asPng();
}

const appAssets = [
  { name: "icon.png", size: 32 },
  { name: "apple-icon.png", size: 180 },
];

for (const { name, size } of appAssets) {
  writeFileSync(join(appDir, name), renderPng(size));
  console.log(`Wrote src/app/${name} (${size}px)`);
}

const publicAssets = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of publicAssets) {
  writeFileSync(join(publicDir, name), renderPng(size));
  console.log(`Wrote public/${name} (${size}px)`);
}

const ico = await pngToIco([renderPng(16), renderPng(32)]);
writeFileSync(join(appDir, "favicon.ico"), ico);
console.log("Wrote src/app/favicon.ico (16 + 32px)");
