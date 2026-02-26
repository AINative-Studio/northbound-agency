import { zerodb } from '../lib/zerodb';

// Enhanced knowledge base content with additional categories
const knowledgeBase = [
  {
    id: 'what-does-northbound-studio-do',
    text: `Northbound Studio is a hybrid studio at the intersection of AI, media, and Black culture. We build intelligent media systems - not just marketing content.

Our core offerings:
- AI Apps: Custom AI applications built for your specific needs
- RAG Bots: Knowledge-grounded conversational interfaces
- Conversational Media: Interactive content experiences powered by AI
- Web Platforms: Modern, high-performance web applications

We're engineers who understand both culture and code. We build AI-native solutions from the ground up, with deep understanding of Black media, entertainment, and the creator economy.`,
    metadata: {
      topic: 'company overview',
      category: 'about',
      keywords: ['blaq digital', 'what we do', 'services', 'company', 'about us'],
      source: 'website'
    }
  },
  {
    id: 'rag-explanation',
    text: `RAG (Retrieval-Augmented Generation) is a powerful AI technique that combines information retrieval with language generation.

How RAG works:
1. Your content is converted into vectors (numerical representations) and stored in a database
2. When a user asks a question, their query is also converted to a vector
3. The system finds the most relevant content using semantic similarity search
4. The retrieved context is used to generate accurate, grounded responses

Why RAG is powerful:
- Provides accurate answers based on your actual data
- Reduces AI hallucinations by grounding responses in real content
- Can be updated without retraining the entire model
- Perfect for knowledge bases, documentation, customer support
- Maintains context and retrieves only relevant information

This chatbot uses RAG to answer questions about Northbound Studio using our knowledge base.`,
    metadata: {
      topic: 'rag technology',
      category: 'technical',
      keywords: ['rag', 'retrieval augmented generation', 'how it works', 'technology', 'ai'],
      source: 'documentation'
    }
  },
  {
    id: 'ai-chatbot-development',
    text: `We build intelligent, context-aware AI chatbots and conversational interfaces using RAG technology.

Our chatbot development includes:
- Custom RAG systems trained on your content
- Knowledge-grounded responses (no hallucinations)
- Conversation memory and context awareness
- Integration with your existing systems
- Enterprise-grade security and data privacy

Perfect for:
- Customer support automation
- Internal knowledge bases
- Interactive documentation
- Lead qualification
- Product recommendations

We don't just deploy generic chatbots - we build AI systems that understand your business, maintain context, and provide real value. Fast ROI within weeks, not months.`,
    metadata: {
      topic: 'chatbot development',
      category: 'services',
      keywords: ['chatbot', 'ai bot', 'conversational ai', 'rag bot', 'chat'],
      source: 'services'
    }
  },
  {
    id: 'full-services',
    text: `Northbound Studio offers comprehensive AI and development services:

AI & ML Solutions:
- Custom AI applications tailored to your needs
- RAG-powered chatbots and knowledge systems
- Conversational media experiences
- AI integration and consultation

Web Development:
- Modern web platforms and applications
- High-performance, scalable architecture
- Integration with AI capabilities
- Responsive, accessible design

Media + AI Systems:
- Interactive content experiences
- AI-enhanced media platforms
- Tools for the creator economy
- Black media and entertainment focus

Our Approach:
- AI-native thinking (not AI-as-a-feature)
- Engineering-led (not a traditional agency)
- Culture-first (deep understanding of Black media)
- Ownership-driven (your IP, your data, your control)

We deliver secure, compliant solutions with measurable business value within weeks.`,
    metadata: {
      topic: 'all services',
      category: 'services',
      keywords: ['services', 'offerings', 'what we offer', 'capabilities', 'solutions'],
      source: 'services'
    }
  },
  {
    id: 'what-makes-us-different',
    text: `Northbound Studio is different from traditional agencies and generic AI companies:

AI-Native: We build with AI-first thinking from the ground up. AI isn't a feature we bolt on - it's fundamental to our architecture and approach.

Culture-First: Deep understanding of Black media, entertainment, and the creator economy. We don't just build technology - we build culturally intelligent systems.

Ownership-Driven: Your intellectual property, your data, your control. We build for long-term value creation, not vendor lock-in.

Engineering-Led: We're not a traditional marketing agency. We're experienced engineers and Certified Product Managers who've built award-winning AI and ML projects for industry-leading brands.

Proven Results:
- Enterprise-grade security with data privacy built in
- Fast ROI - measurable business value within weeks, not months
- Award-winning track record with industry leaders

We're a hybrid studio blending media, engineering, AI systems, and cultural intelligence to build the future of Black media.`,
    metadata: {
      topic: 'differentiation',
      category: 'about',
      keywords: ['different', 'why us', 'unique', 'competitive advantage', 'what makes us'],
      source: 'about'
    }
  },
  {
    id: 'pricing-model',
    text: `Our pricing is project-based and tailored to your specific needs, ensuring you get maximum value.

Pricing Factors:
- Project scope and complexity
- Timeline requirements
- Integration needs
- Ongoing support and maintenance

What You Get:
- Fixed project pricing (no hourly rate surprises)
- Clear deliverables and milestones
- Your IP ownership
- Enterprise-grade security
- Fast ROI within weeks

Project Types:
- AI Chatbot/RAG System: Starting projects typically range from focused implementations to comprehensive solutions
- Custom AI Application: Depends on scope and integration complexity
- Web Platform Development: Based on features and scale
- Conversational Media System: Custom quote based on requirements

Next Steps:
Contact us for a consultation. We'll discuss your needs, provide a detailed proposal with transparent pricing, and show you how we can deliver measurable value quickly.

We believe in fair pricing that reflects the value we deliver - not maximizing billable hours.`,
    metadata: {
      topic: 'pricing',
      category: 'business',
      keywords: ['pricing', 'cost', 'how much', 'price', 'budget', 'rates'],
      source: 'business'
    }
  },
  {
    id: 'timeline-delivery',
    text: `We deliver fast ROI with measurable results within weeks, not months.

Typical Timelines:

AI Chatbot/RAG System:
- Discovery & Planning: 1 week
- Development & Training: 2-3 weeks
- Testing & Refinement: 1 week
- Total: 4-5 weeks to production

Custom AI Application:
- Scoping & Architecture: 1-2 weeks
- Core Development: 3-6 weeks
- Integration & Testing: 1-2 weeks
- Total: 5-10 weeks depending on complexity

Web Platform:
- Design & Planning: 1-2 weeks
- Development: 3-8 weeks
- Testing & Launch: 1 week
- Total: 5-11 weeks based on scope

Our Process:
1. Quick discovery and scoping (days, not weeks)
2. Iterative development with regular check-ins
3. Early prototypes for validation
4. Continuous testing and refinement
5. Production deployment with monitoring

Why We're Fast:
- Focused scope and clear deliverables
- Proven frameworks and components
- Experienced team with award-winning track record
- Engineering-led (no bureaucratic overhead)

We prioritize speed to value while maintaining quality and security.`,
    metadata: {
      topic: 'timeline',
      category: 'business',
      keywords: ['timeline', 'how long', 'time frame', 'delivery', 'when', 'speed'],
      source: 'business'
    }
  },
  {
    id: 'contact-process',
    text: `Ready to start your project? Here's how to get in touch with Northbound Studio:

Contact Methods:
- Email: Contact form on our website (fastest response)
- Direct inquiry: Schedule a consultation call
- Project brief: Submit your requirements online

What Happens Next:
1. Initial Response (24-48 hours): We'll review your inquiry and set up a discovery call
2. Discovery Call (30-60 minutes): Discuss your needs, goals, and timeline
3. Proposal (3-5 days): Detailed project scope, timeline, and pricing
4. Kick-off (1 week after approval): Begin work with clear milestones

What to Prepare:
- Project goals and objectives
- Current challenges or pain points
- Timeline expectations
- Rough budget range
- Any existing systems or platforms
- Success metrics you care about

We respond quickly and prioritize understanding your specific needs. No generic pitches or sales pressure - just honest conversation about how we can help.

First consultation is free with no obligation.`,
    metadata: {
      topic: 'contact process',
      category: 'business',
      keywords: ['contact', 'get started', 'reach out', 'consultation', 'inquiry', 'how to contact'],
      source: 'website'
    }
  },
  {
    id: 'web-platform-development',
    text: `Northbound Studio builds modern, high-performance web platforms with AI capabilities built in from the ground up.

Our Web Development Approach:
- Modern Tech Stack: Next.js, React, TypeScript, Tailwind CSS
- Performance First: Optimized for speed and user experience
- AI-Native: Integration-ready for AI features and chatbots
- Scalable Architecture: Built to grow with your business
- Responsive Design: Perfect on all devices and screen sizes
- Accessibility: WCAG compliant and inclusive design

What We Build:
- Corporate websites with AI chatbots
- E-commerce platforms with AI recommendations
- SaaS applications with intelligent features
- Content management systems
- Custom web applications
- Interactive media platforms

Technology Excellence:
- Server-side rendering for SEO
- Edge computing for global performance
- Real-time capabilities
- API integration and development
- Database design and optimization
- Security and compliance built-in

We don't just build websites - we create AI-enhanced digital experiences that drive business value.`,
    metadata: {
      topic: 'web development',
      category: 'services',
      keywords: ['web development', 'website', 'web platform', 'nextjs', 'react', 'modern web'],
      source: 'services'
    }
  },
  {
    id: 'conversational-media',
    text: `Conversational Media represents the future of content - interactive, AI-powered experiences that engage users in dialogue.

What is Conversational Media?
Unlike traditional static content, conversational media allows users to interact with your content through natural language. It's the intersection of media, AI, and user engagement.

Our Conversational Media Solutions:
- Interactive storytelling experiences
- AI-powered content discovery
- Conversational content platforms
- Voice and chat interfaces for media
- Personalized content recommendations
- Engagement analytics and insights

Perfect For:
- Media companies and publishers
- Content creators and influencers
- Entertainment platforms
- Educational content
- Brand storytelling
- Community engagement

Cultural Intelligence:
We specialize in conversational media for Black culture, entertainment, and the creator economy. We understand the nuances, context, and authentic voice required for meaningful engagement.

Results:
- Increased user engagement (2-5x typical metrics)
- Deeper content discovery
- Personalized experiences at scale
- Valuable user insights
- Reduced content operations costs

Transform passive content consumption into active, engaging conversations.`,
    metadata: {
      topic: 'conversational media',
      category: 'services',
      keywords: ['conversational media', 'interactive content', 'ai media', 'content engagement', 'creator economy'],
      source: 'services'
    }
  },
  {
    id: 'case-study-rag-chatbot',
    text: `Case Study: Enterprise RAG Chatbot Implementation

Challenge:
A mid-size company needed to reduce customer support costs while improving response quality. They had extensive documentation but users couldn't find answers quickly.

Solution:
We built a custom RAG-powered chatbot trained on their entire knowledge base:
- 500+ documentation pages converted to vectors
- Integration with existing help desk system
- Multi-language support
- Conversation memory and context
- Admin dashboard for analytics

Implementation:
- Week 1: Discovery and content audit
- Weeks 2-3: RAG system development and training
- Week 4: Testing and refinement
- Week 5: Production deployment

Results:
- 60% reduction in support ticket volume
- 24/7 instant answers to common questions
- 85% user satisfaction score
- ROI positive within 2 months
- Support team could focus on complex issues

Technology:
- OpenAI embeddings (text-embedding-3-small)
- ZeroDB vector database
- Next.js frontend
- Custom RAG architecture
- Real-time analytics

This is a typical example of how we deliver measurable business value quickly with RAG technology.`,
    metadata: {
      topic: 'rag chatbot case study',
      category: 'case-studies',
      keywords: ['case study', 'rag example', 'chatbot results', 'customer support', 'success story'],
      source: 'portfolio'
    }
  },
  {
    id: 'vector-database-explained',
    text: `Understanding Vector Databases and Semantic Search

What is a Vector Database?
A vector database stores numerical representations (embeddings) of text, allowing for semantic similarity search instead of exact keyword matching.

How It Works:
1. Text is converted to vectors (arrays of numbers) using AI models
2. Similar concepts have similar vector representations
3. Search compares vector similarity, not just keywords
4. Returns semantically relevant results, even with different wording

Why It Matters:
- Find content by meaning, not just exact words
- Handles synonyms and related concepts naturally
- Works across languages
- Powers modern AI applications
- Enables intelligent content discovery

Our Implementation:
- OpenAI text-embedding-3-small (1536 dimensions)
- Cosine similarity for matching
- ZeroDB for storage and search
- Sub-100ms query response time
- Scales to millions of documents

Use Cases:
- Knowledge base search
- Document discovery
- Recommendation systems
- Duplicate detection
- Content clustering
- Question answering systems

Vector databases are the foundation of modern RAG systems and AI-powered search.`,
    metadata: {
      topic: 'vector database',
      category: 'tech-docs',
      keywords: ['vector database', 'embeddings', 'semantic search', 'how vectors work', 'ai search'],
      source: 'documentation'
    }
  },
  {
    id: 'ai-integration-services',
    text: `AI Integration and Consultation Services

We help businesses integrate AI capabilities into existing systems and workflows.

Integration Services:
- AI strategy and planning
- Technology assessment and selection
- Custom AI model integration
- API development and connection
- Legacy system modernization
- Training and knowledge transfer

AI Capabilities We Integrate:
- Natural language processing (NLP)
- Large language models (LLMs)
- Computer vision and image recognition
- Recommendation engines
- Predictive analytics
- Automated content generation

Our Integration Approach:
1. Audit existing systems and workflows
2. Identify high-value AI opportunities
3. Design integration architecture
4. Implement with minimal disruption
5. Test thoroughly before production
6. Monitor and optimize performance

Why Choose Us:
- Engineering expertise, not just consulting
- Hands-on implementation, not just recommendations
- Proven track record with enterprise clients
- Security and compliance focused
- Practical, business-value driven
- Ongoing support and optimization

We make AI integration straightforward, secure, and valuable - without the complexity and vendor lock-in.`,
    metadata: {
      topic: 'ai integration',
      category: 'services',
      keywords: ['ai integration', 'ai consulting', 'llm integration', 'ai strategy', 'enterprise ai'],
      source: 'services'
    }
  },
  {
    id: 'security-compliance',
    text: `Security and Compliance at Northbound Studio

We build enterprise-grade security and compliance into every project from day one.

Security Measures:
- End-to-end encryption for data in transit and at rest
- Secure API authentication and authorization
- Regular security audits and penetration testing
- OWASP compliance for web applications
- Secure credential management
- Role-based access control (RBAC)

Data Privacy:
- GDPR and CCPA compliance frameworks
- Data anonymization and protection
- Audit logging for all data access
- Clear data retention policies
- User consent management
- Right to deletion support

Infrastructure Security:
- Cloud-native security best practices
- DDoS protection
- Rate limiting and abuse prevention
- Automated security scanning
- Dependency vulnerability monitoring
- Security patch management

Your Data, Your Control:
- You own your data and IP
- No vendor lock-in
- Transparent data usage
- On-premise deployment options
- Custom compliance requirements supported

Certifications and Standards:
- SOC 2 compliance ready
- ISO 27001 aligned practices
- HIPAA considerations for healthcare
- PCI DSS for payment systems
- Industry-specific compliance support

We don't compromise on security - it's built into our engineering culture and every line of code we write.`,
    metadata: {
      topic: 'security and compliance',
      category: 'tech-docs',
      keywords: ['security', 'compliance', 'gdpr', 'data privacy', 'enterprise security', 'encryption'],
      source: 'documentation'
    }
  },
  {
    id: 'team-expertise',
    text: `The Northbound Studio Team: Engineers Who Understand Culture

Our Expertise:
- Award-winning AI and ML engineers
- Certified Product Managers (CPM)
- Full-stack developers with 10+ years experience
- Cultural strategists and media professionals
- Enterprise architecture specialists

Background and Experience:
- Built AI systems for Fortune 500 companies
- Launched products used by millions
- Award-winning projects and recognition
- Deep roots in Black media and entertainment
- Academic background in CS, AI, and media studies

Our Unique Perspective:
We're not a traditional agency or generic AI company. We're engineers and builders who:
- Understand both technology and culture deeply
- Have lived experience in Black media and entertainment
- Know how to build for community, not just customers
- Think long-term about ownership and value creation
- Bridge the gap between technical and creative

Project Track Record:
- Successful AI implementations for major brands
- Media platforms serving diverse audiences
- Creator economy tools and systems
- E-commerce solutions with AI capabilities
- Enterprise software and integrations

Continuous Learning:
- Active in AI research and development
- Contributing to open source projects
- Speaking at tech and media conferences
- Mentoring next generation of engineers
- Staying ahead of industry trends

When you work with Northbound Studio, you get experienced professionals who bring both technical excellence and cultural intelligence to every project.`,
    metadata: {
      topic: 'team and expertise',
      category: 'about',
      keywords: ['team', 'expertise', 'experience', 'background', 'who we are', 'credentials'],
      source: 'about'
    }
  },
  {
    id: 'roi-business-value',
    text: `ROI and Measurable Business Value

We focus on delivering tangible business results, not just technical implementations.

How We Deliver ROI:
- Start with business goals, not technology
- Define clear success metrics upfront
- Measure and optimize continuously
- Focus on quick wins and iteration
- Provide transparent analytics and reporting

Typical ROI Metrics:

AI Chatbots:
- 40-70% reduction in support costs
- 24/7 availability without scaling headcount
- 80%+ user satisfaction scores
- Reduced response time from hours to seconds
- Higher customer retention

Web Platforms:
- Improved conversion rates (20-50% typical)
- Better user engagement and time on site
- Higher SEO rankings and organic traffic
- Reduced infrastructure costs with modern architecture
- Faster page load times (2-3x improvement)

Conversational Media:
- 2-5x increase in content engagement
- Deeper content discovery and consumption
- Valuable user behavior insights
- Reduced content operations costs
- New revenue opportunities

Timeline to Value:
- First results: Within weeks of launch
- ROI positive: Typically 2-4 months
- Long-term value: Compounds over time

We Don't:
- Make unrealistic promises
- Focus on vanity metrics
- Charge for features you don't need
- Lock you into long-term contracts
- Optimize for billable hours

We Do:
- Set realistic expectations
- Track meaningful business metrics
- Build exactly what you need
- Enable your team's success
- Optimize for your ROI

Our success is measured by your results, not our hours billed.`,
    metadata: {
      topic: 'roi and business value',
      category: 'business',
      keywords: ['roi', 'business value', 'results', 'metrics', 'return on investment', 'value'],
      source: 'business'
    }
  }
];

