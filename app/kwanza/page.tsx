import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Users, Shield, Lightbulb, Heart, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function KwanzaPage() {
  const principles = [
    {
      name: 'Umoja',
      english: 'Unity',
      icon: Users,
      description: 'Unified schemas across all user personas - builders, educators, researchers, and creators work together.',
      implementation: 'Consistent data structures and APIs'
    },
    {
      name: 'Kujichagulia',
      english: 'Self-Determination',
      icon: Shield,
      description: 'User-controlled citation toggles and content preferences.',
      implementation: 'User agency over AI responses'
    },
    {
      name: 'Ujima',
      english: 'Collective Work & Responsibility',
      icon: Heart,
      description: 'Logged ingestion and auditable changes for community accountability.',
      implementation: 'Transparent data provenance'
    },
    {
      name: 'Ujamaa',
      english: 'Cooperative Economics',
      icon: Sparkles,
      description: 'Reusable datasets with shared attribution across the community.',
      implementation: 'Open data sharing with credit'
    },
    {
      name: 'Nia',
      english: 'Purpose',
      icon: Star,
      description: 'Education-first approach, not content automation. Cultural preservation over commercial extraction.',
      implementation: 'Learning-focused AI systems'
    },
    {
      name: 'Kuumba',
      english: 'Creativity',
      icon: Lightbulb,
      description: 'Creator tools grounded in retrieval - every creative suggestion cites its sources.',
      implementation: 'Citation-backed creativity'
    },
    {
      name: 'Imani',
      english: 'Faith',
      icon: Zap,
      description: 'Trust via citations and transparent refusal when sources are insufficient.',
      implementation: 'Verified, trustworthy responses'
    }
  ];

  const features = [
    {
      title: 'RAG-First Architecture',
      description: 'Every answer retrieves documents, scores them, cites them, and shows what\'s missing. No hallucinations, only grounded responses.'
    },
    {
      title: 'Citation Enforcement',
      description: 'Mandatory source attribution with provenance transparency. Every claim is backed by verifiable sources.'
    },
    {
      title: 'Cultural Grounding',
      description: 'Systems reject hallucinations and unverifiable claims. Cultural intelligence you can trust.'
    },
    {
      title: 'Multi-Persona Design',
      description: 'Tailored interfaces for builders, educators, researchers, and creators with specialized workflows.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-green-500/5 to-yellow-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Cultural AI Intelligence
            </div>
            <h1 className="text-gradient">Kwanza</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A citation-first AI platform for cultural preservation. Built on the principles of Kwanzaa (Nguzo Saba), delivering trustworthy AI systems for the Black media and entertainment community.
            </p>
            <p className="text-lg text-muted-foreground/80">
              A collaborative project by <span className="text-primary font-semibold">AINative Studio</span>, <span className="text-primary font-semibold">Northbound Studio</span>, and <span className="text-primary font-semibold">Kwanza Hall</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Get Early Access <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <a href="https://github.com/AINative-Studio/kwanzaa" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Kwanza Different */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">AI You Can Trust</h2>
            <p className="text-xl text-muted-foreground">
              Traditional AI systems hallucinate, make up facts, and can't cite their sources. Kwanza is different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nguzo Saba - The Seven Principles */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">Nguzo Saba: The Seven Principles</h2>
            <p className="text-xl text-muted-foreground">
              Kwanza is built on the seven principles of Kwanzaa, with each principle mapped to engineering constraints that ensure cultural integrity and trustworthiness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card key={index} className="bg-card/50 border-border/50 backdrop-blur hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">{principle.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">({principle.english})</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-primary font-medium">
                        {principle.implementation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">Built with Modern AI Infrastructure</h2>
            <p className="text-xl text-muted-foreground">
              Enterprise-grade technology stack designed for reliability and scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/50 border-border/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Backend</h3>
                <p className="text-muted-foreground mb-4">Python-based RAG architecture with adapter logic</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Python 85%</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">ZeroDB</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">LoRA Adapters</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Frontend</h3>
                <p className="text-muted-foreground mb-4">Multi-persona interfaces for diverse users</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">JavaScript</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">React</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Data & Evaluation</h3>
                <p className="text-muted-foreground mb-4">Structured corpus with evaluation harnesses</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">JSON Schemas</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">Docker</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">Metrics</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Join the Cultural AI Revolution</h2>
            <p className="text-xl text-muted-foreground">
              Kwanza is building the future of trustworthy AI for Black media and entertainment. Get early access and help shape the platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Get Notified <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              Open source and community-driven. Contributions welcome from engineers and non-engineers alike.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
