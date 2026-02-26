import { render, screen } from '@testing-library/react';
import AboutPage, { metadata } from '@/app/about/page';

describe('AboutPage Metadata', () => {
  it('should have comprehensive SEO metadata', () => {
    expect(metadata.title).toBe('About Northbound Studio | AI-Native Agency Leadership');
    expect(metadata.description).toContain('AI');
    expect(metadata.description).toContain('culture');
    expect(metadata.description?.length).toBeGreaterThan(120);
    expect(metadata.description?.length).toBeLessThan(160);
  });

  it('should have Open Graph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBeDefined();
    expect(metadata.openGraph?.description).toBeDefined();
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.url).toBe('/about');
  });

  it('should have Twitter Card metadata', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.title).toBeDefined();
    expect(metadata.twitter?.description).toBeDefined();
  });

  it('should have keywords metadata for SEO', () => {
    expect(metadata.keywords).toBeDefined();
    expect(Array.isArray(metadata.keywords) || typeof metadata.keywords === 'string').toBe(true);

    const keywordsString = Array.isArray(metadata.keywords)
      ? metadata.keywords.join(' ')
      : metadata.keywords || '';

    expect(keywordsString).toContain('AI');
    expect(keywordsString.toLowerCase()).toContain('black media');
  });

  it('should have canonical URL metadata', () => {
    expect(metadata.alternates?.canonical).toBe('/about');
  });

  it('should have authors metadata', () => {
    expect(metadata.authors).toBeDefined();
  });

  it('should have robots metadata for proper indexing', () => {
    expect(metadata.robots).toBeDefined();
    const robots = metadata.robots as { index: boolean; follow: boolean };
    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(true);
  });
});

describe('AboutPage Schema.org JSON-LD', () => {
  it('should render Organization schema', () => {
    const { container } = render(<AboutPage />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeInTheDocument();

    if (script?.textContent) {
      const schema = JSON.parse(script.textContent);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Northbound Studio');
      expect(schema.url).toBeDefined();
      expect(schema.description).toBeDefined();
    }
  });

  it('should have comprehensive Organization properties', () => {
    const { container } = render(<AboutPage />);
    const script = container.querySelector('script[type="application/ld+json"]');

    if (script?.textContent) {
      const schema = JSON.parse(script.textContent);
      expect(schema.knowsAbout).toBeDefined();
      expect(Array.isArray(schema.knowsAbout)).toBe(true);
      expect(schema.makesOffer).toBeDefined();
      expect(Array.isArray(schema.makesOffer)).toBe(true);
      expect(schema.makesOffer.length).toBeGreaterThan(0);
    }
  });
});

describe('AboutPage Content', () => {
  it('should render main heading', () => {
    render(<AboutPage />);
    expect(screen.getByText('About Northbound Studio')).toBeInTheDocument();
  });

  it('should render mission section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  it('should render values section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Our Values')).toBeInTheDocument();
  });

  it('should render how we work section', () => {
    render(<AboutPage />);
    expect(screen.getByText('How We Work')).toBeInTheDocument();
  });

  it('should render CTA section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Let\'s Build Together')).toBeInTheDocument();
  });
});
