import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Asegurar que las variables de entorno estén disponibles
  define: {
    'process.env': process.env
  }
})
