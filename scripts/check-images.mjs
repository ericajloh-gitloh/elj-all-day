import fs from "fs";
import path from "path";

const imgs = new Set();

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules") scanDir(full);
    else if (/\.(tsx?|jsx)$/.test(entry.name)) {
      const content = fs.readFileSync(full, "utf8");
      for (const m of content.matchAll(
        /['"`](\/(?:images|work)\/[^'"`]+\.(?:jpg|jpeg|png|webp|svg))['"`]/g,
      )) {
        imgs.add(m[1]);
      }
    }
  }
}

const imagesTs = fs.readFileSync("src/lib/images.ts", "utf8");
for (const m of imagesTs.matchAll(/`\$\{IMG\}\/([^`]+)`/g)) {
  imgs.add("/images/" + m[1]);
}
for (const m of imagesTs.matchAll(/"(\/work\/[^"]+)"/g)) {
  imgs.add(m[1]);
}

scanDir("src");

const missing = [...imgs].filter((p) => !fs.existsSync("public" + p)).sort();
console.log("Referenced:", imgs.size);
console.log("Missing:", missing.length);
missing.forEach((p) => console.log("  MISSING", p));
