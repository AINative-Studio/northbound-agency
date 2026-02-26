/**
 * Test Suite: Homepage - Metadata & Schema.org Optimization
 *
 * Tests comprehensive metadata implementation including:
 * - Next.js metadata export
 * - OpenGraph metadata
 * - Twitter Card metadata
 * - Schema.org Organization structured data
 * - Schema.org WebSite structured data
 * - Schema.org LocalBusiness structured data
 * - SEO optimization elements
 */

import { render, screen } from '@testing-library/react';
import Home, { metadata } from '@/app/page';

// Mock the VideoBackground component
jest.mock('@/components/video-background', () => ({
  VideoBackground: () => <div data-testid="video-background">Video Background</div>,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <span data-testid="arrow-right-icon" />,
  Brain: () => <span data-testid="brain-icon" />,
  Code: () => <span data-testid="code-icon" />,
  Sparkles: () => <span data-testid="sparkles-icon" />,
  Zap: () => <span data-testid="zap-icon" />,
  Target: () => <span data-testid="target-icon" />,
  Layers: () => <span data-testid="layers-icon" />,
  MessageSquare: () => <span data-testid="message-square-icon" />,
  Shield: () => <span data-testid="shield-icon" />,
  TrendingUp: () => <span data-testid="trending-up-icon" />,
  Award: () => <span data-testid="award-icon" />,
}));

describe('Homepage Metadata', () => {
  describe('Basic Metadata', () => {
    it('should have proper page title optimized for SEO', () => {
      expect(metadata.title).toBe('Northbound Studio | AI-Native Digital Media Agency');
      expect(metadata.title).toContain('AI-Native');
      expect(metadata.title).toContain('Entertainment');
    });

    it('should have comprehensive meta description', () => {
      expect(metadata.description).toBeDefined();
      expect(metadata.description).toContain('AI-native digital agency');
      expect(metadata.description).toContain('custom AI applications');
      expect(metadata.description).toContain('RAG chatbots');
      expect(metadata.description).toContain('entertainment');
      expect((metadata.description as string).length).toBeLessThan(160);
    });

    it('should have relevant SEO keywords', () => {
      expect(metadata.keywords).toBeDefined();
      expect(Array.isArray(metadata.keywords)).toBe(true);
      expect((metadata.keywords as string[]).length).toBeGreaterThan(0);
      expect(metadata.keywords).toContain('AI digital agency');
      expect(metadata.keywords).toContain('AI-native agency');
      expect(metadata.keywords).toContain('RAG chatbots');
    });

    it('should have robots configuration for indexing', () => {
      expect(metadata.robots).toBeDefined();
      expect(metadata.robots).toMatchObject({
        index: true,
        follow: true,
      });
    });

    it('should have Google-specific bot configuration', () => {
      expect(metadata.robots?.googleBot).toBeDefined();
      expect(metadata.robots?.googleBot).toMatchObject({
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      });
    });

    it('should have canonical URL', () => {
      expect(metadata.alternates?.canonical).toBe('https://northboundstudio.co');
    });
  });

  describe('OpenGraph Metadata', () => {
    it('should have complete OpenGraph configuration', () => {
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe('Northbound Studio | AI-Native Digital Media Agency');
      expect(metadata.openGraph?.description).toContain('AI-native digital agency');
      expect(metadata.openGraph?.url).toBe('https://northboundstudio.co');
      expect(metadata.openGraph?.siteName).toBe('Northbound Studio');
      expect(metadata.openGraph?.type).toBe('website');
      expect(metadata.openGraph?.locale).toBe('en_US');
    });

    it('should have OpenGraph image with proper dimensions', () => {
      expect(metadata.openGraph?.images).toBeDefined();
      expect(Array.isArray(metadata.openGraph?.images)).toBe(true);
      const images = metadata.openGraph?.images as any[];
      expect(images.length).toBeGreaterThan(0);
      expect(images[0]).toMatchObject({
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: expect.stringContaining('Northbound Studio'),
      });
    });
  });

  describe('Twitter Card Metadata', () => {
    it('should have complete Twitter Card configuration', () => {
      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe('summary_large_image');
      expect(metadata.twitter?.title).toBe('Northbound Studio | AI-Native Digital Media Agency');
      expect(metadata.twitter?.description).toContain('AI-native digital agency');
    });

    it('should have Twitter image', () => {
      expect(metadata.twitter?.images).toBeDefined();
      expect(Array.isArray(metadata.twitter?.images)).toBe(true);
      expect(metadata.twitter?.images).toContain('/og-image.png');
    });

    it('should have Twitter creator handle', () => {
      expect(metadata.twitter?.creator).toBe('@northboundstudio');
    });
  });
});

