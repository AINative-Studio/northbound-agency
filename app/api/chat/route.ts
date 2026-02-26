import { NextRequest, NextResponse } from 'next/server';

/**
 * AINative RAG Chat API
 *
 * This endpoint uses the AINative ZeroDB REST API for:
 * 1. Semantic search (POST /v1/public/zerodb/{project_id}/embeddings/search)
 * 2. Chat completion (POST /v1/public/chat/completions)
 *
 * Architecture:
 * UI (React) → REST /api/chat → AINative REST API → Response
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio';
const API_KEY = process.env.NEXT_PUBLIC_AINATIVE_API_KEY;
const PROJECT_ID = process.env.NEXT_PUBLIC_ZERODB_PROJECT_ID || 'northbound-studio-prod';

interface SemanticSearchResult {
  id: string;
  score: number;
  text: string;
  metadata?: Record<string, any>;
}

interface SemanticSearchResponse {
  results: SemanticSearchResult[];
  query: string;
  total_results: number;
  model: string;
  project_id: string;
  processing_time_ms: number;
}

async function semanticSearch(query: string, limit: number = 5): Promise<SemanticSearchResponse | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/public/zerodb/${PROJECT_ID}/embeddings/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          limit,
          threshold: 0.6, // 60% similarity threshold
          namespace: 'blaq_knowledge_base',
          model: 'BAAI/bge-small-en-v1.5',
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Semantic Search] API Error:', response.status, errorText);
      return null;
    }

    const data: SemanticSearchResponse = await response.json();
    console.log(`[Semantic Search] Found ${data.total_results} results in ${data.processing_time_ms}ms`);
    return data;
  } catch (error) {
    console.error('[Semantic Search] Error:', error);
    return null;
  }
}

async function generateChatCompletion(
  userQuery: string,
  context: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/public/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are Cody, a helpful and knowledgeable AI assistant for Northbound Studio. We operate from Los Angeles (HQ), San Francisco (Tech Hub), and Atlanta (Black entertainment capital focus). You provide accurate, professional, and friendly answers about our AI development services, RAG systems, and web development solutions. Use the following context to answer the user's question:\n\n${context}`,
            },
            {
              role: 'user',
              content: userQuery,
            },
          ],
          model: 'meta-llama/llama-3.1-70b-instruct', // Meta Llama for cost-effectiveness
          temperature: 0.7,
          max_tokens: 500,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat Completion] API Error:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('[Chat Completion] Error:', error);
    return null;
  }
}

async function generateResponse(message: string, type: string): Promise<{
  response: string;
  hasRelevantContent: boolean;
  sources?: SemanticSearchResult[];
}> {
  // For now, use keyword-based fallback as semantic search requires seeded knowledge base
  // TODO: Seed knowledge base using /v1/public/zerodb/{project_id}/embeddings/embed-and-store

  const messageLower = message.toLowerCase();

  // Knowledge base responses (simulating semantic search results)
  // Persona: Helpful, knowledgeable, professional - inspired by AINative's Cody assistant
  const knowledgeBase: Record<string, string> = {
    'blaq digital': `Northbound Studio is a hybrid studio that builds AI-native applications, focusing on RAG (Retrieval-Augmented Generation) systems, intelligent chatbots, and conversational media platforms. We combine web development with cutting-edge AI to create products that genuinely work for your business.`,

    'location': `Northbound Studio operates across three strategic locations:
- **Headquarters**: Los Angeles, California - Business operations and client relations
- **Tech Hub**: San Francisco, California - Engineering and AI development team
- **Atlanta Office**: Atlanta, Georgia - The Black entertainment capital of the world, our ground operations and cultural innovation center

We serve clients globally with our AI-powered solutions and web development services.`,

    'contact': `You can reach Northbound Studio at:
- **HQ**: Los Angeles, California
- **Tech Hub**: San Francisco, California
- **Atlanta Office**: Atlanta, Georgia (Black entertainment capital focus)
- **Website**: https://northboundstudios.co
- **Services**: AI chatbots, web development, conversational media + AI
- **Contact**: Fill out our contact form for project inquiries and consultations`,

    'rag': `RAG (Retrieval-Augmented Generation) combines the power of large language models with your own data. Instead of making up answers, RAG searches your knowledge base for relevant information and uses that to generate accurate, grounded responses. It's like giving an AI assistant perfect memory of your business documentation.`,

    'rag vs chatbot': `**RAG vs Regular Chatbots:**

**Regular Chatbots:**
• Limited to pre-programmed responses
• Can only answer questions they were specifically trained on
• Often provide generic or outdated information
• Require constant manual updates

**RAG Chatbots:**
• Access your entire knowledge base in real-time
• Provide accurate, source-grounded answers
• Automatically stay up-to-date as your content changes
• Can answer complex, nuanced questions
• Cite sources for transparency

RAG transforms generic AI into your company's expert assistant, grounded in your actual data.`,

    'services': `Northbound Studio offers three core services:
1. **AI Chatbots & RAG Systems** - Intelligent assistants trained on your data
2. **Web Platform Development** - Full-stack applications with AI integration
3. **Conversational Media + AI** - Voice, video, and text-based AI systems

We specialize in building production-ready AI products, not just prototypes. Based in Atlanta, GA, serving clients globally.`,

    'media business': `We help media businesses build AI applications **FAST** using the AINative API platform:

**🎬 Multimodal Content Creation**
Using AINative's Multimodal APIs, build apps that:
• **Text-to-Speech**: Generate voiceovers and narration (14 credits/generation, ~$0.007)
• **Image Generation**: Create thumbnails, promotional graphics, social media content (50 credits)
• **Image-to-Video**: Animate static images for social content (520 credits for 5 sec video)
• **Video Generation**: Text-to-video for trailers, ads, and content (premium Sora 2)

**💬 Intelligent Chat & RAG Systems**
With Chat Completion + ZeroDB Vector Search:
• 24/7 AI chatbots that answer fan questions using your content library
• Semantic search across your entire media archive (audio, video, text)
• Citation-backed responses that link back to original content
• Support for 40+ LLM models including Meta Llama, DeepSeek, GPT-4o

**📊 Content Intelligence & Analytics**
• ZeroDB Tables for structured content metadata and analytics
• Vector embeddings for content similarity and recommendations
• Event streams to track user engagement and viewing patterns
• Memory APIs for personalized user experiences

**🚀 Why Build with AINative APIs?**
• **Credit-based pricing**: Pay only for what you use
• **Fast integration**: REST APIs with comprehensive documentation
• **Production-ready**: Enterprise-grade infrastructure on RunPod
• **Cost-effective**: Meta Llama at $0.0001/1K tokens vs GPT-4 at $0.01/1K

**🎯 Perfect for Media Apps:**
• Podcast/audio transcription and search platforms
• Video content recommendation engines
• Automated social media content generators
• Fan engagement chatbots for entertainment brands
• Cultural archive preservation with citation tracking

With our Atlanta office in the Black entertainment capital, we specialize in AI that **amplifies culture, not exploits it**. We'll help you build production-ready media apps in weeks, not months.`,

    'pricing': `Our pricing is project-based and depends on complexity, timeline, and required features. Typical AI chatbot projects range from $15K-$50K. We focus on fast ROI - most clients see value within weeks, not months. Contact us for a detailed quote tailored to your needs.`,

    'timeline': `Development timelines vary by project scope:
- Simple RAG chatbot: 2-4 weeks
- Full web platform with AI: 6-12 weeks
- Enterprise systems: 3-6 months

We work in agile sprints and aim for early value delivery - you'll see working prototypes within the first 2 weeks.`,

    'what makes': `What makes Northbound Studio different:
- **AI-Native**: We build with AI at the core, not as an afterthought
- **Culture-First**: We care deeply about creating inclusive, human-centered technology
- **Ownership-Driven**: We treat your project like our own product
- **Engineering-Led**: Our team consists of experienced engineers, not just prompt engineers
- **Multi-Location Excellence**: LA HQ for business, SF tech hub for engineering, Atlanta for cultural innovation in the Black entertainment capital`,

    'team': `Northbound Studio is led by experienced engineers who are passionate about AI and building production-ready solutions. Our team operates across three strategic locations:
- **Los Angeles HQ**: Business operations and client relations
- **San Francisco Tech Hub**: AI development and engineering team
- **Atlanta Office**: Ground operations in the Black entertainment capital of the world

We combine deep technical expertise with a culture-first philosophy, treating every project like our own product. We work with clients globally.`,
  };

  // Find the best match with improved keyword matching

  // Priority 1: Check for RAG-related questions first (most specific)
  if (
    (messageLower.includes('rag') && messageLower.includes('chatbot')) ||
    (messageLower.includes('rag') && messageLower.includes('regular')) ||
    (messageLower.includes('rag') && messageLower.includes('difference')) ||
    (messageLower.includes('rag') && messageLower.includes('vs'))
  ) {
    return {
      response: knowledgeBase['rag vs chatbot'],
      hasRelevantContent: true,
    };
  }

  // Priority 2: Check for question patterns and map to knowledge base topics
  const questionPatterns: Record<string, string> = {
    'where': 'location',
    'located': 'location',
    'address': 'location',
    'headquarters': 'location',
    'office': 'location',
    'contact': 'contact',
    'reach': 'contact',
    'email': 'contact',
    'phone': 'contact',
    'team': 'team',
    'who': 'team',
    'people': 'team',
    'media business': 'media business',
    'media company': 'media business',
    'entertainment business': 'media business',
    'content business': 'media business',
  };

  for (const [pattern, topic] of Object.entries(questionPatterns)) {
    if (messageLower.includes(pattern) && knowledgeBase[topic]) {
      return {
        response: knowledgeBase[topic],
        hasRelevantContent: true,
      };
    }
  }

  // Priority 3: Check for company-specific multi-word phrases
  const multiWordPhrases = [
    'blaq digital',
  ];

  for (const phrase of multiWordPhrases) {
    if (messageLower.includes(phrase) && knowledgeBase[phrase]) {
      return {
        response: knowledgeBase[phrase],
        hasRelevantContent: true,
      };
    }
  }

  // Priority 4: Check for direct keyword matches (single words)
  let bestMatch = '';
  let highestScore = 0;

  for (const [keyword, content] of Object.entries(knowledgeBase)) {
    if (messageLower.includes(keyword)) {
      const score = keyword.length / messageLower.length;
      if (score > highestScore) {
        highestScore = score;
        bestMatch = content;
      }
    }
  }

  if (bestMatch) {
    return {
      response: bestMatch,
      hasRelevantContent: true,
    };
  }

  // Fallback response if no relevant content found
  // Provide helpful guidance without being repetitive
  const fallbackMessage = type === 'rag'
    ? `I'd be happy to help! I specialize in answering questions about Northbound Studio. Here are some topics I know about:

**Services & Solutions**
• AI chatbots and RAG systems
• Web development and AI integration
• Conversational media platforms

**Company Information**
• Our locations (LA HQ, SF Tech Hub, Atlanta Office)
• Team and expertise
• What makes us different

**Project Details**
• Pricing and timelines
• Development approach
• How to get started

What would you like to know more about?`
    : `I'm Cody, Northbound Studio's AI assistant! I'm here to help answer your questions about our AI development services, RAG chatbot solutions, and web development offerings.

Feel free to ask me about:
• Our services and capabilities
• Project pricing and timelines
• How RAG technology works
• Our multi-location team (LA, SF, Atlanta)
• Getting started with a project

What can I help you with today?`;

  return {
    response: fallbackMessage,
    hasRelevantContent: false,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, type = 'chatbot' } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const sessionId = request.cookies.get('session_id')?.value ||
      `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const { response, hasRelevantContent, sources } = await generateResponse(message, type);

    const res = NextResponse.json({
      response,
      sessionId,
      metadata: {
        hasRelevantContent,
        type,
        sourcesCount: sources?.length || 0,
      },
      sources: sources || [],
    });

    res.cookies.set('session_id', sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  } catch (error) {
    console.error('[Chat API] Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to retrieve conversation history
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('session_id')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      sessionId,
      history: [],
      message: 'Conversation history retrieval - awaiting memory API integration',
    });
  } catch (error) {
    console.error('[Chat API] GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
