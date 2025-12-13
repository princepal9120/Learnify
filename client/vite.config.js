import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          'vendor-state': ['@reduxjs/toolkit', 'react-redux'],
          'vendor-form': ['@hookform/resolvers', 'react-hook-form'],
          'vendor-animations': ['framer-motion', 'gsap'],
          'vendor-utils': ['clsx', 'class-variance-authority'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  },
  optimization: {
    splitting: true,
  }
})


