import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths()
    // Remove tsconfigPaths() from here
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-router-dom")) return "router";
        },
      },
    },
  },
});
