/// <reference types="astro/client" />

type CloudflareEnv = {
  STRAPI_URL?: string;
  STRAPI_API_TOKEN?: string;
  PREVIEW_SECRET?: string;
};

type Runtime = import('@astrojs/cloudflare').Runtime<CloudflareEnv>;

declare namespace App {
  interface Locals extends Runtime {}
}
