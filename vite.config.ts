import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.svg'],
      manifest: {
        name: 'Kadro — Halısaha Kadro Oluşturucu',
        short_name: 'Kadro',
        description: 'Halısaha takım formasyonu oluştur ve kadro fotoğrafı indir',
        theme_color: '#1a5c32',
        background_color: '#0f3d22',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/halisaha/',
        start_url: '/halisaha/',
        lang: 'tr',
        categories: ['sports', 'utilities'],
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'apple-touch-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'apple-touch-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/halisaha/index.html',
        navigateFallbackDenylist: [/^\/halisaha\/api/],
      },
    }),
  ],
  base: '/halisaha/',
  optimizeDeps: {
    include: ['html2canvas-pro'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
