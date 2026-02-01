import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, Code, Heart, Target, Zap, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Blaq Digital | AI-Native Agency Leadership',
  description: 'Meet the next-generation digital studio at the intersection of AI, entertainment, and Black culture. Expert team specializing in AI systems, engineering excellence, and cultural intelligence for media companies.',
  openGraph: {
    title: 'About Blaq Digital | AI-Native Agency Leadership',
    description: 'Expert team specializing in AI systems, engineering excellence, and cultural intelligence for Black media companies and creators.',
    type: 'website',
    url: '/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Blaq Digital | AI-Native Agency Leadership',
    description: 'Expert team specializing in AI systems, engineering excellence, and cultural intelligence for Black media companies and creators.',
  },
};

const values = [
  {
    icon: Brain,
    title: 'AI-Native Thinking',
    description: 'We don\'t bolt AI onto existing systems. We design from first principles for an AI-powered future.',
  },
  {
    icon: Heart,
    title: 'Culture-First Approach',
    description: 'Deep respect and understanding of Black culture, media, and the unique challenges of ownership and representation.',
  },
  {
    icon: Code,
    title: 'Engineering Excellence',
    description: 'Production-grade code, scalable architecture, and best practices. We build systems that last.',
  },
  {
    icon: Target,
    title: 'Business Value Focus',
    description: 'Technology for technology\'s sake is meaningless. We focus on measurable outcomes and ROI.',
  },
];

const principles = [
  'Your IP is yours. We build systems you own and control.',
  'No vendor lock-in. Open standards and portable solutions.',
  'Transparent pricing. No hidden fees or surprise costs.',
  'Knowledge transfer. We document and teach as we build.',
  'Long-term partnerships. We\'re invested in your success.',
];

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blaq Digital',
    alternateName: 'Blaq Digital Studio',
    url: 'https://blaq.ainative.studio',
    logo: 'https://blaq.ainative.studio/logo.png',
    description: 'Next-generation digital studio built at the intersection of artificial intelligence, entertainment, and Black culture. We build intelligent media systems for Black media companies and creators.',
    foundingDate: '2024',
    slogan: 'Building the future of media, entertainment, and culture through intelligent systems',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '40.7128',
        longitude: '-74.0060',
      },
      geoRadius: 'global',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Media Technology',
      'Content Management Systems',
      'RAG Systems',
      'Natural Language Processing',
      'Digital Media',
      'Entertainment Technology',
      'Black Media',
      'Cultural Intelligence',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Powered Media Applications',
          description: 'Custom AI applications for content discovery, recommendations, and audience engagement',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Intelligent Media Systems',
          description: 'RAG-powered content systems, automated tagging, and semantic search solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full-Stack Development',
          description: 'Production-grade web applications and digital products',
        },
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1>About Blaq Digital</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're a next-generation digital studio built at the intersection of <span className="text-foreground font-semibold">artificial intelligence</span>, <span className="text-foreground font-semibold">entertainment</span>, and <span className="text-foreground font-semibold">Black culture</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded to serve the AI-native generation of Black media companies, we bring together engineering excellence, cultural intelligence, and deep expertise in AI systems. We're not a traditional agency — we're a hybrid studio that understands both the technical complexities of AI and the cultural nuances of Black media and entertainment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">Our Mission</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                To empower Black media companies and creators with intelligent systems that amplify their voice, scale their impact, and secure their ownership in the AI era.
              </p>
            </div>

            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Zap className="h-6 w-6 text-primary" />
                      What We Believe
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The future of media is intelligent, conversational, and personalized. AI isn't coming — it's here. The companies that win will be those who integrate AI into their core operations, not as a feature, but as a fundamental part of how they create, distribute, and monetize content.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Black media companies shouldn't be left behind in this transformation. We exist to ensure they're not just participants, but leaders in the AI-powered media landscape.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Users className="h-6 w-6 text-primary" />
                      Who We Serve
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        Black media companies and entertainment brands
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        Studios and production companies
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        Streaming platforms and networks
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        Digital creators and influencers
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        AI-native founders building in media/entertainment
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="bg-card/50 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">How We Work</h2>
              <p className="text-xl text-muted-foreground">
                Transparent, collaborative, and focused on your success
              </p>
            </div>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-8 md:p-12 space-y-12">
                <ul className="space-y-4">
                  {principles.map((principle, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      </div>
                      <span className="text-lg text-foreground">{principle}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-8 pt-8 border-t border-border/50">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold">A Startup Approach to Digital Products</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We are entrepreneurs, and we treat your digital product as if it were our own startup. Our process is designed to uncover the biggest and scariest unknowns right away, so you can rest assured that your app will meet its business goals and make you money.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-primary">Learn</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        We learn everything we can about your market until we're experts so every part of the product meets your business goals
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-primary">Ideate</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        We love to brainstorm and generate ideas with you. On every call we bring insights to both business and technical challenges
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-primary">Build</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Sit back and let us build you a flawless product. Our work is fully transparent, which means you will get regular updates
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-primary">Launch</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Before we even begin development, we're already planning a go-to-market strategy with you to ensure product adoption
                      </p>
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
            <h2>Let's Build Together</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're a media executive, creator, or founder, we're here to help you leverage AI to achieve your vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Start a Conversation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/work">
                  See Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
