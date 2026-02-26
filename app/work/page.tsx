import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Our Work | AI Projects Portfolio & Case Studies - Northbound Studio',
  description: 'Explore our portfolio of AI-powered media applications, RAG systems, and intelligent automation projects. Real case studies showcasing content discovery engines, conversational AI, and automated content intelligence for streaming platforms, entertainment studios, publishers, and creator networks.',
  keywords: [
    'AI portfolio',
    'AI case studies',
    'AI projects showcase',
    'RAG systems portfolio',
    'content discovery case studies',
    'media technology portfolio',
    'AI applications examples',
    'media technology projects',
    'intelligent systems portfolio',
    'AI development case studies',
    'conversational AI projects',
    'content intelligence systems',
    'streaming platform AI',
    'entertainment technology portfolio',
    'AI chatbot case studies',
    'semantic search projects',
    'media automation portfolio',
  ],
  authors: [{ name: 'Northbound Studio', url: 'https://northboundstudio.co' }],
  creator: 'Northbound Studio',
  publisher: 'Northbound Studio',
  category: 'Portfolio',
  alternates: {
    canonical: '/work',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Our Work | AI Projects Portfolio & Case Studies - Northbound Studio',
    description: 'AI-powered media applications and intelligent systems delivering real results. Case studies featuring RAG systems, content discovery engines, conversational AI, and automation for streaming platforms, studios, publishers, and creator networks.',
    type: 'website',
    url: '/work',
    siteName: 'Northbound Studio',
    images: [
      {
        url: 'https://northboundstudio.co/og-work.jpg',
        width: 1200,
        height: 630,
        alt: 'Northbound Studio AI Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | AI Projects Portfolio & Case Studies - Northbound Studio',
    description: 'AI-powered media applications and intelligent systems delivering measurable results for streaming platforms, studios, publishers, and creator networks.',
    creator: '@northboundstudio',
    images: ['https://northboundstudio.co/og-work.jpg'],
  },
};

const caseStudies = [
  {
    title: 'AI-Powered Content Discovery Platform',
    client: 'Streaming Media Network',
    problem: 'Viewers struggled to find relevant content in a library of 10,000+ titles, leading to low engagement and high churn.',
    solution: 'Built a custom RAG-powered recommendation engine that understands user preferences and content context. Implemented conversational search and personalized content feeds.',
    techStack: ['Next.js', 'Python', 'RAG', 'Vector DB', 'ZeroDB'],
    aiUsed: 'RAG system with semantic search, embeddings-based recommendations, and natural language content discovery',
    outcome: '45% increase in content discovery, 32% reduction in churn, 3x engagement with recommended content',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Person using tablet to browse streaming media content with AI-powered content discovery interface showing personalized recommendations and semantic search results',
  },
  {
    title: 'Interactive Fan Engagement Platform',
    client: 'Entertainment Studio',
    problem: 'Wanted to deepen fan engagement beyond social media and create new revenue streams from existing IP.',
    solution: 'Developed an AI chatbot trained on show lore, character details, and behind-the-scenes content. Fans can have conversations about episodes, characters, and storylines.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Pinecone', 'Stripe'],
    aiUsed: 'Custom RAG system with fine-tuned responses, multi-persona chat, and context-aware conversations',
    outcome: '50k+ users in first month, 12-minute average session time, new subscription revenue stream launched',
    image: 'https://images.pexels.com/photos/7679453/pexels-photo-7679453.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Interactive fan engagement platform interface displaying conversational AI chatbot with character personas and entertainment content, showing engaged users having dialogue about show storylines',
  },
  {
    title: 'Automated Content Intelligence System',
    client: 'Media Publisher',
    problem: 'Manual content tagging and metadata creation was slow and inconsistent, limiting content discoverability.',
    solution: 'Built an AI system that automatically analyzes articles, generates tags, creates summaries, and suggests related content. Integrated with existing CMS.',
    techStack: ['Python', 'FastAPI', 'LLMs', 'PostgreSQL', 'Redis'],
    aiUsed: 'NLP for content analysis, automatic tagging, sentiment analysis, and semantic clustering',
    outcome: '90% reduction in manual tagging time, 60% improvement in content discovery, consistent metadata across 100k+ articles',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Automated content intelligence system dashboard showing AI-powered article analysis, automatic tagging generation, sentiment analysis metrics, and content metadata management for media publisher',
  },
  {
    title: 'Creator Knowledge Assistant',
    client: 'Digital Creator Network',
    problem: 'Creators needed quick answers about platform features, best practices, and monetization strategies.',
    solution: 'Developed an internal AI assistant trained on platform documentation, creator success stories, and support tickets. Available 24/7 for instant help.',
    techStack: ['Next.js', 'RAG', 'ZeroDB', 'Vercel AI SDK'],
    aiUsed: 'RAG system with documentation retrieval, conversational AI, and multi-turn dialogue support',
    outcome: '70% reduction in support tickets, 95% creator satisfaction, faster onboarding for new creators',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Creator knowledge assistant AI interface showing conversational support system helping digital creators with platform features, monetization strategies, and best practices documentation retrieval',
  },
];

