import Link from 'next/link';
import { Layers, Film, Users, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Media Production & AI Content Creation Services | Blaq Digital',
  description: 'Transform media operations with AI-powered content discovery, automated tagging, and intelligent recommendation systems for studios, networks, and streaming platforms.',
  keywords: ['AI media production', 'AI content creation', 'Media intelligence', 'Content recommendation', 'Audience analytics', 'Video AI'],
  openGraph: {
    title: 'AI Media Production & AI Content Creation Services | Blaq Digital',
    description: 'Transform media operations with AI-powered content discovery, automated tagging, and intelligent recommendation systems for studios, networks, and streaming platforms.',
    url: 'https://blaq.ainative.studio/services/media-ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Media Production & AI Content Creation Services | Blaq Digital',
    description: 'Transform media operations with AI-powered content discovery, automated tagging, and intelligent recommendation systems for studios, networks, and streaming platforms.',
  },
};

const capabilities = [
  {
    icon: Sparkles,
    title: 'Conversational Media',
    description: 'Transform static content into interactive, AI-powered experiences that engage audiences in new ways.',
  },
  {
    icon: Film,
    title: 'Content Intelligence',
    description: 'Automated tagging, metadata generation, and content analysis powered by AI.',
  },
  {
    icon: Users,
    title: 'Audience Insights',
    description: 'Understand your audience better with AI-driven analytics and behavioral intelligence.',
  },
  {
    icon: TrendingUp,
    title: 'Recommendation Systems',
    description: 'Personalized content recommendations that increase engagement and viewing time.',
  },
];

const useCases = [
  'AI chatbots trained on your media library',
  'Interactive episode guides and character databases',
  'Personalized content discovery engines',
  'Automated video tagging and transcription',
  'Audience sentiment analysis',
  'Content performance prediction',
  'Smart content scheduling',
  'Fan engagement platforms',
];

const outcomes = [
  {
    metric: 'Engagement',
    description: 'Increase audience interaction with conversational interfaces',
  },
  {
    metric: 'Discovery',
    description: 'Help viewers find content they love faster',
  },
  {
    metric: 'Efficiency',
    description: 'Automate content operations and metadata management',
  },
  {
    metric: 'Insights',
    description: 'Data-driven understanding of your audience',
  },
];

export default function MediaAIPage() {
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
        name: 'Media + AI Systems',
        item: 'https://blaq.ainative.studio/services/media-ai',
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://blaq.ainative.studio/services/media-ai#service',
    name: 'Media + AI Systems',
    description: 'Intelligent media infrastructure for studios, networks, and streaming platforms. AI-powered content discovery, automated metadata generation, recommendation engines, and audience analytics.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://blaq.ainative.studio/#organization',
      name: 'Blaq Digital',
    },
    serviceType: 'AI media production',
    areaServed: 'US',
    url: 'https://blaq.ainative.studio/services/media-ai',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Media AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Conversational Media',
            description: 'Transform static content into interactive, AI-powered experiences that engage audiences in new ways',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Content Intelligence',
            description: 'Automated tagging, metadata generation, and content analysis powered by AI',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audience Insights',
            description: 'Understand your audience better with AI-driven analytics and behavioral intelligence',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Recommendation Systems',
            description: 'Personalized content recommendations that increase engagement and viewing time',
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
              <Layers className="h-8 w-8 text-primary" />
            </div>
            <h1>Media + AI Systems</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              We build intelligent media infrastructure that transforms how audiences discover, engage with, and experience content. From conversational interfaces to recommendation engines, we make media smarter.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
              <Link href="/contact">
                Transform Your Media <ArrowRight className="ml-2 h-5 w-5" />
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
              Intelligent systems designed for media companies
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
                Real applications for studios, networks, and creators
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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Measurable Outcomes</h2>
              <p className="text-xl text-muted-foreground">
                AI systems that deliver real business value
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outcomes.map((outcome) => (
                <Card key={outcome.metric} className="bg-card/50 border-border/50">
                  <CardContent className="p-6 text-center space-y-3">
                    <h3 className="text-2xl font-bold text-primary">{outcome.metric}</h3>
                    <p className="text-muted-foreground">{outcome.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl">The Future of Media is Conversational</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Static content libraries are being replaced by intelligent systems that understand context,
                    personalize experiences, and engage audiences in natural conversations. Imagine fans chatting
                    with an AI that knows every episode of your show, every character detail, every behind-the-scenes
                    story. That's what we build.
                  </p>
                  <div className="bg-background/50 rounded-lg border border-border/50 p-6">
                    <h3 className="text-xl font-semibold mb-4">Perfect For:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Streaming platforms building recommendation engines</li>
                      <li>• Studios wanting to maximize content value</li>
                      <li>• Networks modernizing audience engagement</li>
                      <li>• Creators building deeper fan relationships</li>
                      <li>• Media companies with large content libraries</li>
                    </ul>
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
            <h2>Ready to Make Your Media Intelligent?</h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how AI can transform your content operations and audience engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/demos">See AI in Action</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