async function seedKnowledgeBase() {
  console.log('Starting enhanced knowledge base seeding...\n');
  console.log(`Total entries: ${knowledgeBase.length}\n`);

  // Display category breakdown
  const categories = knowledgeBase.reduce((acc: Record<string, number>, item) => {
    acc[item.metadata.category] = (acc[item.metadata.category] || 0) + 1;
    return acc;
  }, {});

  console.log('Content by category:');
  Object.entries(categories).forEach(([category, count]) => {
    console.log(`  - ${category}: ${count} entries`);
  });
  console.log('');

  try {
    // Load environment variables
    require('dotenv').config();

    // Set API key from environment
    const apiKey = process.env.NEXT_PUBLIC_AINATIVE_API_KEY || process.env.ZERODB_API_TOKEN;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_AINATIVE_API_KEY or ZERODB_API_TOKEN is not set');
    }
    console.log('API Key found:', apiKey.substring(0, 10) + '...\n');
    zerodb.setApiKey(apiKey);

    // Prepare vectors for upload
    const vectors = knowledgeBase.map(item => ({
      id: item.id,
      text: item.text,
      metadata: item.metadata
    }));

    console.log(`Uploading ${vectors.length} knowledge base entries to ZeroDB...\n`);

    // Upload all vectors to the blaq_knowledge_base collection
    const result = await zerodb.upsertVectors('blaq_knowledge_base', vectors);

    console.log('\n✅ Knowledge base seeded successfully!');
    console.log(`Response:`, JSON.stringify(result, null, 2));
    console.log('\nCollection: blaq_knowledge_base');
    console.log('Dimensions: 1536 (OpenAI text-embedding-3-small)');
    console.log('Metric: Cosine similarity');

  } catch (error: any) {
    console.error('\n❌ Error seeding knowledge base:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run the seeding function
seedKnowledgeBase();
