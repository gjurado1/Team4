import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stream = createReadStream(filePath);

  stream.on("error", () => {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end("Unable to read file");
  });

  res.on("close", () => {
    stream.destroy();
  });

  res.writeHead(200, {
    "Content-Type": contentTypes[ext] ?? "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  stream.pipe(res);
}

function sendNotFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

function safeResolve(relativePath) {
  const normalizedPath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const resolvedPath = path.resolve(distDir, normalizedPath);

  if (!resolvedPath.startsWith(distDir)) {
    return null;
  }

  return resolvedPath;
}

export function startE2EServer({
  host = "127.0.0.1",
  port = 4173,
  basePath = "/Team4",
} = {}) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", `http://${host}:${port}`);
      const pathname = decodeURIComponent(url.pathname);

      if (pathname === "/") {
        res.writeHead(302, { Location: `${basePath}/` });
        res.end();
        return;
      }

      if (pathname === basePath) {
        res.writeHead(302, { Location: `${basePath}/` });
        res.end();
        return;
      }

      if (!pathname.startsWith(`${basePath}/`)) {
        sendNotFound(res);
        return;
      }

      const relativePath = pathname.slice(basePath.length + 1);
      const requestedPath = relativePath || "index.html";
      const resolvedPath = safeResolve(requestedPath);

      if (!resolvedPath) {
        sendNotFound(res);
        return;
      }

      try {
        const fileStats = await stat(resolvedPath);
        if (fileStats.isFile()) {
          sendFile(res, resolvedPath);
          return;
        }
      } catch {
        // Fall through to SPA fallback.
      }

      if (existsSync(indexPath)) {
        sendFile(res, indexPath);
        return;
      }

      sendNotFound(res);
    } catch (error) {
      console.error("E2E server request error:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      }
      res.end("Internal server error");
    }
  });

  server.on("error", (error) => {
    console.error("E2E server error:", error);
  });

  server.listen(port, host, () => {
    console.log(`E2E server listening at http://${host}:${port}${basePath}/`);
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0);
      });
    });
  }

  return server;
}

if (process.argv[1] === __filename) {
  startE2EServer();
}
