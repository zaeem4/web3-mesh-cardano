import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [nodePolyfills(), wasm(), topLevelAwait(), react()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
});
