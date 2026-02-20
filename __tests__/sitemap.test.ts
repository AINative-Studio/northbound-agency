/**
 * Test Suite: Dynamic Sitemap Generation
 *
 * Tests for the /sitemap.xml route
 * Covers structure, URLs, priorities, changeFrequency, and SEO requirements
 *
 * Built by AINative
 */

import { MetadataRoute } from 'next';
import sitemap from '@/app/sitemap';

describe('Dynamic Sitemap Generation', () => {
  let sitemapData: MetadataRoute.Sitemap;

  beforeAll(() => {
    sitemapData = sitemap();
  });

  describe('Sitemap Structure', () => {
    it('should return an array of sitemap entries', () => {
      expect(Array.isArray(sitemapData)).toBe(true);
      expect(sitemapData.length).toBeGreaterThan(0);
    });

    it('should have all required fields for each entry', () => {
      sitemapData.forEach((entry) => {
        expect(entry).toHaveProperty('url');
        expect(entry).toHaveProperty('lastModified');
        expect(entry).toHaveProperty('changeFrequency');
        expect(entry).toHaveProperty('priority');
      });
    });

    it('should have valid URL format for all entries', () => {
      sitemapData.forEach((entry) => {
        expect(entry.url).toMatch(/^https?:\/\//);
        expect(() => new URL(entry.url)).not.toThrow();
      });
    });

    it('should use correct base URL', () => {
      const baseUrl = 'https://blaq.ainative.studio';
      sitemapData.forEach((entry) => {
        expect(entry.url).toContain(baseUrl);
      });
    });
  });

  describe('Required Static Pages', () => {
    it('should include home page with highest priority', () => {
      const homePage = sitemapData.find((entry) => entry.url === 'https://blaq.ainative.studio');
      expect(homePage).toBeDefined();
      expect(homePage?.priority).toBe(1);
      expect(homePage?.changeFrequency).toBe('weekly');
    });

    it('should include about page', () => {
      const aboutPage = sitemapData.find((entry) => entry.url.endsWith('/about'));
      expect(aboutPage).toBeDefined();
      expect(aboutPage?.priority).toBeGreaterThanOrEqual(0.7);
      expect(aboutPage?.changeFrequency).toBe('monthly');
    });

    it('should include services page with high priority', () => {
      const servicesPage = sitemapData.find((entry) => entry.url === 'https://blaq.ainative.studio/services');
      expect(servicesPage).toBeDefined();
      expect(servicesPage?.priority).toBeGreaterThanOrEqual(0.8);
      expect(servicesPage?.changeFrequency).toBe('monthly');
    });

    it('should include contact page', () => {
      const contactPage = sitemapData.find((entry) => entry.url.endsWith('/contact'));
      expect(contactPage).toBeDefined();
      expect(contactPage?.priority).toBeGreaterThanOrEqual(0.5);
    });

    it('should include work/portfolio page', () => {
      const workPage = sitemapData.find((entry) => entry.url.endsWith('/work'));
      expect(workPage).toBeDefined();
      expect(workPage?.priority).toBeGreaterThanOrEqual(0.7);
      expect(workPage?.changeFrequency).toBe('weekly');
    });
  });

  describe('Service Sub-pages', () => {
    it('should include AI Apps service page', () => {
      const aiAppsPage = sitemapData.find((entry) => entry.url.endsWith('/services/ai-apps'));
      expect(aiAppsPage).toBeDefined();
      expect(aiAppsPage?.priority).toBeGreaterThanOrEqual(0.7);
    });

    it('should include Media AI service page', () => {
      const mediaAiPage = sitemapData.find((entry) => entry.url.endsWith('/services/media-ai'));
      expect(mediaAiPage).toBeDefined();
      expect(mediaAiPage?.priority).toBeGreaterThanOrEqual(0.7);
    });

    it('should include Web Dev service page', () => {
      const webDevPage = sitemapData.find((entry) => entry.url.endsWith('/services/web-dev'));
      expect(webDevPage).toBeDefined();
      expect(webDevPage?.priority).toBeGreaterThanOrEqual(0.7);
    });
  });

  describe('Additional Pages', () => {
    it('should include demos page', () => {
      const demosPage = sitemapData.find((entry) => entry.url.endsWith('/demos'));
      expect(demosPage).toBeDefined();
      expect(demosPage?.priority).toBeGreaterThanOrEqual(0.6);
    });
  });

  describe('Priority Values', () => {
    it('should have priority values between 0 and 1', () => {
      sitemapData.forEach((entry) => {
        expect(entry.priority).toBeGreaterThanOrEqual(0);
        expect(entry.priority).toBeLessThanOrEqual(1);
      });
    });

    it('should have home page with priority 1.0', () => {
      const homePage = sitemapData.find((entry) => entry.url === 'https://blaq.ainative.studio');
      expect(homePage?.priority).toBe(1);
    });

    it('should have services higher priority than contact', () => {
      const servicesPage = sitemapData.find((entry) => entry.url === 'https://blaq.ainative.studio/services');
      const contactPage = sitemapData.find((entry) => entry.url.endsWith('/contact'));

      if (servicesPage && contactPage) {
        expect(servicesPage.priority).toBeGreaterThan(contactPage.priority);
      }
    });
  });

  describe('Change Frequency', () => {
    it('should have valid changeFrequency values', () => {
      const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

      sitemapData.forEach((entry) => {
        expect(validFrequencies).toContain(entry.changeFrequency);
      });
    });

    it('should use weekly for home and work pages', () => {
      const homePage = sitemapData.find((entry) => entry.url === 'https://blaq.ainative.studio');
      const workPage = sitemapData.find((entry) => entry.url.endsWith('/work'));

      expect(homePage?.changeFrequency).toBe('weekly');
      expect(workPage?.changeFrequency).toBe('weekly');
    });

    it('should use monthly for static pages', () => {
      const aboutPage = sitemapData.find((entry) => entry.url.endsWith('/about'));
      const servicesPage = sitemapData.find((entry) => entry.url === 'https://blaq.ainative.studio/services');

      expect(aboutPage?.changeFrequency).toBe('monthly');
      expect(servicesPage?.changeFrequency).toBe('monthly');
    });
  });

  describe('Last Modified Date', () => {
    it('should have valid Date objects for lastModified', () => {
      sitemapData.forEach((entry) => {
        expect(entry.lastModified).toBeInstanceOf(Date);
        expect(entry.lastModified.toString()).not.toBe('Invalid Date');
      });
    });

    it('should have recent lastModified dates', () => {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      sitemapData.forEach((entry) => {
        expect(entry.lastModified.getTime()).toBeGreaterThan(oneYearAgo.getTime());
      });
    });
  });

  describe('SEO Best Practices', () => {
    it('should not have duplicate URLs', () => {
      const urls = sitemapData.map((entry) => entry.url);
      const uniqueUrls = new Set(urls);
      expect(urls.length).toBe(uniqueUrls.size);
    });

    it('should not have trailing slashes (except root)', () => {
      sitemapData.forEach((entry) => {
        if (entry.url !== 'https://blaq.ainative.studio' && entry.url !== 'https://blaq.ainative.studio/') {
          expect(entry.url).not.toMatch(/\/$/);
        }
      });
    });

    it('should have at least 8 pages for good SEO coverage', () => {
      expect(sitemapData.length).toBeGreaterThanOrEqual(8);
    });

    it('should not include admin or login pages', () => {
      const hasAdminPages = sitemapData.some((entry) =>
        entry.url.includes('/admin') || entry.url.includes('/login')
      );
      expect(hasAdminPages).toBe(false);
    });
  });

  describe('Type Safety', () => {
    it('should match MetadataRoute.Sitemap type', () => {
      // This test verifies TypeScript compilation
      const typedSitemap: MetadataRoute.Sitemap = sitemap();
      expect(typedSitemap).toBeDefined();
    });
  });
});
