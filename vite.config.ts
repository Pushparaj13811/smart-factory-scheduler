import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core libraries - must be isolated and loaded first
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-core';
          }

          // React Router - separate chunk
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run/router')) {
            return 'react-router';
          }

          // Radix UI components - separate chunk
          if (id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }

          // Pure utility libraries (no React dependencies)
          if (id.includes('node_modules/date-fns') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge') ||
              id.includes('node_modules/class-variance-authority') ||
              id.includes('node_modules/zod')) {
            return 'utils-vendor';
          }

          // Lucide icons - separate for better caching
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-shared';
          }

          // Split large feature modules (app code)
          if (id.includes('/features/machines/')) {
            return 'feature-machines';
          }
          if (id.includes('/features/orders/')) {
            return 'feature-orders';
          }
          if (id.includes('/features/maintenance/')) {
            return 'feature-maintenance';
          }
          if (id.includes('/features/users/')) {
            return 'feature-users';
          }
          if (id.includes('/features/profile/')) {
            return 'feature-profile';
          }

          // All other React-dependent node_modules go into default vendor chunk
          // This prevents load order issues with React.createContext
          // Includes: TanStack Query, Zustand, axios, react-hook-form, i18next,
          // react-i18next, framer-motion, sonner, recharts, etc.
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 900,
    // Disable source maps for production to reduce bundle size
    sourcemap: false,
    // Minify with esbuild for faster builds
    minify: 'esbuild',
    // Set target for modern browsers
    target: 'es2020',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'zustand',
      'i18next',
      'react-i18next',
    ],
  },
})
