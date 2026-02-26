/**
 * Dynamic Sitemap Generation for Northbound Studio
 *
 * Generates XML sitemap for SEO optimization
 * Accessible at: https://northboundstudio.co/sitemap.xml
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
  const baseUrl = 'https://northboundstudio.co';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ai-apps`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/media-ai`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/web-dev`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/demos`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
