export type ThemeColor = 'lime' | 'yellow' | 'blue';

type Media = { url: string; alternativeText?: string | null } | null;
type NavItem = { id?: number; label: string; target: '#o-nas' | '#harmonogram' | '#miejsce' | '#kontakt' };

export interface LandingPage {
  seo: { title: string; description: string };
  navigation: { brandPrefix: string; brandAccent: string; ctaLabel: string; items: NavItem[] };
  hero: {
    eyebrow: string; title: string; titleAccent: string; lead: string;
    primaryCtaLabel: string; secondaryCtaLabel: string; trustTitle: string; trustText: string;
    badgeValue: string; badgeText: string; image: Media; imageFallbackUrl: string; imageAlt: string;
  };
  intro: { kicker: string; heading: string; headingSecondLine: string; text: string };
  benefits: Array<{ id?: number; icon: string; title: string; text: string; color: ThemeColor }>;
  schedule: { kicker: string; heading: string; description: string; note: string; cardCtaLabel: string };
  groups: Array<{ id?: number; age: string; name: string; days: string; time: string; color: ThemeColor }>;
  location: {
    kicker: string; heading: string; headingSecondLine: string; text: string; place: string;
    region: string; mapLabel: string; mapUrl: string; mapCtaLabel: string;
  };
  contact: { kicker: string; heading: string; text: string; buttonLabel: string; email: string; emailSubject: string };
  footer: { description: string; copyrightName: string };
}

export interface StrapiConfig {
  STRAPI_URL?: string;
  STRAPI_API_TOKEN?: string;
}

const requiredSections: Array<keyof LandingPage> = [
  'seo', 'navigation', 'hero', 'intro', 'benefits', 'schedule', 'groups', 'location', 'contact', 'footer',
];

function assertLandingPage(value: unknown): asserts value is LandingPage {
  if (!value || typeof value !== 'object') throw new Error('Strapi returned an empty Landing Page payload.');
  const record = value as Record<string, unknown>;
  for (const section of requiredSections) {
    if (record[section] === null || record[section] === undefined) throw new Error(`Strapi Landing Page is missing the "${section}" section.`);
  }
  if (!Array.isArray(record.benefits) || !Array.isArray(record.groups)) throw new Error('Strapi lists have an invalid shape.');
  const requiredStrings = [
    record.seo && (record.seo as Record<string, unknown>).title,
    record.navigation && (record.navigation as Record<string, unknown>).brandPrefix,
    record.hero && (record.hero as Record<string, unknown>).title,
    record.contact && (record.contact as Record<string, unknown>).email,
  ];
  if (requiredStrings.some((field) => typeof field !== 'string' || !field.trim())) throw new Error('Strapi Landing Page contains empty required fields.');
}

export async function getLandingPage(
  status: 'published' | 'draft' = 'published',
  config: StrapiConfig = import.meta.env as StrapiConfig,
): Promise<LandingPage> {
  const baseUrl = (config.STRAPI_URL || '').replace(/\/$/, '');
  const token = config.STRAPI_API_TOKEN;
  if (!baseUrl || !token) throw new Error('STRAPI_URL and STRAPI_API_TOKEN are required to render the site.');

  const query = new URLSearchParams({
    'populate[seo]': 'true',
    'populate[navigation][populate][items]': 'true',
    'populate[hero][populate][image]': 'true',
    'populate[intro]': 'true',
    'populate[benefits]': 'true',
    'populate[schedule]': 'true',
    'populate[groups]': 'true',
    'populate[location]': 'true',
    'populate[contact]': 'true',
    'populate[footer]': 'true',
    status,
  });
  const response = await fetch(`${baseUrl}/api/landing-page?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Strapi request failed with HTTP ${response.status}.`);
  const payload = await response.json() as { data?: unknown };
  assertLandingPage(payload.data);
  return payload.data;
}

export function resolveMediaUrl(media: Media, fallback: string, baseUrl: string): string {
  const url = media?.url || fallback;
  if (!url) throw new Error('Hero image and its fallback URL are both empty.');
  return url.startsWith('/') ? `${baseUrl.replace(/\/$/, '')}${url}` : url;
}
