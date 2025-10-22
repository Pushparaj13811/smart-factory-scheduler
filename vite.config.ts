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
          // React core libraries - must be first to prevent duplication
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-core';
          }

          // React Router
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run/router')) {
            return 'react-router';
          }

          // Radix UI components (depends on React)
          if (id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }

          // TanStack Query and data libraries
          if (id.includes('node_modules/@tanstack') || id.includes('node_modules/axios') || id.includes('node_modules/zustand')) {
            return 'data-vendor';
          }

          // Form libraries
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod') || id.includes('node_modules/@hookform')) {
            return 'form-vendor';
          }

          // Date and utility libraries
          if (id.includes('node_modules/date-fns') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge') ||
              id.includes('node_modules/class-variance-authority')) {
            return 'utils-vendor';
          }

          // i18n libraries
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n-vendor';
          }

          // Animation libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }

          // Notifications
          if (id.includes('node_modules/sonner')) {
            return 'notification-vendor';
          }

          // Lucide icons - create separate shared chunk for better caching
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-shared';
          }

          // Split large feature modules
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

          // Note: Recharts is intentionally NOT chunked separately due to circular
          // dependencies that cause "Cannot access before initialization" errors
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
