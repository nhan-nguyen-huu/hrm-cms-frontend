import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    host: true
  },
  build: {
    sourcemap: false
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'named',
        namedExport: 'ReactComponent'
      }
    })
  ]
})
