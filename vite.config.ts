import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    base: '/donation-app/', // ✅ REQUIRED for GitHub Pages
=======
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables starting with VITE_
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    // Required for GitHub Pages
    base: '/donation-app/',
>>>>>>> 57fdf1e (Initial commit)

    plugins: [react()],

    server: {
      port: 3000,
<<<<<<< HEAD
      host: true,
=======
      host: true, // accessible on your local network
>>>>>>> 57fdf1e (Initial commit)
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    define: {
<<<<<<< HEAD
      __GEMINI_API_KEY__: JSON.stringify(env.VITE_GEMINI_API_KEY),
=======
      // Optional: makes VITE_ env variables accessible via process.env
      'process.env': env,
    },

    build: {
      outDir: 'dist',
      rollupOptions: {
        // Fix for SPA routing on GitHub Pages
        input: path.resolve(__dirname, 'index.html'),
      },
>>>>>>> 57fdf1e (Initial commit)
    },
  }
})
