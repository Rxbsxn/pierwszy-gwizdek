async function triggerNetlifyBuild() {
  const hookUrl = process.env.NETLIFY_BUILD_HOOK;
  if (!hookUrl) return;

  try {
    const response = await fetch(hookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'strapi', contentType: 'landing-page' }),
    });
    if (!response.ok) strapi.log.error(`Netlify build hook returned HTTP ${response.status}.`);
  } catch (error) {
    strapi.log.error(`Unable to trigger Netlify build: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default {
  async afterUpdate() { await triggerNetlifyBuild(); },
  async afterDelete() { await triggerNetlifyBuild(); },
};
