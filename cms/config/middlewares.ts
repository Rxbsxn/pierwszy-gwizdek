export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: { contentSecurityPolicy: { useDefaults: true, directives: {
      'connect-src': ["'self'", 'https:'],
      'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
      'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
      upgradeInsecureRequests: null,
    } } },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://pierwszy-gwizdek-wierzchoslawice.netlify.app', 'http://localhost:4321'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy', 'strapi::query', 'strapi::body', 'strapi::session', 'strapi::public',
];
