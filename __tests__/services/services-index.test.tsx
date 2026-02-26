import { render, screen } from '@testing-library/react';
import ServicesPage from '@/app/services/page';
import { metadata } from '@/app/services/page';

describe('Services Index Page - Metadata', () => {
  describe('Page Metadata Export', () => {
    it('should export metadata object', () => {
      expect(metadata).toBeDefined();
    });

    it('should have correct page title', () => {
      expect(metadata.title).toBe('Services - AI & Digital Media Solutions | Northbound Studio');
    });

    it('should have comprehensive meta description', () => {
      expect(metadata.description).toBeDefined();
      expect(metadata.description).toContain('AI-native');
      expect(metadata.description?.length).toBeGreaterThan(100);
    });
  });

  describe('OpenGraph Metadata', () => {
    it('should have OpenGraph configuration', () => {
      expect(metadata.openGraph).toBeDefined();
    });

    it('should have correct OpenGraph title', () => {
      expect(metadata.openGraph?.title).toBe('Services - AI & Digital Media Solutions | Northbound Studio');
    });

    it('should have OpenGraph description', () => {
      expect(metadata.openGraph?.description).toBeDefined();
    });

    it('should have correct OpenGraph URL', () => {
      expect(metadata.openGraph?.url).toBe('https://northboundstudio.co/services');
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
    });

    it('should have Twitter description', () => {
      expect(metadata.twitter?.description).toBeDefined();
    });
  });
});

describe('Services Index Page - Schema.org Markup', () => {
  beforeEach(() => {
    render(<ServicesPage />);
  });

  describe('Organization Schema', () => {
    it('should render organization JSON-LD script', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const orgScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('Organization') && content?.includes('Northbound Studio');
      });

      expect(orgScript).toBeDefined();
    });

    it('should have correct organization structure', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const orgScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('Organization') && content?.includes('Northbound Studio');
      });

      if (orgScript && orgScript.textContent) {
        const schema = JSON.parse(orgScript.textContent);
        expect(schema['@type']).toBe('Organization');
        expect(schema.name).toBe('Northbound Studio');
        expect(schema.url).toBe('https://northboundstudio.co');
      }
    });
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
        expect(schema.itemListElement.length).toBe(2);
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
        expect(schema.name).toBe('Northbound Studio Services');
      }
    });

    it('should have offer catalog with all services', () => {
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
        expect(schema.hasOfferCatalog.itemListElement.length).toBe(3);
      }
    });

    it('should include AI App Development service', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        const aiAppService = schema.hasOfferCatalog.itemListElement.find(
          (item: any) => item.itemOffered.name === 'AI App Development'
        );
        expect(aiAppService).toBeDefined();
        expect(aiAppService.itemOffered.url).toBe('https://northboundstudio.co/services/ai-apps');
      }
    });

    it('should include Web Development service', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        const webDevService = schema.hasOfferCatalog.itemListElement.find(
          (item: any) => item.itemOffered.name === 'Web Development'
        );
        expect(webDevService).toBeDefined();
        expect(webDevService.itemOffered.url).toBe('https://northboundstudio.co/services/web-dev');
      }
    });

    it('should include Media + AI Systems service', () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      const serviceScript = Array.from(scripts).find(script => {
        const content = script.textContent;
        return content?.includes('ProfessionalService');
      });

      if (serviceScript && serviceScript.textContent) {
        const schema = JSON.parse(serviceScript.textContent);
        const mediaAIService = schema.hasOfferCatalog.itemListElement.find(
          (item: any) => item.itemOffered.name === 'Media + AI Systems'
        );
        expect(mediaAIService).toBeDefined();
        expect(mediaAIService.itemOffered.url).toBe('https://northboundstudio.co/services/media-ai');
      }
    });
  });

  describe('Page Content', () => {
    it('should render main heading', () => {
      const heading = screen.getByRole('heading', { name: /Services/i, level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should render service descriptions', () => {
      expect(screen.getAllByText(/intelligent systems/i).length).toBeGreaterThan(0);
    });

    it('should render all three featured services', () => {
      expect(screen.getByText(/AI App Development/i)).toBeInTheDocument();
      expect(screen.getByText(/Web Development/i)).toBeInTheDocument();
      expect(screen.getByText(/Media \+ AI Systems/i)).toBeInTheDocument();
    });
  });
});
