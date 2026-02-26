/**
 * Robots.txt Configuration for Northbound Studio
 *
 * Configures search engine crawler access control
 * - Allows all search engines to crawl public content
 * - Blocks sensitive routes (API, admin, authentication)
 * - References sitemap for better indexing
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import { MetadataRoute } from 'next'

/**
 * Base URL for the Northbound Studio website
 */
const BASE_URL = 'https://northboundstudio.co'

/**
 * Routes that should be blocked from search engine indexing
 * These are sensitive or internal routes that should not appear in search results
 */
const BLOCKED_ROUTES: string[] = [
  '/admin/*',   // Admin dashboard and all admin routes
]

/**
 * Generates the robots.txt configuration
 *
 * @returns {MetadataRoute.Robots} Robots configuration object for Next.js
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: BLOCKED_ROUTES,
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
