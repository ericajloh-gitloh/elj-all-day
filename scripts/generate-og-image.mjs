/**
 * Syncs branded OG assets from src/app/opengraph-image.png.
 * Edit that PNG (1200×630), then run: npm run generate-og-image
 */
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const source = join(root, "src", "app", "opengraph-image.png");

if (!existsSync(source)) {
  console.error("Missing src/app/opengraph-image.png (1200×630 PNG).");
  process.exit(1);
}

copyFileSync(source, join(root, "src", "app", "twitter-image.png"));
copyFileSync(source, join(root, "public", "og-image.png"));
console.log("Synced twitter-image.png and public/og-image.png from opengraph-image.png");
