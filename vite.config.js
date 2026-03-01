const path = require('path')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

/** @type {import('vite').UserConfig} */
module.exports = {
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      'lucide-react': path.resolve(__dirname, 'shims/lucide-react.js')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tsparticles: ['@tsparticles/react', '@tsparticles/slim']
        }
      }
    }
  }
}
