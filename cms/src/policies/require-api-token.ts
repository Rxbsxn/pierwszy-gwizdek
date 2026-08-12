import crypto from 'node:crypto';

export default (policyContext, _config, { strapi }) => {
  const configuredToken = strapi.config.get('server.apiToken') as string | undefined;
  const authorization = policyContext.request.header.authorization ?? '';
  const suppliedToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!configuredToken || !suppliedToken) return false;
  const expected = Buffer.from(configuredToken);
  const supplied = Buffer.from(suppliedToken);
  return expected.length === supplied.length && crypto.timingSafeEqual(expected, supplied);
};
