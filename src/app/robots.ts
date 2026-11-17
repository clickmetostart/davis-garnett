import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = ['/clickme/', '/api/', '/login'];

  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/', disallow: disallowedPaths },
      { userAgent: 'Google-Extended', allow: '/', disallow: disallowedPaths },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: disallowedPaths },
      { userAgent: 'GPTBot', allow: '/', disallow: disallowedPaths },
      { userAgent: 'PerplexityBot', allow: '/', disallow: disallowedPaths },
      { userAgent: 'ClaudeBot', allow: '/', disallow: disallowedPaths },
      { userAgent: '*', allow: '/', disallow: disallowedPaths },
    ],
    sitemap: 'https://www.davisgarnettsells.com/sitemap.xml',
  };
}
