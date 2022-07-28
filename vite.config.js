import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const path = require('path')

// https://vitejs.dev/config/
// Guide for Bootstrap 5 with vite: https://getbootstrap.com/docs/5.2/getting-started/vite/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    host: true,
    port: 3000,
    hot: true
  },
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/js', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  }
})
