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
    // Ensure proper module resolution
    preserveSymlinks: false,
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
            // Ensure React and React-DOM are in the same chunk to avoid module resolution issues
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/scheduler/")
            ) {
              return "vendor-react";
            }
            // All React-dependent packages must be in a chunk that can access React
            // This prevents "Cannot read properties of undefined" errors
            if (
              id.includes("react-router") ||
              id.includes("@radix-ui") ||
              id.includes("framer-motion") ||
              id.includes("react-hook-form") ||
              id.includes("react-day-picker") ||
              id.includes("react-resizable") ||
              id.includes("@tanstack/react-query") ||
              id.includes("sonner") ||
              id.includes("embla-carousel-react") ||
              id.includes("recharts") ||
              id.includes("lucide-react") ||
              id.includes("next-themes")
            ) {
              return "vendor-react-libs";
            }
            // Only non-React dependencies go in the generic vendor chunk
            return "vendor";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
