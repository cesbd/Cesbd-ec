// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import db from '@astrojs/db';

// import vercel from '@astrojs/vercel';

// import cloudflare from '@astrojs/cloudflare';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }), db()],

  adapter: node({
    mode: 'standalone'
  }),
  // output: 'server',
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: false }),
      EMAIL: envField.string({ context: 'server', access: 'secret', optional: false }),
      CLOUDINARY_CLOUD_NAME: envField.string({ context: 'server', access: 'secret', optional: false }),
      CLOUDINARY_API_KEY: envField.string({ context: 'server', access: 'secret', optional: false }),
      CLOUDINARY_API_SECRET: envField.string({ context: 'server', access: 'secret', optional: false }),
    },
    validateSecrets: true,
  },


  vite: {
    // ssr: {
    //   noExternal: ['cloudinary'],
    // },
    resolve: {
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
        // Agrega un polyfill si otras dependencias requieren objetos del entorno Node.js
        // 'stream': 'stream-browserify',
        // 'crypto': 'crypto-browserify',
        // 'querystring': 'querystring-es3',
        // 'fs': 'memfs',
        // 'util': 'util/',
      } : {},
    },
  }

});