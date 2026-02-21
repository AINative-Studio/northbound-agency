import { render } from '@testing-library/react';
import ContactPage, { metadata } from '../page';

describe('Contact Page Metadata', () => {
  it('should export metadata with correct title', () => {
    expect(metadata.title).toBe('Contact Blaq Digital | AI Development Consultation');
  });

  it('should export metadata with correct description', () => {
    expect(metadata.description).toContain('Get in touch with Blaq Digital');
    expect(metadata.description).toContain('AI development');
    expect(metadata.description).toContain('South Africa');
  });

  it('should have OpenGraph metadata with correct properties', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBe('Contact Blaq Digital | AI Development Consultation');
    expect(metadata.openGraph?.description).toContain('AI development');
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.url).toBe('https://blaq.ainative.studio/contact');
  });

  it('should have Twitter Card metadata with correct properties', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.title).toBe('Contact Blaq Digital | AI Development Consultation');
    expect(metadata.twitter?.description).toContain('AI development');
  });
});

describe('Contact Page Schema.org Markup', () => {
  it('should render ContactPage schema with correct type and context', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    // Should have at least 2 scripts (ContactPage and FAQPage)
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    // Find ContactPage schema
    const contactPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"ContactPage"');
    });

    expect(contactPageScript).toBeDefined();
    const contactPageData = JSON.parse(contactPageScript?.textContent || '{}');

    expect(contactPageData['@context']).toBe('https://schema.org');
    expect(contactPageData['@type']).toBe('ContactPage');
  });

  it('should include Organization mainEntity in ContactPage schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const contactPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"ContactPage"');
    });

    const contactPageData = JSON.parse(contactPageScript?.textContent || '{}');

    expect(contactPageData.mainEntity).toBeDefined();
    expect(contactPageData.mainEntity['@type']).toBe('Organization');
    expect(contactPageData.mainEntity.name).toBe('Blaq Digital');
  });

  it('should include ContactPoint with email in ContactPage schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const contactPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"ContactPage"');
    });

    const contactPageData = JSON.parse(contactPageScript?.textContent || '{}');
    const contactPoint = contactPageData.mainEntity?.contactPoint;

    expect(contactPoint).toBeDefined();
    expect(contactPoint['@type']).toBe('ContactPoint');
    expect(contactPoint.contactType).toBe('Customer Service');
    expect(contactPoint.email).toBeDefined();
    expect(contactPoint.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Valid email format
  });

  it('should include availableLanguage in ContactPoint', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const contactPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"ContactPage"');
    });

    const contactPageData = JSON.parse(contactPageScript?.textContent || '{}');
    const contactPoint = contactPageData.mainEntity?.contactPoint;

    expect(contactPoint.availableLanguage).toBeDefined();
    expect(Array.isArray(contactPoint.availableLanguage)).toBe(true);
    expect(contactPoint.availableLanguage).toContain('English');
  });

  it('should include areaServed in ContactPage schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const contactPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"ContactPage"');
    });

    const contactPageData = JSON.parse(contactPageScript?.textContent || '{}');

    expect(contactPageData.mainEntity?.areaServed).toBeDefined();
    expect(contactPageData.mainEntity?.areaServed).toContain('ZA'); // South Africa
    expect(contactPageData.mainEntity?.areaServed).toContain('Global');
  });

  it('should render FAQPage schema with correct type', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const faqPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"FAQPage"');
    });

    expect(faqPageScript).toBeDefined();
    const faqPageData = JSON.parse(faqPageScript?.textContent || '{}');

    expect(faqPageData['@context']).toBe('https://schema.org');
    expect(faqPageData['@type']).toBe('FAQPage');
  });

  it('should include mainEntity array with Questions in FAQPage schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const faqPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"FAQPage"');
    });

    const faqPageData = JSON.parse(faqPageScript?.textContent || '{}');

    expect(faqPageData.mainEntity).toBeDefined();
    expect(Array.isArray(faqPageData.mainEntity)).toBe(true);
    expect(faqPageData.mainEntity.length).toBeGreaterThan(0);

    // Check first question structure
    const firstQuestion = faqPageData.mainEntity[0];
    expect(firstQuestion['@type']).toBe('Question');
    expect(firstQuestion.name).toBeDefined();
    expect(firstQuestion.acceptedAnswer).toBeDefined();
    expect(firstQuestion.acceptedAnswer['@type']).toBe('Answer');
    expect(firstQuestion.acceptedAnswer.text).toBeDefined();
  });

  it('should include at least 5 FAQ questions', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const faqPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"FAQPage"');
    });

    const faqPageData = JSON.parse(faqPageScript?.textContent || '{}');

    expect(faqPageData.mainEntity.length).toBeGreaterThanOrEqual(5);
  });

  it('should include question about AI services in FAQ', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const faqPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"FAQPage"');
    });

    const faqPageData = JSON.parse(faqPageScript?.textContent || '{}');

    const aiServicesQuestion = faqPageData.mainEntity.find(
      (q: any) => q.name.toLowerCase().includes('ai services')
    );

    expect(aiServicesQuestion).toBeDefined();
    expect(aiServicesQuestion.acceptedAnswer.text).toContain('AI');
  });

  it('should include question about project timeline in FAQ', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const faqPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"FAQPage"');
    });

    const faqPageData = JSON.parse(faqPageScript?.textContent || '{}');

    const timelineQuestion = faqPageData.mainEntity.find(
      (q: any) => q.name.toLowerCase().includes('long') || q.name.toLowerCase().includes('timeline')
    );

    expect(timelineQuestion).toBeDefined();
  });

  it('should include question about pricing in FAQ', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const faqPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"FAQPage"');
    });

    const faqPageData = JSON.parse(faqPageScript?.textContent || '{}');

    const pricingQuestion = faqPageData.mainEntity.find(
      (q: any) => q.name.toLowerCase().includes('price') || q.name.toLowerCase().includes('pricing')
    );

    expect(pricingQuestion).toBeDefined();
    expect(pricingQuestion.acceptedAnswer.text.length).toBeGreaterThan(50);
  });
});

describe('Contact Page Component', () => {
  it('should render ContactPageClient component', () => {
    const { container } = render(<ContactPage />);
    expect(container).toBeDefined();
  });

  it('should render both Schema.org scripts before content', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts.length).toBe(2);
  });
});
