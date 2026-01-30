import { NextRequest, NextResponse } from 'next/server';
import { zerodb } from '@/lib/zerodb';

async function generateResponse(message: string, type: string): Promise<string> {
  try {
    // Search for relevant content using vector similarity
    const searchResults = await zerodb.searchSimilarText(
      'blaq_knowledge_base',
      message,
      3
    );

    // If we have good matches, format them into a response
    if (searchResults?.results && searchResults.results.length > 0) {
      const topResult = searchResults.results[0];

      // If the similarity score is high enough, use this content
      if (topResult.score && topResult.score > 0.7) {
        return topResult.document || topResult.text || topResult.metadata?.content;
      }

      // Otherwise, combine multiple results
      const combinedContext = searchResults.results
        .slice(0, 2)
        .map((r: any) => r.document || r.text || r.metadata?.content)
        .filter(Boolean)
        .join('\n\n');

      if (combinedContext) {
        return combinedContext;
      }
    }
  } catch (error) {
    console.error('Vector search error:', error);
  }

  // Fallback response if vector search fails or returns no results
  if (type === 'rag') {
    return `I'm a RAG-powered assistant trained on Blaq Digital's knowledge base. I can answer questions about:

- Our services (AI apps, web dev, media+AI systems)
- How RAG works and why it's powerful
- AI chatbot development
- What makes us different
- Pricing and timelines

Try asking: "What does Blaq Digital do?" or "How does RAG work?"`;
  }

  return `Thanks for your question! I'm an AI assistant for Blaq Digital. I can help you learn about:

- Our AI development services
- How we build RAG systems and chatbots
- Web platform development
- Media + AI systems
- Why we're different from traditional agencies

For specific questions about your project needs, I recommend reaching out through our contact page, or try asking about our services, pricing, or approach!`;
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

    const response = await generateResponse(message, type);

    const sessionId = request.cookies.get('session_id')?.value ||
      `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    await zerodb.storeMemory({
      session_id: sessionId,
      message,
      response,
      message_type: type,
    });

    const res = NextResponse.json({ response });
    res.cookies.set('session_id', sessionId, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: 'lax',
    });

    return res;
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
