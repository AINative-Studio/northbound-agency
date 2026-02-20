import { render, screen } from '@testing-library/react';
import WebDevPage from '@/app/services/web-dev/page';
import { metadata } from '@/app/services/web-dev/page';

describe('Web Development Service Page - Metadata', () => {
  describe('Page Metadata Export', () => {
    it('should export metadata object', () => {
      expect(metadata).toBeDefined();
    });

    it('should have correct page title', () => {
      expect(metadata.title).toBe('AI-Native Web Development | Next.js, Python & FastAPI | Blaq Digital');
    });

    it('should have comprehensive meta description', () => {
      expect(metadata.description).toBeDefined();
      expect(metadata.description).toContain('web');
      expect(metadata.description?.length).toBeGreaterThan(100);
      expect(metadata.description?.length).toBeLessThan(160);
    });

    it('should have relevant keywords', () => {
      expect(metadata.keywords).toBeDefined();
      expect(Array.isArray(metadata.keywords)).toBe(true);
      expect((metadata.keywords as string[]).length).toBeGreaterThan(0);
    });
  });

  describe('OpenGraph Metadata', () => {
    it('should have OpenGraph configuration', () => {
      expect(metadata.openGraph).toBeDefined();
    });

    it('should have correct OpenGraph title', () => {
      expect(metadata.openGraph?.title).toBe('AI-Native Web Development | Next.js, Python & FastAPI | Blaq Digital');
    });

    it('should have OpenGraph description', () => {
      expect(metadata.openGraph?.description).toBeDefined();
      expect(metadata.openGraph?.description).toContain('web');
    });

    it('should have correct OpenGraph URL', () => {
      expect(metadata.openGraph?.url).toBe('https://blaq.ainative.studio/services/web-dev');
    });

    it('should have OpenGraph type set to website', () => {
      expect(metadata.openGraph?.type).toBe('website');
    });
  });

  describe('Twitter Card Metadata', () => {
    it('should have Twitter card configuration', () => {
      expect(metadata.twitter).toBeDefined();
    });

    it('should have summary_large_image card type', () => {
      expect(metadata.twitter?.card).toBe('summary_large_image');
    });

    it('should have Twitter title', () => {
      expect(metadata.twitter?.title).toBeDefined();
      expect(metadata.twitter?.title).toContain('Web Development');
    });

    it('should have Twitter description', () => {
      expect(metadata.twitter?.description).toBeDefined();
    });
  });
});

describe('Web Development Service Page - Schema.org Markup', () => {
  beforeEach(() => {
    render(<WebDevPage />);
  });

  describe('Breadcrumb Schema', () => {
    it('should render breadcrumb JSON-LD script', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const breadcrumbScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('BreadcrumbList');
      });

      expect(breadcrumbScript).toBeDefined();
    });

    it('should have correct breadcrumb structure', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const breadcrumbScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('BreadcrumbList');
      });

      if (breadcrumbScript && breadcrumbScript.textContent) {
        const schema = JSON.parse(breadcrumbScript.textContent);
        expect(schema['@type']).toBe('BreadcrumbList');
        expect(schema.itemListElement).toBeDefined();
        expect(schema.itemListElement.length).toBe(3);
        expect(schema.itemListElement[2].name).toBe('Web Development');
      }
    });
  });

  describe('Service Schema', () => {
    it('should render service JSON-LD script', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      expect(serviceScript).toBeDefined();
    });

    it('should have correct service type', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        expect(schema['@type']).toBe('ProfessionalService');
        expect(schema.name).toBe('Modern Web Development');
        expect(schema.serviceType).toBe('Modern web development');
      }
    });

    it('should have service provider reference', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        expect(schema.provider).toBeDefined();
        expect(schema.provider['@id']).toBe('https://blaq.ainative.studio/#organization');
      }
    });

    it('should have offer catalog with services', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        expect(schema.hasOfferCatalog).toBeDefined();
        expect(schema.hasOfferCatalog['@type']).toBe('OfferCatalog');
        expect(schema.hasOfferCatalog.itemListElement).toBeDefined();
        expect(schema.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0);
      }
    });

    it('should have area served', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        expect(schema.areaServed).toBe('US');
      }
    });

    it('should have correct service URL', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        expect(schema.url).toBe('https://blaq.ainative.studio/services/web-dev');
      }
    });
  });

  describe('Page Content', () => {
    it('should render main heading', () => {
      const heading = screen.getByRole('heading', { name: /AI-Native Web Development/i, level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should render service description', () => {
      expect(screen.getByText(/High-performance AI-powered web platforms/i)).toBeInTheDocument();
    });
  });
});
