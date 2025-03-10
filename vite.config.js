import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Definición implicita de variables de entorno en Vite (cualquier variable VITE_*)
})