describe('Schema.org Structured Data', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const result = render(<Home />);
    container = result.container;
  });

  describe('Organization Schema', () => {
    it('should render Organization JSON-LD script', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBeGreaterThanOrEqual(1);
    });

    it('should have valid Organization schema with required properties', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const organizationScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'Organization';
      });

      expect(organizationScript).toBeDefined();
      const schema = JSON.parse(organizationScript!.innerHTML);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Northbound Studio');
      expect(schema.url).toBe('https://northboundstudio.co');
      expect(schema.logo).toContain('logo.png');
      expect(schema.description).toContain('AI-native digital agency');
    });

    it('should have Organization contact information', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const organizationScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'Organization';
      });

      const schema = JSON.parse(organizationScript!.innerHTML);
      expect(schema.contactPoint).toBeDefined();
      expect(schema.contactPoint['@type']).toBe('ContactPoint');
      expect(schema.contactPoint.contactType).toBe('Customer Service');
      expect(schema.contactPoint.email).toContain('@');
      expect(schema.contactPoint.url).toContain('/contact');
    });

    it('should have Organization social media links', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const organizationScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'Organization';
      });

      const schema = JSON.parse(organizationScript!.innerHTML);
      expect(schema.sameAs).toBeDefined();
      expect(Array.isArray(schema.sameAs)).toBe(true);
      expect(schema.sameAs.length).toBeGreaterThan(0);
      expect(schema.sameAs.some((url: string) => url.includes('twitter') || url.includes('linkedin'))).toBe(true);
    });

    it('should have Organization knowledge areas', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const organizationScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'Organization';
      });

      const schema = JSON.parse(organizationScript!.innerHTML);
      expect(schema.knowsAbout).toBeDefined();
      expect(Array.isArray(schema.knowsAbout)).toBe(true);
      expect(schema.knowsAbout).toContain('Artificial Intelligence');
      expect(schema.knowsAbout).toContain('RAG Chatbots');
    });

    it('should have Organization service catalog', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const organizationScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'Organization';
      });

      const schema = JSON.parse(organizationScript!.innerHTML);
      expect(schema.hasOfferCatalog).toBeDefined();
      expect(schema.hasOfferCatalog['@type']).toBe('OfferCatalog');
      expect(schema.hasOfferCatalog.itemListElement).toBeDefined();
      expect(Array.isArray(schema.hasOfferCatalog.itemListElement)).toBe(true);
      expect(schema.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0);

      const firstOffer = schema.hasOfferCatalog.itemListElement[0];
      expect(firstOffer['@type']).toBe('Offer');
      expect(firstOffer.itemOffered['@type']).toBe('Service');
      expect(firstOffer.itemOffered.name).toBeDefined();
      expect(firstOffer.itemOffered.description).toBeDefined();
    });
  });

  describe('LocalBusiness Schema', () => {
    it('should render LocalBusiness JSON-LD script', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const localBusinessScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'LocalBusiness';
      });

      expect(localBusinessScript).toBeDefined();
    });

    it('should have valid LocalBusiness schema with required properties', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const localBusinessScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'LocalBusiness';
      });

      const schema = JSON.parse(localBusinessScript!.innerHTML);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema['@id']).toBe('https://northboundstudio.co');
      expect(schema.name).toBe('Northbound Studio');
      expect(schema.url).toBe('https://northboundstudio.co');
    });

    it('should have LocalBusiness contact information', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const localBusinessScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'LocalBusiness';
      });

      const schema = JSON.parse(localBusinessScript!.innerHTML);
      expect(schema.email).toContain('@');
      expect(schema.telephone).toBeDefined();
    });

    it('should have LocalBusiness address', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const localBusinessScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'LocalBusiness';
      });

      const schema = JSON.parse(localBusinessScript!.innerHTML);
      expect(schema.address).toBeDefined();
      expect(schema.address['@type']).toBe('PostalAddress');
      expect(schema.address.addressCountry).toBe('US');
    });

    it('should have LocalBusiness geo coordinates', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const localBusinessScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'LocalBusiness';
      });

      const schema = JSON.parse(localBusinessScript!.innerHTML);
      expect(schema.geo).toBeDefined();
      expect(schema.geo['@type']).toBe('GeoCoordinates');
      expect(schema.geo.latitude).toBeDefined();
      expect(schema.geo.longitude).toBeDefined();
    });

    it('should have LocalBusiness opening hours', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const localBusinessScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'LocalBusiness';
      });

      const schema = JSON.parse(localBusinessScript!.innerHTML);
      expect(schema.openingHoursSpecification).toBeDefined();
      expect(schema.openingHoursSpecification['@type']).toBe('OpeningHoursSpecification');
      expect(schema.openingHoursSpecification.dayOfWeek).toBeDefined();
      expect(Array.isArray(schema.openingHoursSpecification.dayOfWeek)).toBe(true);
    });
  });

  describe('WebSite Schema', () => {
    it('should render WebSite JSON-LD script', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const websiteScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'WebSite';
      });

      expect(websiteScript).toBeDefined();
    });

    it('should have valid WebSite schema with required properties', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const websiteScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'WebSite';
      });

      const schema = JSON.parse(websiteScript!.innerHTML);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Northbound Studio');
      expect(schema.url).toBe('https://northboundstudio.co');
    });

    it('should have WebSite description', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const websiteScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'WebSite';
      });

      const schema = JSON.parse(websiteScript!.innerHTML);
      expect(schema.description).toBeDefined();
      expect(schema.description).toContain('AI');
    });

    it('should have WebSite potential action for search', () => {
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const websiteScript = Array.from(scripts).find((script) => {
        const content = JSON.parse(script.innerHTML);
        return content['@type'] === 'WebSite';
      });

      const schema = JSON.parse(websiteScript!.innerHTML);
      expect(schema.potentialAction).toBeDefined();
      expect(schema.potentialAction['@type']).toBe('SearchAction');
      expect(schema.potentialAction.target).toBeDefined();
      expect(schema.potentialAction['query-input']).toBeDefined();
    });
  });
});

