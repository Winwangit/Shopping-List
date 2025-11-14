import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base (case-sensitive repo name)
export default defineConfig({
  plugins: [react()],
  base: '/Shopping-List/',
})
