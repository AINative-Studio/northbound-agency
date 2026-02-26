/**
 * Test Suite: Robots.txt Configuration
 *
 * Tests for the /robots.txt configuration file
 * Ensures proper SEO configuration with search engine access control
 */

import { MetadataRoute } from 'next';
import robots from '@/app/robots';

describe('robots.ts', () => {
  let robotsConfig: MetadataRoute.Robots;

  beforeEach(() => {
    robotsConfig = robots();
  });

  describe('Basic Configuration', () => {
    it('should return a valid robots configuration object', () => {
      expect(robotsConfig).toBeDefined();
      expect(typeof robotsConfig).toBe('object');
    });

    it('should have rules property', () => {
      expect(robotsConfig.rules).toBeDefined();
    });

    it('should have sitemap property', () => {
      expect(robotsConfig.sitemap).toBeDefined();
      expect(typeof robotsConfig.sitemap).toBe('string');
    });
  });

  describe('User Agent Configuration', () => {
    it('should allow all user agents', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.userAgent).toBe('*');
    });

    it('should allow crawling of the root path', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.allow).toBeDefined();
      expect(rules.allow).toContain('/');
    });
  });

  describe('Disallow Rules', () => {
    it('should block /api/ routes', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.disallow).toBeDefined();
      expect(Array.isArray(rules.disallow)).toBe(true);
      expect(rules.disallow).toContain('/api/');
    });

    it('should block /admin/ routes', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.disallow).toContain('/admin/');
    });

    it('should block /login/ routes', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.disallow).toContain('/login/');
    });

    it('should have at least 3 disallow rules', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(Array.isArray(rules.disallow)).toBe(true);
      expect((rules.disallow as string[]).length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Sitemap Configuration', () => {
    it('should reference the sitemap.xml file', () => {
      expect(robotsConfig.sitemap).toContain('sitemap.xml');
    });

    it('should use the correct domain', () => {
      expect(robotsConfig.sitemap).toContain('northboundstudio.co');
    });

    it('should use HTTPS protocol', () => {
      expect(robotsConfig.sitemap).toMatch(/^https:\/\//);
    });

    it('should have a valid sitemap URL format', () => {
      const urlPattern = /^https:\/\/[a-z0-9.-]+\/sitemap\.xml$/;
      expect(robotsConfig.sitemap).toMatch(urlPattern);
    });
  });

  describe('SEO Best Practices', () => {
    it('should not block all search engines', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      // Should have an allow rule, not block everything
      expect(rules.allow).toBeDefined();
    });

    it('should protect sensitive routes while allowing public content', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      // Should block admin/api but allow public routes
      expect(rules.disallow).toContain('/admin/');
      expect(rules.disallow).toContain('/api/');
      expect(rules.allow).toContain('/');
    });

    it('should have a sitemap reference for better indexing', () => {
      expect(robotsConfig.sitemap).toBeDefined();
      expect(robotsConfig.sitemap).not.toBe('');
    });
  });

  describe('Type Safety', () => {
    it('should conform to Next.js MetadataRoute.Robots type', () => {
      // Type check - this will fail at compile time if type is wrong
      const testRobots: MetadataRoute.Robots = robots();
      expect(testRobots).toBeDefined();
    });

    it('should return consistent structure on multiple calls', () => {
      const firstCall = robots();
      const secondCall = robots();

      expect(firstCall).toEqual(secondCall);
    });
  });

  describe('Security Considerations', () => {
    it('should block API endpoints from search indexing', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.disallow).toContain('/api/');
    });

    it('should block admin pages from search indexing', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.disallow).toContain('/admin/');
    });

    it('should block authentication pages from search indexing', () => {
      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules[0]
        : robotsConfig.rules;

      expect(rules.disallow).toContain('/login/');
    });
  });
});
