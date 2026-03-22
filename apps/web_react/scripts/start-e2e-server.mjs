import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "vite";
import { startE2EServer } from "./e2e-server.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, "..");

process.chdir(appDir);

try {
  await build();
} catch (error) {
  console.error("E2E build failed:", error);
  process.exit(1);
}

startE2EServer();
