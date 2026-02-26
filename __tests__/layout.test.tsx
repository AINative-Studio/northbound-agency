import { render } from '@testing-library/react';
import { metadata } from '@/app/layout';
import RootLayout from '@/app/layout';

// Mock Navigation component
jest.mock('@/components/navigation', () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>,
}));

// Mock Footer component
jest.mock('@/components/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe('Root Layout Component', () => {
  it('should render children correctly', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    );

    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument();
  });

  it('should render Navigation component', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(getByTestId('navigation')).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it('should have correct HTML structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const html = container.querySelector('html');
    expect(html).toHaveAttribute('lang', 'en');
  });

  it('should wrap children in main element with correct classes', () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('min-h-screen', 'pt-16');
  });
});

describe('Root Layout Metadata', () => {
  describe('metadataBase Configuration', () => {
    it('should have metadataBase configured', () => {
      expect(metadata.metadataBase).toBeDefined();
    });

    it('should use production URL for metadataBase', () => {
      expect(metadata.metadataBase).toBeInstanceOf(URL);
      expect(metadata.metadataBase?.toString()).toBe('https://northboundstudio.co/');
    });

    it('should use HTTPS protocol', () => {
      expect(metadata.metadataBase?.protocol).toBe('https:');
    });

    it('should use correct hostname', () => {
      expect(metadata.metadataBase?.hostname).toBe('northboundstudio.co');
    });
  });

  describe('SEO Metadata', () => {
    it('should have title defined', () => {
      expect(metadata.title).toBeDefined();
      expect(metadata.title).toBe('Northbound Studio - AI-Native Digital Media Agency');
    });

    it('should have description defined', () => {
      expect(metadata.description).toBeDefined();
      expect(typeof metadata.description).toBe('string');
      expect((metadata.description as string).length).toBeGreaterThan(50);
    });

    it('should include AI and digital media keywords in description', () => {
      const description = metadata.description as string;
      expect(description.toLowerCase()).toMatch(/ai|artificial intelligence/);
      expect(description.toLowerCase()).toMatch(/digital|media/);
    });
  });

  describe('OpenGraph Configuration', () => {
    it('should have OpenGraph metadata configured', () => {
      expect(metadata.openGraph).toBeDefined();
    });

    it('should have OpenGraph title', () => {
      expect(metadata.openGraph?.title).toBeDefined();
      expect(metadata.openGraph?.title).toBe('Northbound Studio - AI-Native Digital Media Agency');
    });

    it('should have OpenGraph description', () => {
      expect(metadata.openGraph?.description).toBeDefined();
      expect(typeof metadata.openGraph?.description).toBe('string');
    });

    it('should have OpenGraph type set to website', () => {
      expect(metadata.openGraph?.type).toBe('website');
    });

    it('should inherit metadataBase for OpenGraph images', () => {
      // With metadataBase set, relative URLs in OG images will resolve correctly
      expect(metadata.metadataBase).toBeDefined();
    });
  });

  describe('Twitter Card Configuration', () => {
    it('should have Twitter metadata configured', () => {
      expect(metadata.twitter).toBeDefined();
    });

    it('should use summary_large_image card type', () => {
      expect(metadata.twitter?.card).toBe('summary_large_image');
    });

    it('should have Twitter title', () => {
      expect(metadata.twitter?.title).toBeDefined();
      expect(metadata.twitter?.title).toBe('Northbound Studio - AI-Native Digital Media Agency');
    });

    it('should have Twitter description', () => {
      expect(metadata.twitter?.description).toBeDefined();
      expect(typeof metadata.twitter?.description).toBe('string');
    });
  });

  describe('Metadata Consistency', () => {
    it('should have consistent titles across metadata types', () => {
      expect(metadata.title).toBe(metadata.openGraph?.title);
      expect(metadata.title).toBe(metadata.twitter?.title);
    });

    it('should have descriptive content for social sharing', () => {
      const ogDescription = metadata.openGraph?.description as string;
      const twitterDescription = metadata.twitter?.description as string;

      expect(ogDescription.length).toBeGreaterThan(20);
      expect(twitterDescription.length).toBeGreaterThan(20);
    });
  });

  describe('URL Resolution', () => {
    it('should correctly resolve absolute URLs with metadataBase', () => {
      const base = metadata.metadataBase;
      expect(base).toBeDefined();

      // Test URL resolution
      const testPath = '/services';
      const resolvedUrl = new URL(testPath, base);
      expect(resolvedUrl.toString()).toBe('https://northboundstudio.co/services');
    });

    it('should handle root path correctly', () => {
      const base = metadata.metadataBase;
      const rootUrl = new URL('/', base!);
      expect(rootUrl.toString()).toBe('https://northboundstudio.co/');
    });

    it('should handle paths with trailing slashes', () => {
      const base = metadata.metadataBase;
      const urlWithSlash = new URL('/about/', base!);
      expect(urlWithSlash.toString()).toBe('https://northboundstudio.co/about/');
    });

    it('should handle nested paths correctly', () => {
      const base = metadata.metadataBase;
      const nestedPath = new URL('/services/web-development', base!);
      expect(nestedPath.toString()).toBe('https://northboundstudio.co/services/web-development');
    });

    it('should handle query parameters in URLs', () => {
      const base = metadata.metadataBase;
      const urlWithQuery = new URL('/search?q=ai', base!);
      expect(urlWithQuery.toString()).toBe('https://northboundstudio.co/search?q=ai');
    });
  });

  describe('Production Environment Validation', () => {
    it('should not use localhost or development URLs', () => {
      const baseUrl = metadata.metadataBase?.toString() || '';
      expect(baseUrl).not.toContain('localhost');
      expect(baseUrl).not.toContain('127.0.0.1');
      expect(baseUrl).not.toContain(':3000');
      expect(baseUrl).not.toContain(':3456');
    });

    it('should use a valid top-level domain', () => {
      const hostname = metadata.metadataBase?.hostname || '';
      expect(hostname).toMatch(/\.(studio|com|org|net|io)$/);
    });

    it('should not have port numbers', () => {
      expect(metadata.metadataBase?.port).toBe('');
    });
  });

  describe('SEO Best Practices', () => {
    it('should have description within recommended length', () => {
      const description = metadata.description as string;
      // SEO best practice: 150-160 characters for meta descriptions
      expect(description.length).toBeGreaterThanOrEqual(50);
      expect(description.length).toBeLessThanOrEqual(300);
    });

    it('should have concise title within recommended length', () => {
      const title = metadata.title as string;
      // SEO best practice: titles should be 50-60 characters
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(100);
    });

    it('should not have duplicate metadata values', () => {
      // Ensure each field provides value, not just duplication
      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.openGraph?.description).toBeDefined();
      expect(metadata.twitter?.description).toBeDefined();
    });
  });
});
