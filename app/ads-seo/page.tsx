import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Target, TrendingUp, Search, Video, BarChart3, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Paid Ads + SEO Performance Acceleration | Northbound Studio',
  description: 'Turn attention into measurable growth with strategic paid media campaigns (Meta, YouTube) and search engine optimization. Data-driven performance systems designed to convert traffic into revenue.',
  keywords: [
    'paid advertising',
    'performance marketing',
    'Meta ads',
    'YouTube advertising',
    'SEO optimization',
    'search engine marketing',
    'conversion optimization',
    'retargeting campaigns',
    'YouTube SEO',
    'paid media strategy',
    'digital advertising agency',
    'performance acceleration',
    'conversion systems',
    'customer acquisition',
    'paid search',
  ],
  openGraph: {
    title: 'Paid Ads + SEO Performance Acceleration | Northbound Studio',
    description: 'Strategic paid media and search systems that attract qualified demand and connect it to conversion infrastructure built to scale.',
    type: 'website',
    url: 'https://northboundstudio.co/ads-seo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Northbound Studio Ads + SEO Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paid Ads + SEO Performance Acceleration | Northbound Studio',
    description: 'Turn attention into measurable growth with data-driven performance systems.',
    images: ['/og-image.png'],
    creator: '@northboundstudio',
  },
}

// Schema.org JSON-LD for ProfessionalService
const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ads + SEO Performance Acceleration',
  provider: {
    '@type': 'Organization',
    name: 'Northbound Studio',
    url: 'https://northboundstudio.co',
  },
  serviceType: 'Performance Marketing & SEO',
  areaServed: 'Worldwide',
  description: 'Strategic paid media campaigns and search engine optimization designed to convert attention into measurable revenue growth.',
  offers: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Ads + SEO Performance Acceleration',
      description: 'Comprehensive performance marketing including Meta ads, YouTube advertising, retargeting infrastructure, YouTube SEO, and search engine optimization.',
    },
  },
}

// Breadcrumb Schema
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
      name: 'Ads + SEO',
      item: 'https://northboundstudio.co/ads-seo',
    },
  ],
}

export default function AdsSEOPage() {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Performance Acceleration</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Turn Attention Into Measurable Growth
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                We design paid media and search systems that attract qualified demand and connect it to conversion infrastructure built to scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link href="/work">View Our Work</Link>
                </Button>
              </div>

              <div className="inline-block p-6 bg-card border border-border rounded-lg">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Clicks don't grow businesses.
                </p>
                <p className="text-xl text-primary font-bold">
                  Conversion systems do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Problem</h2>

              <div className="bg-card border border-border rounded-lg p-8 mb-6">
                <p className="text-xl text-muted-foreground mb-8 text-center">
                  Most companies run ads without structure.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'No clear funnel',
                    'No attribution clarity',
                    'No retargeting strategy',
                    'No optimization discipline',
                  ].map((problem, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <span className="text-lg text-foreground">{problem}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xl text-destructive font-semibold mt-8 text-center">
                  Traffic becomes expensive noise.
                </p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  We build performance systems that close the loop.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Deploy Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">What We Deploy</h2>

            <div className="max-w-6xl mx-auto space-y-16">
              {/* Paid Media */}
              <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl md:text-3xl font-bold">Paid Media (Meta + YouTube)</h3>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Strategic, video-led campaigns designed to drive:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    'Qualified leads',
                    'Booked appointments',
                    'Sales conversations',
                    'Scalable customer acquisition',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mb-4">
                  Every campaign is built around:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    'Clear audience targeting',
                    'Funnel alignment',
                    'Conversion tracking',
                    'Data-driven iteration',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-base">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <p className="text-lg font-semibold text-center">
                    Whether you're a local service business or a scaling brand, the principle is the same:
                  </p>
                  <p className="text-xl font-bold text-primary text-center mt-2">
                    Right audience. Right message. Right system.
                  </p>
                </div>
              </div>

              {/* Retargeting Infrastructure */}
              <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl md:text-3xl font-bold">Retargeting Infrastructure</h3>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Most businesses lose the majority of their warm traffic.
                </p>

                <p className="text-lg mb-6">
                  We engineer structured retargeting systems that:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    'Re-engage video viewers',
                    'Nurture site visitors',
                    'Reinforce trust',
                    'Increase close rates',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-muted rounded-lg p-6 border-l-4 border-primary">
                  <p className="text-lg font-semibold">Attention is rented.</p>
                  <p className="text-xl font-bold text-primary mt-1">Trust is compounded.</p>
                </div>
              </div>

              {/* YouTube SEO */}
              <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Video className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl md:text-3xl font-bold">YouTube SEO</h3>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  YouTube is both a search engine and a trust engine.
                </p>

                <p className="text-lg mb-6">We optimize content for:</p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    'Search visibility',
                    'Strategic keyword targeting',
                    'Authority positioning',
                    'Long-term organic discovery',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <p className="text-lg font-semibold text-center">
                    This creates durable traffic that compounds over time.
                  </p>
                </div>
              </div>

              {/* Search Engine Optimization */}
              <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Search className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl md:text-3xl font-bold">Search Engine Optimization</h3>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Search traffic carries intent.
                </p>

                <p className="text-lg mb-6">We build SEO foundations designed for:</p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    'Service-based visibility',
                    'Authority building',
                    'Technical performance',
                    'Conversion-optimized landing architecture',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-muted rounded-lg p-6 border-l-4 border-primary">
                  <p className="text-lg font-semibold">SEO is not just ranking.</p>
                  <p className="text-xl font-bold text-primary mt-1">
                    It's positioning your business where buying decisions begin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Operate Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How We Operate</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  { number: '01', title: 'Strategy & Funnel Mapping', icon: Target },
                  { number: '02', title: 'Campaign & Search Deployment', icon: Zap },
                  { number: '03', title: 'Tracking & Attribution Setup', icon: BarChart3 },
                  { number: '04', title: 'Ongoing Optimization & Scale', icon: TrendingUp },
                ].map((step, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-mono text-muted-foreground">{step.number}</span>
                        <h3 className="text-lg font-semibold mt-1">{step.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="space-y-3">
                  <p className="text-lg text-muted-foreground">We monitor performance consistently.</p>
                  <p className="text-lg text-muted-foreground">We refine based on data.</p>
                  <p className="text-xl font-bold text-primary">We scale what proves profitable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-12">
                <p className="text-xl text-muted-foreground mb-4">Some agencies sell impressions.</p>
                <p className="text-xl text-muted-foreground mb-6">Some sell clicks.</p>

                <p className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
                  We build performance systems designed to convert attention into revenue — sustainably.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg">
                    <Link href="/contact">
                      Start a Conversation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg">
                    <Link href="/services">Explore All Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
