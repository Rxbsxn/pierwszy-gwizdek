export default ({ env }) => ({
  auth: { secret: env('ADMIN_JWT_SECRET') },
  apiToken: { salt: env('API_TOKEN_SALT') },
  transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
  secrets: { encryptionKey: env('ENCRYPTION_KEY') },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('FRONTEND_URL', 'https://pierwszy-gwizdek-wierzchoslawice.netlify.app')],
      handler: (uid, { status }) => {
        if (uid !== 'api::landing-page.landing-page') return null;
        const params = new URLSearchParams({ secret: env('PREVIEW_SECRET'), status });
        return `${env('FRONTEND_URL', 'https://pierwszy-gwizdek-wierzchoslawice.netlify.app')}/preview?${params}`;
      },
    },
  },
});
