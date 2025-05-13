import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({  mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const allowedNetworks = env.VITE_ALLOWED_NETWORKS?.split(',') || [];

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      port: 1499,
      strictPort: true,
      host: true,
      allowedHosts: allowedNetworks,
    }
  };
});
