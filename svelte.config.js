import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-static generates a fully static site that can be deployed to any static hosting service
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      // default options:
      pages: "build",
      assets: "build",
      fallback: "index.html", // SPA fallback for client-side routing
      precompress: false,
      strict: true,
    }),
  },
};

export default config;
