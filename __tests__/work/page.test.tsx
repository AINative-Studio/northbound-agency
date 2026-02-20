import { render, screen } from '@testing-library/react';
import WorkPage, { metadata } from '@/app/work/page';

describe('WorkPage Metadata', () => {
  it('should have comprehensive SEO metadata', () => {
    expect(metadata.title).toBe('Our Work | AI Projects Portfolio - Blaq Digital');
    expect(metadata.description).toContain('AI');
    expect(metadata.description).toContain('portfolio');
    expect(metadata.description?.length).toBeGreaterThan(120);
    expect(metadata.description?.length).toBeLessThan(160);
  });

  it('should have Open Graph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBeDefined();
    expect(metadata.openGraph?.description).toBeDefined();
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.url).toBe('/work');
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
    expect(keywordsString.toLowerCase()).toContain('portfolio');
  });

  it('should have canonical URL metadata', () => {
    expect(metadata.alternates?.canonical).toBe('/work');
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

  it('should have category metadata', () => {
    expect(metadata.category).toBeDefined();
    expect(metadata.category).toContain('Portfolio');
  });
});

describe('WorkPage Schema.org JSON-LD', () => {
  it('should render ItemList schema for portfolio', () => {
    const { container } = render(<WorkPage />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeInTheDocument();

    if (script?.textContent) {
      const schema = JSON.parse(script.textContent);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('ItemList');
      expect(schema.itemListElement).toBeDefined();
      expect(Array.isArray(schema.itemListElement)).toBe(true);
    }
  });

  it('should have CreativeWork items in schema', () => {
    const { container } = render(<WorkPage />);
    const script = container.querySelector('script[type="application/ld+json"]');

    if (script?.textContent) {
      const schema = JSON.parse(script.textContent);
      expect(schema.itemListElement.length).toBeGreaterThan(0);

      const firstItem = schema.itemListElement[0];
      expect(firstItem['@type']).toBe('ListItem');
      expect(firstItem.position).toBe(1);
      expect(firstItem.item['@type']).toBe('CreativeWork');
      expect(firstItem.item.name).toBeDefined();
      expect(firstItem.item.creator).toBeDefined();
      expect(firstItem.item.creator.name).toBe('Blaq Digital');
    }
  });

  it('should include portfolio metadata in each item', () => {
    const { container } = render(<WorkPage />);
    const script = container.querySelector('script[type="application/ld+json"]');

    if (script?.textContent) {
      const schema = JSON.parse(script.textContent);
      const items = schema.itemListElement;

      items.forEach((listItem: any) => {
        expect(listItem.item.description).toBeDefined();
        expect(listItem.item.about).toBeDefined();
        expect(listItem.item.keywords).toBeDefined();
        expect(listItem.item.image).toBeDefined();
      });
    }
  });
});

describe('WorkPage Content', () => {
  it('should render main heading', () => {
    render(<WorkPage />);
    expect(screen.getByText('Our Work')).toBeInTheDocument();
  });

  it('should render case studies section', () => {
    render(<WorkPage />);
    expect(screen.getByText(/AI-Powered Content Discovery Platform/)).toBeInTheDocument();
  });

  it('should render multiple case studies', () => {
    render(<WorkPage />);
    expect(screen.getByText(/Interactive Fan Engagement Platform/)).toBeInTheDocument();
    expect(screen.getByText(/Automated Content Intelligence System/)).toBeInTheDocument();
  });

  it('should display tech stack badges', () => {
    render(<WorkPage />);
    expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('RAG').length).toBeGreaterThan(0);
  });

  it('should render CTA section', () => {
    render(<WorkPage />);
    expect(screen.getByText(/Ready to See Similar Results?/)).toBeInTheDocument();
  });
});
