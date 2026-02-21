/**
 * Schema.org structured data for Contact Page
 * Provides ContactPage and FAQPage markup for improved SEO and rich snippets
 */

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Blaq Digital',
  description: 'Contact page for Blaq Digital - AI development and web application services',
  url: 'https://blaq.ainative.studio/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Blaq Digital',
    url: 'https://blaq.ainative.studio',
    areaServed: ['ZA', 'Global'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@ainative.studio',
      availableLanguage: ['English'],
    },
  },
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
        text: 'Blaq Digital offers comprehensive AI development services including custom AI application development, intelligent automation systems, machine learning model integration, natural language processing solutions, and AI-powered web applications. We specialize in building production-ready AI systems that solve real business problems, from chatbots and recommendation engines to document processing and predictive analytics.',
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
        text: 'Blaq Digital has expertise across multiple industries including media and entertainment, e-commerce and retail, healthcare and wellness, financial services, education and e-learning, professional services, and technology platforms. Our AI solutions are adaptable to various sectors, focusing on solving specific business challenges rather than being limited to one industry. We bring cross-industry insights that often lead to innovative solutions by applying AI techniques from one sector to solve problems in another.',
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
  ],
};
