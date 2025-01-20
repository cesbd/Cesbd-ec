// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import db from '@astrojs/db';

// import vercel from '@astrojs/vercel';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }), db()],

  adapter: cloudflare(),
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
  }
});