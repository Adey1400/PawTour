import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows ngrok to bypass the host check
    allowedHosts: [
      'lauditorily-propublicity-lajuana.ngrok-free.dev',
      '.ngrok-free.dev' // This allows ALL ngrok subdomains (recommended)
    ],
    // Ensure host is set to true to listen on all addresses
    host: true,
    port: 5173
  }
})
