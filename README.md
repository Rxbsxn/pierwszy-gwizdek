# Pierwszy Gwizdek

Landing page szkółki piłkarskiej zbudowany w Astro i zarządzany przez Strapi 5.

## Struktura

- `/src` — statyczny frontend Astro wdrażany na Netlify.
- `/cms` — Strapi 5 wdrażane na Railway z PostgreSQL i Cloudinary.

## Uruchomienie lokalne

1. Skopiuj `cms/.env.example` do `cms/.env` i ustaw sekrety. Dla lokalnego SQLite ustaw `DATABASE_CLIENT=sqlite`.
2. W `cms/` uruchom `npm install && npm run develop`.
3. Skopiuj `.env.example` do `.env`, ustaw ten sam `STRAPI_API_TOKEN` i uruchom `npm install && npm run dev`.

Bootstrap Strapi tworzy początkową, opublikowaną treść tylko wtedy, gdy singleton `Landing Page` jest pusty.

## Produkcja

- Netlify wymaga `STRAPI_URL` i `STRAPI_API_TOKEN`.
- Railway wymaga sekretów Strapi, `DATABASE_URL`, `DATABASE_CLIENT=postgres`, `PUBLIC_URL` oraz danych Cloudinary.
- `NETLIFY_BUILD_HOOK` w Railway uruchamia przebudowę Netlify po aktualizacji, publikacji lub wycofaniu Landing Page.
- Sekrety muszą pozostać w panelach usług; pliki `.env` są ignorowane przez Git.
