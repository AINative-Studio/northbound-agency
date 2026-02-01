import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Our Work | AI Projects Portfolio - Blaq Digital',
  description: 'Explore our portfolio of AI-powered media applications and intelligent systems. Case studies showcasing content discovery platforms, fan engagement solutions, and automated content intelligence for Black media companies.',
  openGraph: {
    title: 'Our Work | AI Projects Portfolio - Blaq Digital',
    description: 'AI-powered media applications and intelligent systems. Real results for streaming platforms, studios, publishers, and creator networks.',
    type: 'website',
    url: '/work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | AI Projects Portfolio - Blaq Digital',
    description: 'AI-powered media applications and intelligent systems. Real results for streaming platforms, studios, publishers, and creator networks.',
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
  },
  {
    title: 'Automated Content Intelligence System',
    client: 'Black Media Publisher',
    problem: 'Manual content tagging and metadata creation was slow and inconsistent, limiting content discoverability.',
    solution: 'Built an AI system that automatically analyzes articles, generates tags, creates summaries, and suggests related content. Integrated with existing CMS.',
    techStack: ['Python', 'FastAPI', 'LLMs', 'PostgreSQL', 'Redis'],
    aiUsed: 'NLP for content analysis, automatic tagging, sentiment analysis, and semantic clustering',
    outcome: '90% reduction in manual tagging time, 60% improvement in content discovery, consistent metadata across 100k+ articles',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
  },
];

export default function WorkPage() {
  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: caseStudies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: study.title,
        description: study.solution,
        creator: {
          '@type': 'Organization',
          name: 'Blaq Digital',
          url: 'https://blaq.ainative.studio',
        },
        about: study.aiUsed,
        keywords: [...study.techStack, 'AI', 'Artificial Intelligence', 'Media Technology'].join(', '),
        image: study.image,
        audience: {
          '@type': 'Audience',
          audienceType: study.client,
        },
      },
    })),
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
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

                      <div
                        className={`relative h-64 lg:h-auto bg-cover bg-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                        style={{ backgroundImage: `url(${study.image})` }}
                      >
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
