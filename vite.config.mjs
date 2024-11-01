import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  // Configure base path for GitHub Pages deployment
  // Change 'investment-portfolio-dashboard' to your actual repository name
  base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES 
    ? '/investment-portfolio-dashboard/' 
    : '/',
  
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
    // Optimize for production deployment
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  
  plugins: [tsconfigPaths(), react()],
  
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
    // Optimized for local development and deployment platforms
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.vercel.app',
      '.netlify.app',
      '.github.io',
      '.amazonaws.com'
    ]
  },
  
  // Preview server configuration
  preview: {
    port: 3000,
    host: "0.0.0.0"
  }
});