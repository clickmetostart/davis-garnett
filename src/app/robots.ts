import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/clickme/', '/api/'],
    },
    sitemap: 'https://www.davisgarnettsells.com/sitemap.xml',
  };
}

