import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import viteString from "vite-plugin-string";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteString({
      include: ["**/*.frag", "**/*.vert", "**/*.glsl", "**/*.css"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
