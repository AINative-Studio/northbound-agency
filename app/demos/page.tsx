import { Chatbot } from '@/components/chatbot';
import { Brain, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ragPrompts = [
  "What does Blaq Digital do?",
  "How does RAG work?",
  "Can you build AI chatbots for media companies?",
  "What's the difference between RAG and regular chatbots?",
];

const chatbotPrompts = [
  "Tell me about your AI services",
  "What makes Blaq Digital different?",
  "How can AI help my media business?",
  "What's your typical project timeline?",
];

export default function DemosPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>AI Demos</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the power of AI firsthand. Try our intelligent chatbots trained on Blaq Digital knowledge and see how conversational AI can transform your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="rag" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="rag" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                RAG Bot
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chatbot
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rag" className="space-y-8">
              <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">RAG-Powered Assistant</h2>
                <p className="text-lg text-muted-foreground">
                  This chatbot uses Retrieval-Augmented Generation to provide accurate, knowledge-grounded responses
                  about Blaq Digital's services and AI capabilities.
                </p>
                <div className="bg-card/30 rounded-lg border border-border/50 p-6 text-left">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    What is RAG?
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    RAG (Retrieval-Augmented Generation) combines AI with your proprietary knowledge base.
                    Instead of generic responses, it retrieves relevant information from your content and uses
                    that to generate accurate, contextual answers. Perfect for building AI assistants that truly
                    understand your business.
                  </p>
                </div>
              </div>
              <Chatbot
                title="RAG Bot - Knowledge-Grounded Responses"
                type="rag"
                initialPrompts={ragPrompts}
              />
            </TabsContent>

            <TabsContent value="chat" className="space-y-8">
              <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">Conversational Assistant</h2>
                <p className="text-lg text-muted-foreground">
                  A smart, context-aware chatbot that can answer questions about our services, guide you through
                  the discovery process, and help you understand how AI can transform your media business.
                </p>
                <div className="bg-card/30 rounded-lg border border-border/50 p-6 text-left">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Smart Conversations
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This chatbot demonstrates natural language understanding, context retention, and
                    intelligent routing. It can answer questions, provide recommendations, and guide users
                    to the right resources — just like having a knowledgeable team member available 24/7.
                  </p>
                </div>
              </div>
              <Chatbot
                title="Conversational Assistant"
                type="chatbot"
                initialPrompts={chatbotPrompts}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card/30 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Want This for Your Business?</h2>
            <p className="text-xl text-muted-foreground">
              We can build custom AI chatbots trained on your content, speaking in your voice, and integrated
              directly into your platform. From customer support to content discovery, the possibilities are endless.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-lg"
              >
                Build Your AI Assistant
              </a>
              <a
                href="/services/ai-apps"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 text-lg"
              >
                Learn About AI Development
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
