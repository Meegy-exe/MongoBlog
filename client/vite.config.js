import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// react doit tourner sur le port 4242

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4242,
    proxy: {
      '/api': {
        // chemin obligatoire pour requete api vers
        target: 'http://localhost:1997',
        // important pour contourner le problème de para feux des serveurs
        // (erreur cors)
        changeOrigin: true,
        // http classique en local
        secure: false,
      }
    }
  }
})