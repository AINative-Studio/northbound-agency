import { render, screen } from '@testing-library/react';
import MediaAIPage from '@/app/services/media-ai/page';
import { metadata } from '@/app/services/media-ai/page';

describe('Media AI Service Page - Metadata', () => {
  describe('Page Metadata Export', () => {
    it('should export metadata object', () => {
      expect(metadata).toBeDefined();
    });

    it('should have correct page title', () => {
      expect(metadata.title).toBe('AI Media Production & AI Content Creation Services | Northbound Studio');
    });

    it('should have comprehensive meta description', () => {
      expect(metadata.description).toBeDefined();
      expect(metadata.description).toContain('content');
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
      expect(metadata.openGraph?.title).toBe('AI Media Production & AI Content Creation Services | Northbound Studio');
    });

    it('should have OpenGraph description', () => {
      expect(metadata.openGraph?.description).toBeDefined();
      expect(metadata.openGraph?.description).toContain('content');
    });

    it('should have correct OpenGraph URL', () => {
      expect(metadata.openGraph?.url).toBe('https://northboundstudio.co/services/media-ai');
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
      expect(metadata.twitter?.title).toContain('AI Media Production');
    });

    it('should have Twitter description', () => {
      expect(metadata.twitter?.description).toBeDefined();
    });
  });
});

describe('Media AI Service Page - Schema.org Markup', () => {
  beforeEach(() => {
    render(<MediaAIPage />);
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
        expect(schema.itemListElement[2].name).toBe('Media + AI Systems');
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
        expect(schema.name).toBe('Media + AI Systems');
        expect(schema.serviceType).toBe('AI media production');
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
        expect(schema.provider['@id']).toBe('https://northboundstudio.co/#organization');
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
        expect(schema.url).toBe('https://northboundstudio.co/services/media-ai');
      }
    });
  });

  describe('Page Content', () => {
    it('should render main heading', () => {
      const heading = screen.getByRole('heading', { name: /Media \+ AI Systems/i, level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should render service description', () => {
      expect(screen.getByText(/intelligent media infrastructure/i)).toBeInTheDocument();
    });
  });
});
