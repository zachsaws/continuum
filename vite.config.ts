import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this site at https://zachsaws.github.io/continuum/
  // All asset paths must include the /continuum/ prefix.
  base: '/continuum/',
})
