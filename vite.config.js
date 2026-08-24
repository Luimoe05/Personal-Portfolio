import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { env } from "node:process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: env.VITE_BASE_PATH || "/",
});
