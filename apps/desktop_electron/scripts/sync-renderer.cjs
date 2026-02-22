const fs = require("node:fs");
const path = require("node:path");

const sourceDir = path.resolve(__dirname, "..", "..", "desktop_vite", "dist");
const targetDir = path.resolve(__dirname, "..", "renderer-dist");

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Renderer dist not found: ${sourceDir}`);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Synced renderer build to ${targetDir}`);
