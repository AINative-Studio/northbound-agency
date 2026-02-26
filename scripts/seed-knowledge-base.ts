import { zerodb } from '../lib/zerodb';

// Knowledge base content to seed into vectors
const knowledgeBase = [
  {
    id: 'what-does-northbound-studio-do',
    text: `Northbound Studio is a hybrid studio at the intersection of AI, media, and culture. We build intelligent media systems - not just marketing content.

Our core offerings:
- AI Apps: Custom AI applications built for your specific needs
- RAG Bots: Knowledge-grounded conversational interfaces
- Conversational Media: Interactive content experiences powered by AI
- Web Platforms: Modern, high-performance web applications

We're engineers who understand both culture and code. We build AI-native solutions from the ground up, with deep understanding of media, entertainment, and the creator economy.`,
    metadata: {
      topic: 'company overview',
      category: 'about',
      keywords: ['blaq digital', 'what we do', 'services', 'company', 'about us']
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
      keywords: ['rag', 'retrieval augmented generation', 'how it works', 'technology', 'ai']
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
      keywords: ['chatbot', 'ai bot', 'conversational ai', 'rag bot', 'chat']
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
- media and entertainment focus

Our Approach:
- AI-native thinking (not AI-as-a-feature)
- Engineering-led (not a traditional agency)
- Culture-first (deep understanding of media)
- Ownership-driven (your IP, your data, your control)

We deliver secure, compliant solutions with measurable business value within weeks.`,
    metadata: {
      topic: 'all services',
      category: 'services',
      keywords: ['services', 'offerings', 'what we offer', 'capabilities', 'solutions']
    }
  },
  {
    id: 'what-makes-us-different',
    text: `Northbound Studio is different from traditional agencies and generic AI companies:

AI-Native: We build with AI-first thinking from the ground up. AI isn't a feature we bolt on - it's fundamental to our architecture and approach.

Culture-First: Deep understanding of media, entertainment, and the creator economy. We don't just build technology - we build culturally intelligent systems.

Ownership-Driven: Your intellectual property, your data, your control. We build for long-term value creation, not vendor lock-in.

Engineering-Led: We're not a traditional marketing agency. We're experienced engineers and Certified Product Managers who've built award-winning AI and ML projects for industry-leading brands.

Proven Results:
- Enterprise-grade security with data privacy built in
- Fast ROI - measurable business value within weeks, not months
- Award-winning track record with industry leaders

We're a hybrid studio blending media, engineering, AI systems, and cultural intelligence to build the future of media.`,
    metadata: {
      topic: 'differentiation',
      category: 'about',
      keywords: ['different', 'why us', 'unique', 'competitive advantage', 'what makes us']
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
      keywords: ['pricing', 'cost', 'how much', 'price', 'budget', 'rates']
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
      keywords: ['timeline', 'how long', 'time frame', 'delivery', 'when', 'speed']
    }
  },
  {
    id: 'founder-and-company-details',
    text: `Northbound Studios was founded by Jerome Palencia on January 1, 2026.

Location:
- City: San Francisco, California
- Business Address: 845 Howard St, San Francisco, CA 94103, United States

Company Type:
Northbound Studios is a Tech-Enabled Growth Studio based in San Francisco that designs and deploys AI-powered growth systems to help modern businesses attract demand, convert traffic, and scale revenue through intelligent infrastructure.

Important Note:
We are NOT a traditional marketing agency. We operate at the intersection of AI systems, performance marketing, conversion architecture, and strategic media production. Our work integrates technology, automation, and content into unified growth systems.`,
    metadata: {
      topic: 'founder and location',
      category: 'about',
      keywords: ['jerome palencia', 'founder', 'san francisco', 'location', 'address', 'where', 'founded']
    }
  },
  {
    id: 'company-philosophy-and-ethos',
    text: `Northbound Studios Core Philosophy:

Systems Over Tactics:
Sustainable growth comes from infrastructure, not isolated campaigns.

Performance Over Vanity Metrics:
Impressions don't matter. Revenue does. We focus on measurable business outcomes.

Clarity Over Noise:
Strategy should be structured, measurable, and intentional.

Technology as Leverage:
AI and automation are tools to increase efficiency, precision, and scalability.

Long-Term Compounding:
Growth is engineered through disciplined optimization and iteration, not quick wins.

Our goal is to convert attention into measurable business growth through intelligent systems.`,
    metadata: {
      topic: 'philosophy and values',
      category: 'about',
      keywords: ['philosophy', 'values', 'ethos', 'beliefs', 'principles', 'approach']
    }
  },
  {
    id: 'northbound-films-relationship',
    text: `Relationship Between Northbound Studios and Northbound Films:

Shared Founder:
Both companies share the same founder, Jerome Palencia.

Northbound Films:
A film and media production company focused on cinematic storytelling and documentary work.

Northbound Studios:
A separate company focused on AI-powered growth systems, performance marketing, and digital infrastructure.

Key Distinction:
They share creative DNA but operate as distinct entities with different focuses. Northbound Films handles cinematic production while Northbound Studios builds growth infrastructure and AI systems.`,
    metadata: {
      topic: 'northbound films',
      category: 'about',
      keywords: ['northbound films', 'film', 'production', 'relationship', 'separate', 'distinct']
    }
  },
  {
    id: 'ai-native-agency-definition',
    text: `What Is an AI-Native Agency?

An AI-native agency is a company that integrates artificial intelligence into the core of its operations and client solutions.

At Northbound Studios, being AI-native means:

✓ AI is used in strategy development
✓ AI assists in content production and repurposing
✓ AI enhances targeting and optimization
✓ AI powers automation and workflow systems
✓ AI is embedded into client-facing products

AI is not an add-on. It is part of the infrastructure.

How Northbound Studios Operates as AI-Native:
We combine human strategy + creative production + intelligent automation + data-driven optimization into unified growth systems. Every solution we build has AI integrated at the core, not bolted on as an afterthought.`,
    metadata: {
      topic: 'ai-native definition',
      category: 'about',
      keywords: ['ai-native', 'ai native', 'what is ai-native', 'ai agency', 'definition']
    }
  },
  {
    id: 'detailed-services-breakdown',
    text: `Northbound Studios Core Services:

1. AI App Development
- AI-powered internal tools
- Workflow automation systems
- Client dashboards and portals
- Intelligent CRM integrations

2. Web Development
- Conversion-optimized websites
- Funnel architecture
- Landing page systems
- Technical SEO foundations

3. Media + AI Systems
- Strategic video production
- AI-powered content repurposing
- Funnel-aligned content strategy
- Multi-platform deployment systems

4. Ads + SEO
- Meta Ads campaigns
- YouTube Ads
- Retargeting systems
- YouTube SEO optimization
- Search engine optimization
- Performance tracking and attribution

All services are designed to work together as integrated growth infrastructure, not isolated tactics.`,
    metadata: {
      topic: 'detailed services',
      category: 'services',
      keywords: ['services breakdown', 'what services', 'offerings', 'capabilities', 'ads', 'seo', 'web', 'ai apps']
    }
  },
  {
    id: 'chatbot-pricing-specific',
    text: `Chatbot Project Pricing at Northbound Studios:

Chatbot projects vary depending on scope and integration requirements.

Typical Investment Ranges:

Basic AI Chatbot Integration: $2,500 – $5,000
- Simple FAQ bot
- Basic knowledge base integration
- Standard deployment

Custom AI + Workflow Integration: $5,000 – $15,000
- Custom training on your data
- CRM integration
- Workflow automation
- Advanced conversation flows

Advanced AI System with CRM + Automation: $15,000+
- Full CRM integration
- Complex workflow automation
- Custom AI models
- Multi-channel deployment
- Advanced analytics

Final pricing depends on:
- Data integration complexity
- CRM integration requirements
- Automation depth
- Custom workflows needed
- Deployment environment

All chatbot systems are designed to support business growth, not just answer FAQs. They're built as growth infrastructure, not customer service tools.`,
    metadata: {
      topic: 'chatbot pricing',
      category: 'business',
      keywords: ['chatbot cost', 'chatbot pricing', 'how much chatbot', 'chatbot price', 'bot cost']
    }
  },
  {
    id: 'social-media-and-contact',
    text: `Connect with Northbound Studios:

LinkedIn:
https://www.linkedin.com/company/northboundstudios

YouTube:
https://www.youtube.com/@Northboundstudiosf

Instagram:
https://www.instagram.com/northboundstudios.co/

Twitter (X):
https://x.com/northbstudio?s=21

Facebook:
https://www.facebook.com/profile.php?id=61588099933872

Business Address:
845 Howard St
San Francisco, CA 94103
United States

For project inquiries, visit our contact page at https://northboundstudio.co/contact`,
    metadata: {
      topic: 'social media and contact',
      category: 'contact',
      keywords: ['social media', 'linkedin', 'twitter', 'instagram', 'youtube', 'facebook', 'contact', 'connect']
    }
  }
];

async function seedKnowledgeBase() {
  console.log('Starting knowledge base seeding...\n');

  try {
    // Load environment variables
    require('dotenv').config();

    // Get configuration
    const apiKey = process.env.NEXT_PUBLIC_AINATIVE_API_KEY || process.env.ZERODB_API_TOKEN;
    const apiUrl = process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio';
    const projectId = process.env.NEXT_PUBLIC_ZERODB_PROJECT_ID;

    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_AINATIVE_API_KEY or ZERODB_API_TOKEN is not set');
    }

    if (!projectId) {
      throw new Error('NEXT_PUBLIC_ZERODB_PROJECT_ID is not set. Run: npm run setup:zerodb');
    }

    console.log('API Key found:', apiKey.substring(0, 10) + '...');
    console.log('Project ID:', projectId);
    console.log('API URL:', apiUrl);

    // Prepare data for embedding
    const texts = knowledgeBase.map(item => item.text);
    const metadataList = knowledgeBase.map(item => ({
      ...item.metadata,
      id: item.id,
      title: item.id.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    }));

    console.log(`\nEmbedding and storing ${texts.length} knowledge base entries...`);
    console.log('Namespace: northbound_knowledge_base');
    console.log('Model: BAAI/bge-small-en-v1.5');

    // Use the embed-and-store endpoint
    const response = await fetch(
      `${apiUrl}/v1/public/zerodb/${projectId}/embeddings/embed-and-store`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          texts,
          metadata_list: metadataList,
          namespace: 'northbound_knowledge_base',
          model: 'BAAI/bge-small-en-v1.5'
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API Error (${response.status}): ${errorData}`);
    }

    const result = await response.json();

    console.log('\n✅ Knowledge base seeded successfully!');
    console.log(`   • Vectors stored: ${result.vectors_stored}`);
    console.log(`   • Embeddings generated: ${result.embeddings_generated}`);
    console.log(`   • Model: ${result.model}`);
    console.log(`   • Dimensions: ${result.dimensions}`);
    console.log(`   • Namespace: ${result.namespace}`);
    console.log(`   • Processing time: ${result.processing_time_ms}ms`);

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
