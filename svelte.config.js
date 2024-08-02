import adapter from "@sveltejs/adapter-netlify";
import adapterCloudflare from "@sveltejs/adapter-cloudflare";
import sveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: process.env.NETLIFY ? adapter() : adapterCloudflare(),
  },
};

export default config;
