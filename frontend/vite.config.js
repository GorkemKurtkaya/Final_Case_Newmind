import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Dış erişime izin ver
    port: 5173,      // Docker içindeki portu sabitle
    strictPort: true // Port çakışması varsa hata ver
  },

})
