import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // React core - must be first
            if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
              return "vendor-react";
            }
            // All React-dependent packages should be separate to avoid circular deps
            if (
              id.includes("react-router") ||
              id.includes("@radix-ui") ||
              id.includes("framer-motion") ||
              id.includes("react-hook-form") ||
              id.includes("react-day-picker") ||
              id.includes("react-resizable") ||
              id.includes("@tanstack/react-query") ||
              id.includes("zustand") ||
              id.includes("sonner")
            ) {
              return "vendor-react-libs";
            }
            // Everything else (non-React dependencies)
            return "vendor";
          }
        },
      },
    },
  },
}));
