import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({})],
});

/*TO DO 
https://vite-plugin-pwa.netlify.app/guide/generate.html*/
