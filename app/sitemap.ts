/**
 * Dynamic Sitemap Generation for Blaq Digital
 *
 * Generates XML sitemap for SEO optimization
 * Accessible at: https://blaq.ainative.studio/sitemap.xml
 *
 * Priority Guidelines:
 * - 1.0: Homepage (highest priority)
 * - 0.9: Main service pages
 * - 0.8: Service sub-pages, about page
 * - 0.7: Work portfolio, demos
 * - 0.6: Contact page
 *
 * Change Frequency Guidelines:
 * - weekly: Dynamic content (home, work, demos)
 * - monthly: Static content (about, services, contact)
 *
 * Built by AINative
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blaq.ainative.studio';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/ai-apps`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/media-ai`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/web-dev`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/demos`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
