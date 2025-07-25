// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://onlylonger.github.io",
  base: "off",
  prefetch: true,
  integrations: [mdx(), react()],
  // outDir: "docs",
  vite: {
    plugins: [tailwindcss()],
  },
});
