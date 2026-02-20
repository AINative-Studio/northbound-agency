/**
 * Robots.txt Configuration for Blaq Digital
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
 * Base URL for the Blaq Digital website
 */
const BASE_URL = 'https://blaq.ainative.studio'

/**
 * Routes that should be blocked from search engine indexing
 * These are sensitive or internal routes that should not appear in search results
 */
const BLOCKED_ROUTES: string[] = [
  '/api/',      // API endpoints
  '/admin/',    // Admin dashboard
  '/login/',    // Authentication pages
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
