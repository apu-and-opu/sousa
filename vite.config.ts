import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isTauri = !!process.env.TAURI_ENV_PLATFORM;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isTauri ? '' : process.env.GITHUB_ACTIONS ? '/sousa/' : '/',
  server: {
    port: 5173,
    strictPort: true,
  },
})
