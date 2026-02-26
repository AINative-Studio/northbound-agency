import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Brain, Code, Sparkles, Zap, Target, Layers, MessageSquare, Shield, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VideoBackground } from '@/components/video-background';

export const metadata: Metadata = {
  title: 'Northbound Studio | AI-Native Digital Media Agency for Black Entertainment',
  description: 'Leading AI-native digital agency specializing in custom AI applications, RAG chatbots, and intelligent media systems for the Black entertainment industry.',
  keywords: [
    'AI digital agency',
    'Black-owned AI agency',
    'AI development',
    'RAG chatbots',
    'custom AI applications',
    'AI media systems',
    'Black entertainment tech',
    'conversational AI',
    'AI-native agency',
    'intelligent media platforms',
    'Black media technology',
    'AI consulting',
    'machine learning development',
    'AI entertainment solutions',
    'Black-owned tech agency'
  ],
  openGraph: {
    title: 'Northbound Studio | AI-Native Digital Media Agency for Black Entertainment',
    description: 'Leading AI-native digital agency specializing in custom AI applications, RAG chatbots, and intelligent media systems for the Black entertainment industry.',
    url: 'https://northboundstudio.co',
    siteName: 'Northbound Studio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Northbound Studio - AI-Native Digital Media Agency'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northbound Studio | AI-Native Digital Media Agency for Black Entertainment',
    description: 'Leading AI-native digital agency specializing in custom AI applications, RAG chatbots, and intelligent media systems for the Black entertainment industry.',
    images: ['/og-image.png'],
    creator: '@northboundstudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://northboundstudio.co',
  },
};

// JSON-LD Structured Data for SEO
function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Northbound Studio',
    url: 'https://northboundstudio.co',
    logo: 'https://northboundstudio.co/logo.png',
    description: 'Leading AI-native digital agency specializing in custom AI applications, RAG chatbots, and intelligent media systems for the Black entertainment industry.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Northbound Studio Team'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@northboundstudios.co',
      url: 'https://northboundstudio.co/contact'
    },
    sameAs: [
      'https://twitter.com/northboundstudio',
      'https://linkedin.com/company/northbound-studio'
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'RAG Chatbots',
      'Custom AI Applications',
      'Digital Media',
      'Black Entertainment',
      'Conversational AI',
      'AI Development'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI and Digital Media Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI Applications',
            description: 'Custom AI applications built for your specific needs'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'RAG Chatbots',
            description: 'Knowledge-grounded conversational interfaces'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Conversational Media',
            description: 'Interactive content experiences powered by AI'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Platforms',
            description: 'Modern, high-performance web applications'
          }
        }
      ]
    }
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://northboundstudio.co',
    name: 'Northbound Studio',
    image: 'https://northboundstudio.co/logo.png',
    description: 'Leading AI-native digital agency specializing in custom AI applications, RAG chatbots, and intelligent media systems for the Black entertainment industry.',
    url: 'https://northboundstudio.co',
    telephone: '+1-XXX-XXX-XXXX',
    email: 'hello@northboundstudio.co',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7128',
      longitude: '-74.0060'
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://twitter.com/northboundstudio',
      'https://linkedin.com/company/northbound-studio'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Northbound Studio',
    url: 'https://northboundstudio.co',
    description: 'AI-native digital agency building custom AI applications, RAG chatbots, and intelligent media systems for Black entertainment and media companies.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://northboundstudio.co/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

const services = [
  {
    icon: Brain,
    title: 'AI Apps',
    description: 'Custom AI applications built for your specific needs',
  },
  {
    icon: MessageSquare,
    title: 'RAG Bots',
    description: 'Knowledge-grounded conversational interfaces',
  },
  {
    icon: Sparkles,
    title: 'Conversational Media',
    description: 'Interactive content experiences powered by AI',
  },
  {
    icon: Code,
    title: 'Web Platforms',
    description: 'Modern, high-performance web applications',
  },
];

const differentiators = [
  {
    icon: Zap,
    title: 'AI-Native',
    description: 'AI-first thinking, not AI-as-a-feature. Built from the ground up for intelligent systems.',
  },
  {
    icon: Target,
    title: 'Culture-First',
    description: 'Deep understanding of Black media, entertainment, and creator economy.',
  },
  {
    icon: Layers,
    title: 'Ownership-Driven',
    description: 'Your IP, your data, your control. We build for long-term value creation.',
  },
  {
    icon: Code,
    title: 'Engineering-Led',
    description: 'Not a traditional agency. We\'re engineers who understand both culture and code.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <StructuredData />
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <VideoBackground />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black/40 to-green-500/10 z-10" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-gradient drop-shadow-2xl">
              We Don't Just Market Content
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              We build intelligent media systems at the intersection of entertainment, AI, and Black culture. Deploy Secure AI Solutions That Deliver Positive ROI Within Weeks, not months.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8 shadow-xl">
                <Link href="/contact">
                  Build with AI <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8 border-white/30 bg-white/10 hover:bg-white/20 text-white shadow-xl backdrop-blur-sm">
                <Link href="/demos">See the Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-border/50 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Our team of engineers and Certified Product Managers has built award-winning AI and ML projects for industry-leading brands.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Secure & Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security with data privacy built in
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Fast ROI</h3>
                <p className="text-sm text-muted-foreground">
                  Measurable business value within weeks, not months
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Award-Winning</h3>
                <p className="text-sm text-muted-foreground">
                  Proven track record with industry-leading brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">What We Build</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Next-generation tools for the AI-native generation of Black media companies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Northbound Studio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A hybrid studio blending media, engineering, AI systems, and cultural intelligence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {differentiators.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Experience AI in Action</h2>
              <p className="text-xl text-muted-foreground">
                Try our RAG-powered chatbot trained on Black media and AI topics
              </p>
            </div>
            <Card className="bg-card/50 border-border/50 overflow-hidden">
              <CardContent className="p-8">
                <div className="bg-background/50 rounded-lg border border-border/50 p-8 text-center space-y-4">
                  <MessageSquare className="h-16 w-16 text-primary mx-auto" />
                  <h3 className="text-2xl font-semibold">Interactive AI Demo</h3>
                  <p className="text-muted-foreground">
                    Chat with our intelligent assistant to learn about our services, AI capabilities, and how we can help transform your media business.
                  </p>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/demos">
                      Try the Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2>Ready to Build the Future?</h2>
            <p className="text-xl text-muted-foreground">
              Let's create intelligent media systems that scale your vision and own your narrative.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
