import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

const basePath = process.env.BASE_PATH || (process.env.VERCEL ? '/' : '/A-slime-s-guide-to-Elysium/')

export default defineConfig({
  base: basePath,
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: [
        'favicon.svg',
        'favicon.png',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png'
      ],
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: "A Slime's Guide to Elysium",
        short_name: "Slime Elysium",
        description: "Interactive Companion & Chrono-Tracker for the Slime Evolution Webnovel",
        theme_color: "#07090f",
        background_color: "#07090f",
        display: "standalone",
        orientation: "any",
        start_url: basePath,
        scope: basePath,
        id: basePath,
        categories: ["books", "entertainment", "utilities"],
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any"
          }
        ]
      }
    })
  ]
})

