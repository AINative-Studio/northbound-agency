/**
 * Schema.org structured data for Contact Page
 * Provides ContactPage and FAQPage markup for improved SEO and rich snippets
 */

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Northbound Studio - AI Development & Digital Media Agency',
  description: 'Get in touch with Northbound Studio for AI development, custom web applications, and intelligent automation services. Based in South Africa, serving clients globally.',
  url: 'https://northboundstudio.co/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Northbound Studio',
    url: 'https://northboundstudio.co',
    logo: 'https://northboundstudio.co/logo.png',
    areaServed: ['ZA', 'Global'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@ainative.studio',
      availableLanguage: ['English'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    },
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://northboundstudio.co',
  name: 'Northbound Studio',
  image: 'https://northboundstudio.co/logo.png',
  description: 'Leading AI-native digital agency specializing in custom AI applications, RAG chatbots, and intelligent media systems for the Black entertainment industry.',
  url: 'https://northboundstudio.co',
  email: 'hello@ainative.studio',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Town',
    addressRegion: 'Western Cape',
    addressCountry: 'ZA',
    postalCode: '8000',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-33.9249',
    longitude: '18.4241',
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: [
    {
      '@type': 'Country',
      name: 'South Africa',
    },
    {
      '@type': 'Place',
      name: 'Global',
    },
  ],
  sameAs: [
    'https://twitter.com/northboundstudio',
    'https://linkedin.com/company/northbound-studio',
  ],
  knowsAbout: [
    'Artificial Intelligence Development',
    'Machine Learning',
    'RAG Chatbots',
    'Custom AI Applications',
    'Digital Media',
    'Web Development',
    'Intelligent Automation',
  ],
};

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What AI services do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Northbound Studio offers comprehensive AI development services including custom AI application development, intelligent automation systems, machine learning model integration, natural language processing solutions, and AI-powered web applications. We specialize in building production-ready AI systems that solve real business problems, from chatbots and recommendation engines to document processing and predictive analytics.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does AI development take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI development timelines vary based on project complexity and scope. Simple AI integrations or proof-of-concepts typically take 2-4 weeks. More complex custom AI applications usually require 8-16 weeks for full development and deployment. Enterprise-scale AI systems can take 3-6 months or longer. We provide detailed project timelines during our initial consultation and use agile methodology to deliver incremental value throughout the development process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with startups or enterprises?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with both startups and enterprises. For startups, we help validate AI-driven product ideas, build MVPs, and scale technical infrastructure as you grow. For enterprises, we develop custom AI solutions, integrate AI into existing systems, and provide strategic AI consulting. Our flexible engagement models adapt to your organization size, budget, and technical requirements. We have experience serving clients from solo founders to established corporations across various industries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries do you specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Northbound Studio has expertise across multiple industries including media and entertainment, e-commerce and retail, healthcare and wellness, financial services, education and e-learning, professional services, and technology platforms. Our AI solutions are adaptable to various sectors, focusing on solving specific business challenges rather than being limited to one industry. We bring cross-industry insights that often lead to innovative solutions by applying AI techniques from one sector to solve problems in another.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you price AI projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer transparent, value-based pricing tailored to your project scope and business goals. Pricing models include fixed-price projects for well-defined scopes, time and materials for evolving requirements, and retainer agreements for ongoing development and support. AI projects typically start from $10,000 for simple integrations and proof-of-concepts, while comprehensive custom AI applications range from $25,000 to $150,000+. We provide detailed cost breakdowns during our free consultation, ensuring no hidden fees and clear expectations around deliverables and timelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free consultations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer a free 30-minute discovery call to discuss your project needs, challenges, and goals. During this consultation, we provide an honest assessment of how AI can help your business, outline potential solutions, and discuss timelines and budget considerations. There is no pressure or obligation - our goal is to help you understand the possibilities and determine if we are the right fit for your project. Contact us to schedule your free consultation today.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your response time for inquiries?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We respond to all contact form submissions and email inquiries within 24 hours during business days (Monday-Friday, 9:00-18:00 SAST). For urgent matters, we strive to respond even faster, often within a few hours. After your initial inquiry, we will schedule a discovery call at your convenience to discuss your project in detail and provide next steps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are you located and do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Northbound Studio is based in Cape Town, South Africa, but we serve clients globally. We have experience working with businesses across multiple continents and time zones. Our remote-first approach means we can collaborate effectively with clients anywhere in the world. We use modern project management tools, regular video calls, and clear communication practices to ensure seamless collaboration regardless of geographic location.',
      },
    },
  ],
};
