import { render } from '@testing-library/react';
import ContactPage, { metadata } from '../page';

describe('Contact Page Metadata', () => {
  it('should export metadata with correct title including location keywords', () => {
    expect(metadata.title).toBe('Contact Northbound Studio Cape Town | AI Development & Digital Media Agency South Africa');
    expect(metadata.title).toContain('Cape Town');
    expect(metadata.title).toContain('South Africa');
  });

  it('should export metadata with correct description and CTA', () => {
    expect(metadata.description).toContain('Contact Northbound Studio');
    expect(metadata.description).toContain('AI development');
    expect(metadata.description).toContain('Cape Town');
    expect(metadata.description).toContain('Free 30-minute consultation');
    expect(metadata.description).toContain('24 hours');
  });

  it('should have OpenGraph metadata with correct properties', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBe('Contact Northbound Studio Cape Town | AI Development & Digital Media Agency');
    expect(metadata.openGraph?.description).toContain('AI development');
    expect(metadata.openGraph?.description).toContain('Free 30-minute consultation');
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.url).toBe('https://northboundstudio.co/contact');
  });

  it('should have Twitter Card metadata with correct properties', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.title).toBe('Contact Northbound Studio Cape Town | AI Development & Digital Media Agency');
    expect(metadata.twitter?.description).toContain('AI development');
    expect(metadata.twitter?.description).toContain('Free 30-minute consultation');
  });
});

describe('Contact Page Schema.org Markup', () => {
  it('should render all three schema types (ContactPage, LocalBusiness, FAQPage)', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    // Should have exactly 3 scripts (ContactPage, LocalBusiness, and FAQPage)
    expect(scripts.length).toBe(3);

    const scriptContents = Array.from(scripts).map(script => script.textContent || '');

    expect(scriptContents.some(content => content.includes('"@type":"ContactPage"'))).toBe(true);
    expect(scriptContents.some(content => content.includes('"@type":"LocalBusiness"'))).toBe(true);
    expect(scriptContents.some(content => content.includes('"@type":"FAQPage"'))).toBe(true);
  });

  it('should render ContactPage schema with correct type and context', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

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
    expect(contactPageData.mainEntity.name).toBe('Northbound Studio');
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

  it('should include question about location and international clients in FAQ', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const faqPageScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"FAQPage"');
    });

    const faqPageData = JSON.parse(faqPageScript?.textContent || '{}');

    const locationQuestion = faqPageData.mainEntity.find(
      (q: any) => q.name.toLowerCase().includes('located') || q.name.toLowerCase().includes('international')
    );

    expect(locationQuestion).toBeDefined();
    expect(locationQuestion.acceptedAnswer.text).toContain('Cape Town');
  });
});

describe('LocalBusiness Schema', () => {
  it('should render LocalBusiness schema with correct type and context', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const localBusinessScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"LocalBusiness"');
    });

    expect(localBusinessScript).toBeDefined();
    const localBusinessData = JSON.parse(localBusinessScript?.textContent || '{}');

    expect(localBusinessData['@context']).toBe('https://schema.org');
    expect(localBusinessData['@type']).toBe('LocalBusiness');
  });

  it('should include complete address details in LocalBusiness schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const localBusinessScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"LocalBusiness"');
    });

    const localBusinessData = JSON.parse(localBusinessScript?.textContent || '{}');

    expect(localBusinessData.address).toBeDefined();
    expect(localBusinessData.address['@type']).toBe('PostalAddress');
    expect(localBusinessData.address.addressLocality).toBe('Cape Town');
    expect(localBusinessData.address.addressRegion).toBe('Western Cape');
    expect(localBusinessData.address.addressCountry).toBe('ZA');
    expect(localBusinessData.address.postalCode).toBe('8000');
  });

  it('should include business hours in LocalBusiness schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const localBusinessScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"LocalBusiness"');
    });

    const localBusinessData = JSON.parse(localBusinessScript?.textContent || '{}');

    expect(localBusinessData.openingHoursSpecification).toBeDefined();
    expect(Array.isArray(localBusinessData.openingHoursSpecification)).toBe(true);

    const hours = localBusinessData.openingHoursSpecification[0];
    expect(hours['@type']).toBe('OpeningHoursSpecification');
    expect(hours.dayOfWeek).toContain('Monday');
    expect(hours.dayOfWeek).toContain('Friday');
    expect(hours.opens).toBe('09:00');
    expect(hours.closes).toBe('18:00');
  });

  it('should include geo coordinates in LocalBusiness schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const localBusinessScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"LocalBusiness"');
    });

    const localBusinessData = JSON.parse(localBusinessScript?.textContent || '{}');

    expect(localBusinessData.geo).toBeDefined();
    expect(localBusinessData.geo['@type']).toBe('GeoCoordinates');
    expect(localBusinessData.geo.latitude).toBeDefined();
    expect(localBusinessData.geo.longitude).toBeDefined();
  });

  it('should include contact methods in LocalBusiness schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const localBusinessScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"LocalBusiness"');
    });

    const localBusinessData = JSON.parse(localBusinessScript?.textContent || '{}');

    expect(localBusinessData.email).toBeDefined();
    expect(localBusinessData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('should include areaServed in LocalBusiness schema', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const localBusinessScript = Array.from(scripts).find(script => {
      const content = script.textContent || '';
      return content.includes('"@type":"LocalBusiness"');
    });

    const localBusinessData = JSON.parse(localBusinessScript?.textContent || '{}');

    expect(localBusinessData.areaServed).toBeDefined();
    expect(Array.isArray(localBusinessData.areaServed)).toBe(true);
  });
});

describe('Contact Page Component', () => {
  it('should render ContactPageClient component', () => {
    const { container } = render(<ContactPage />);
    expect(container).toBeDefined();
  });

  it('should render all three Schema.org scripts before content', () => {
    const { container } = render(<ContactPage />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts.length).toBe(3);
  });
});
