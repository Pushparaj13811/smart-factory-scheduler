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
          // React core libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }

          // Radix UI components
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

          // Date and utility libraries (including lucide-react for tree-shaking)
          if (id.includes('node_modules/date-fns') || id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge') || id.includes('node_modules/class-variance-authority')) {
            return 'utils-vendor';
          }

          // i18n libraries
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n-vendor';
          }

          // Charts library (only load when needed)
          if (id.includes('node_modules/recharts')) {
            return 'chart-vendor';
          }

          // Notifications
          if (id.includes('node_modules/sonner')) {
            return 'notification-vendor';
          }

          // Lucide icons - create separate shared chunk for better caching
          // Tree-shaking will still work, only used icons are included
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

          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor-other';
          }
        },
      },
    },
    // Optimize chunk size (set to 900KB to account for tree-shaken icon library)
    // Note: gzipped size (158KB for icons) is what matters for network transfer
    // Icon library compresses very well due to repetitive SVG data
    chunkSizeWarningLimit: 900,
    // Enable source maps for production debugging (optional, increases size slightly)
    sourcemap: false,
    // Minify with esbuild for faster builds
    minify: 'esbuild',
    // Set target for modern browsers to reduce polyfills
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