export default function WorkPage() {
  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Northbound Studio AI Projects Portfolio',
    description: 'Case studies of AI-powered media applications and intelligent systems',
    itemListElement: caseStudies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `https://northboundstudio.co/work#project-${index + 1}`,
        name: study.title,
        headline: study.title,
        description: study.solution,
        abstract: study.problem,
        creator: {
          '@type': 'Organization',
          '@id': 'https://northboundstudio.co/#organization',
          name: 'Northbound Studio',
          url: 'https://northboundstudio.co',
        },
        provider: {
          '@type': 'Organization',
          '@id': 'https://northboundstudio.co/#organization',
          name: 'Northbound Studio',
        },
        about: {
          '@type': 'Thing',
          name: 'AI Application Development',
          description: study.aiUsed,
        },
        keywords: [...study.techStack, 'AI', 'Artificial Intelligence', 'Media Technology', 'Machine Learning'].join(', '),
        image: {
          '@type': 'ImageObject',
          url: study.image,
          caption: study.imageAlt,
          description: `${study.title} - ${study.client}`,
        },
        audience: {
          '@type': 'Audience',
          audienceType: study.client,
        },
        genre: 'Case Study',
        inLanguage: 'en',
        datePublished: '2024',
        text: `Challenge: ${study.problem}\n\nSolution: ${study.solution}\n\nAI Capabilities: ${study.aiUsed}\n\nResults: ${study.outcome}`,
        workExample: {
          '@type': 'SoftwareApplication',
          applicationCategory: 'AI Application',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
          },
        },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://northboundstudio.co',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Our Work',
        item: 'https://northboundstudio.co/work',
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Our Work</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real results for media companies, studios, and creators. See how we've transformed content operations and audience engagement with AI.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <div key={study.title} className="max-w-6xl mx-auto">
                <Card className="bg-card/50 border-border/50 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                      <div className={`p-8 md:p-12 space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <div className="space-y-2">
                          <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                            {study.client}
                          </p>
                          <h2 className="text-3xl md:text-4xl font-bold">{study.title}</h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Challenge</h3>
                            <p className="text-muted-foreground leading-relaxed">{study.problem}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">Solution</h3>
                            <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">AI Capabilities</h3>
                            <p className="text-muted-foreground leading-relaxed">{study.aiUsed}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                              {study.techStack.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2">
                            <h3 className="text-lg font-semibold mb-2">Results</h3>
                            <p className="text-foreground font-medium leading-relaxed">{study.outcome}</p>
                          </div>
                        </div>
                      </div>

                      <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        <Image
                          src={study.image}
                          alt={study.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2>Ready to See Similar Results?</h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss your challenges and design an AI system that delivers measurable business value.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/services">
                  View Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
