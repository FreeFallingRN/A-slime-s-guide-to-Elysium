import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/A-slime-s-guide-to-Elysium/',
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: "A Slime's Guide to Elysium",
        short_name: 'SlimeElysium',
        description: 'Interactive Companion App for Slime Evolution webnovel',
        theme_color: '#0a0e17',
        background_color: '#0a0e17',
        display: 'standalone',
        start_url: '/A-slime-s-guide-to-Elysium/',
        scope: '/A-slime-s-guide-to-Elysium/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})
