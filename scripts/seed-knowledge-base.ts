import { zerodb } from '../lib/zerodb';

// Knowledge base content to seed into vectors
const knowledgeBase = [
  {
    id: 'what-does-blaq-digital-do',
    text: `Blaq Digital is a hybrid studio at the intersection of AI, media, and Black culture. We build intelligent media systems - not just marketing content.

Our core offerings:
- AI Apps: Custom AI applications built for your specific needs
- RAG Bots: Knowledge-grounded conversational interfaces
- Conversational Media: Interactive content experiences powered by AI
- Web Platforms: Modern, high-performance web applications

We're engineers who understand both culture and code. We build AI-native solutions from the ground up, with deep understanding of Black media, entertainment, and the creator economy.`,
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

This chatbot uses RAG to answer questions about Blaq Digital using our knowledge base.`,
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
    text: `Blaq Digital offers comprehensive AI and development services:

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
      keywords: ['services', 'offerings', 'what we offer', 'capabilities', 'solutions']
    }
  },
  {
    id: 'what-makes-us-different',
    text: `Blaq Digital is different from traditional agencies and generic AI companies:

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
  }
];

async function seedKnowledgeBase() {
  console.log('Starting knowledge base seeding...\n');

  try {
    // Load environment variables
    require('dotenv').config();

    // Set API key from environment
    const apiKey = process.env.NEXT_PUBLIC_AINATIVE_API_KEY || process.env.ZERODB_API_TOKEN;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_AINATIVE_API_KEY or ZERODB_API_TOKEN is not set');
    }
    console.log('API Key found:', apiKey.substring(0, 10) + '...');
    zerodb.setApiKey(apiKey);

    // Prepare vectors for upload
    const vectors = knowledgeBase.map(item => ({
      id: item.id,
      text: item.text,
      metadata: item.metadata
    }));

    console.log(`Uploading ${vectors.length} knowledge base entries to ZeroDB...`);
    console.log('Collection name: blaq_knowledge_base');
    console.log('First vector sample:', JSON.stringify(vectors[0], null, 2));

    // Upload all vectors to the blaq_knowledge_base collection
    const result = await zerodb.upsertVectors('blaq_knowledge_base', vectors);

    console.log('\n✅ Knowledge base seeded successfully!');
    console.log(`Response:`, JSON.stringify(result, null, 2));

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
