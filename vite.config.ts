import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Name of your app",
        short_name: "Short name of your app",
        description: "Description of your app",
        theme_color: "#ffffff",
        icons: [
          {
            src: "src/assets/logo/square/transparent/32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/180x180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/180x180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "src/assets/logo/square/transparent/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "src/assets/logo/square/white/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});

/*TO DO 
https://vite-plugin-pwa.netlify.app/guide/generate.html*/