describe('Homepage Content', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('should render the hero section with main heading', () => {
    expect(screen.getByText(/We Don't Just Market Content/i)).toBeInTheDocument();
  });

  it('should render the value proposition', () => {
    expect(screen.getByText(/We build intelligent media systems at the intersection of entertainment, AI, and culture/i)).toBeInTheDocument();
  });

  it('should render call-to-action buttons', () => {
    expect(screen.getByText(/Build with AI/i)).toBeInTheDocument();
    expect(screen.getByText(/See the Demo/i)).toBeInTheDocument();
  });

  it('should render services section', () => {
    expect(screen.getByText(/What We Build/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Apps/i)).toBeInTheDocument();
    expect(screen.getByText(/RAG Bots/i)).toBeInTheDocument();
    expect(screen.getByText(/Conversational Media/i)).toBeInTheDocument();
    expect(screen.getByText(/Web Platforms/i)).toBeInTheDocument();
  });

  it('should render differentiators section', () => {
    expect(screen.getByText(/Why Northbound Studio/i)).toBeInTheDocument();
    expect(screen.getAllByText(/AI-Native/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Culture-First/i)).toBeInTheDocument();
    expect(screen.getByText(/Ownership-Driven/i)).toBeInTheDocument();
    expect(screen.getByText(/Engineering-Led/i)).toBeInTheDocument();
  });

  it('should render trust indicators', () => {
    expect(screen.getByText(/Secure & Compliant/i)).toBeInTheDocument();
    expect(screen.getByText(/Fast ROI/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Award-Winning/i).length).toBeGreaterThan(0);
  });
});
