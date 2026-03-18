import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

const repoBase = "/Team4/";

export default defineConfig(({ mode }) => {
  const isAnalyzeMode = mode === "analyze";

  return {
    base: repoBase,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "apple-touch-icon.svg",
          "offline.html",
          "pwa-192x192.svg",
          "pwa-512x512.svg",
        ],
        manifest: {
          name: "CareConnect",
          short_name: "CareConnect",
          description:
            "CareConnect helps patients and caregivers manage appointments, medications, records, and daily care workflows.",
          theme_color: "#0a0e1a",
          background_color: "#0a0e1a",
          display: "standalone",
          start_url: repoBase,
          scope: repoBase,
          icons: [
            {
              src: "pwa-192x192.svg",
              sizes: "192x192",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "pwa-512x512.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "pwa-512x512.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ["**/*.{js,css,html,svg,png,ico,json}"],
          navigateFallback: `${repoBase}index.html`,
        },
      }),
      isAnalyzeMode
        ? visualizer({
            filename: "dist/bundle-analysis.html",
            gzipSize: true,
            brotliSize: true,
            open: false,
          })
        : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    assetsInclude: ["**/*.svg", "**/*.csv"],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return undefined;
            }

            if (
              id.includes("react-router") ||
              id.includes(`${path.sep}react${path.sep}`) ||
              id.includes(`${path.sep}react-dom${path.sep}`) ||
              id.includes(`${path.sep}scheduler${path.sep}`)
            ) {
              return "framework";
            }

            if (id.includes(`${path.sep}recharts${path.sep}`)) {
              return "charts";
            }

            if (
              id.includes(`${path.sep}cmdk${path.sep}`) ||
              id.includes(`${path.sep}sonner${path.sep}`) ||
              id.includes(`${path.sep}react-day-picker${path.sep}`) ||
              id.includes(`${path.sep}embla-carousel-react${path.sep}`)
            ) {
              return "ui-vendor";
            }

            return "vendor";
          },
        },
      },
    },
  };
});
