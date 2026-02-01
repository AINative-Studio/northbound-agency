import Link from 'next/link';
import { Brain, MessageSquare, Database, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom AI Application Development & Enterprise AI Solutions | Blaq Digital',
  description: 'Build custom AI applications with RAG systems, chatbots, and intelligent automation. Enterprise AI solutions tailored for media and entertainment companies.',
  keywords: ['Custom AI application development', 'Enterprise AI solutions', 'RAG systems', 'AI chatbots', 'Intelligent automation', 'AI development'],
  openGraph: {
    title: 'Custom AI Application Development & Enterprise AI Solutions | Blaq Digital',
    description: 'Build custom AI applications with RAG systems, chatbots, and intelligent automation. Enterprise AI solutions tailored for media and entertainment companies.',
    url: 'https://blaq.ainative.studio/services/ai-apps',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI Application Development & Enterprise AI Solutions | Blaq Digital',
    description: 'Build custom AI applications with RAG systems, chatbots, and intelligent automation. Enterprise AI solutions tailored for media and entertainment companies.',
  },
};

const capabilities = [
  {
    icon: MessageSquare,
    title: 'RAG Systems',
    description: 'Build knowledge-grounded AI systems that answer questions based on your proprietary content and data.',
  },
  {
    icon: Brain,
    title: 'Custom AI Models',
    description: 'Fine-tuned models and prompt engineering tailored to your brand voice and specific use cases.',
  },
  {
    icon: Database,
    title: 'Vector Databases',
    description: 'Semantic search and retrieval systems for intelligent content discovery and recommendations.',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    description: 'Automate workflows, content processing, and repetitive tasks with intelligent systems.',
  },
];

const useCases = [
  'Customer support chatbots trained on your content',
  'Internal knowledge assistants for teams',
  'Content recommendation engines',
  'Intelligent content moderation',
  'Automated content tagging and metadata generation',
  'Audience insight and analytics tools',
  'AI-powered search interfaces',
  'Multi-channel conversational experiences',
];

export default function AIAppsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://blaq.ainative.studio',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://blaq.ainative.studio/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AI App Development',
        item: 'https://blaq.ainative.studio/services/ai-apps',
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://blaq.ainative.studio/services/ai-apps#service',
    name: 'Custom AI Application Development',
    description: 'Enterprise AI solutions including RAG systems, conversational AI, chatbots, and intelligent automation tailored for media and entertainment companies.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://blaq.ainative.studio/#organization',
      name: 'Blaq Digital',
    },
    serviceType: 'Custom AI application development',
    areaServed: 'US',
    url: 'https://blaq.ainative.studio/services/ai-apps',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'RAG Systems',
            description: 'Build knowledge-grounded AI systems that answer questions based on your proprietary content and data',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI Models',
            description: 'Fine-tuned models and prompt engineering tailored to your brand voice and specific use cases',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vector Databases',
            description: 'Semantic search and retrieval systems for intelligent content discovery and recommendations',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Automation',
            description: 'Automate workflows, content processing, and repetitive tasks with intelligent systems',
          },
        },
      ],
    },
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1>AI App Development</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              We build custom AI applications that understand your content, speak in your voice, and scale with your business. From RAG systems to conversational interfaces, we make AI work for you.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
              <Link href="/contact">
                Start Your AI Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Core Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end AI development from concept to deployment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {capabilities.map((capability) => (
              <Card key={capability.title} className="bg-card/50 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <capability.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{capability.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Use Cases</h2>
              <p className="text-xl text-muted-foreground">
                Real-world applications we've built for media and entertainment companies
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <div key={useCase} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-8 md:p-12">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl md:text-4xl">Why RAG Systems?</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Retrieval-Augmented Generation (RAG) combines the power of large language models with your proprietary content.
                    The result? AI that actually knows your business, speaks in your voice, and provides accurate, grounded responses
                    based on your data — not generic hallucinations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-primary">Accurate</h3>
                      <p className="text-muted-foreground">Responses grounded in your content</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-primary">Scalable</h3>
                      <p className="text-muted-foreground">Handle millions of documents</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-primary">Controlled</h3>
                      <p className="text-muted-foreground">Your data, your rules</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2>Ready to Build Your AI Application?</h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss your use case and design an AI system that delivers real business value.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/demos">Try Our AI Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
