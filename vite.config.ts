import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0' },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/');
          if (moduleId.includes('/node_modules/@dimforge/rapier3d-compat/')) return 'physics-engine';
          if (moduleId.includes('/node_modules/@react-three/rapier/')) return 'physics-react';
          if (moduleId.includes('/node_modules/@react-three/drei/')) return 'three-helpers';
          if (moduleId.includes('/node_modules/@react-three/fiber/')) return 'three-fiber';
          if (moduleId.includes('/node_modules/@react-three/postprocessing/') || moduleId.includes('/node_modules/postprocessing/')) return 'postprocessing';
          if (moduleId.includes('/node_modules/three/')) return 'three-core';
        },
      },
    },
  },
});
