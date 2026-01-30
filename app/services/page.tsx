import Link from 'next/link';
import { Brain, Code, Layers, ArrowRight, Sparkles, Zap, Target, MessageSquare, Cpu, BarChart3, Eye, Smartphone, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const capabilities = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Conversational AI',
    offerings: ['Chatbots and Voicebots', 'Talk To Your Data', 'AI Knowledge Base'],
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Generative AI',
    offerings: ['AI Agents', 'Agentic Workflow Automation', 'AI Augmented Workforce'],
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Classic Machine Learning',
    offerings: ['Predictive Analytics', 'Recommendation Systems', 'Anomaly Detection'],
  },
  {
    number: '04',
    icon: Eye,
    title: 'Computer Vision',
    offerings: ['Image and Video Analysis', 'Optical Character Recognition', 'Object Detection'],
  },
  {
    number: '05',
    icon: Zap,
    title: 'AI for IoT Applications',
    offerings: ['Preventative Maintenance', 'Smart Monitoring Systems'],
  },
  {
    number: '06',
    icon: Smartphone,
    title: 'Mobile App Development',
    offerings: ['AI Enhanced UX', 'Native iOS & Android', 'Flutter', 'React Native'],
  },
  {
    number: '07',
    icon: Globe,
    title: 'Custom Web Apps',
    offerings: ['Microservices', 'CRMs', 'CMS', 'Integration with Legacy Systems', 'Scalable Architecture'],
  },
  {
    number: '08',
    icon: TrendingUp,
    title: 'AI Go-To-Market Strategies',
    offerings: ['Market Research and Positioning', 'Channel and Partner Strategy', 'Performance Tracking and Optimization'],
  },
];

const services = [
  {
    icon: Brain,
    title: 'AI App Development',
    slug: 'ai-apps',
    description: 'Custom AI applications, RAG systems, chatbots, and intelligent automation tailored to your business needs.',
    features: [
      'Custom AI Applications',
      'RAG (Retrieval-Augmented Generation) Systems',
      'Conversational Interfaces',
      'Internal AI Tools',
      'Media Intelligence Systems',
    ],
  },
  {
    icon: Code,
    title: 'Web Development',
    slug: 'web-dev',
    description: 'High-performance, modern web platforms built with cutting-edge technologies and best practices.',
    features: [
      'Next.js Applications',
      'API-First Architecture',
      'Performance Optimization',
      'SEO & Analytics Ready',
      'Responsive Design',
    ],
  },
  {
    icon: Layers,
    title: 'Media + AI Systems',
    slug: 'media-ai',
    description: 'Intelligent media infrastructure that transforms how audiences discover and engage with content.',
    features: [
      'Conversational Media Experiences',
      'AI-Powered Content Discovery',
      'Audience Intelligence',
      'Knowledge Assistants for IP',
      'Content Recommendation Engines',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Services</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We build intelligent systems that transform how media companies create, distribute, and monetize content.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card/20 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              AI Isn't New. Neither Are We.
            </h2>
            <p className="text-xl md:text-2xl text-primary font-semibold">
              Building Digital Products Since 2010
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">Full-Spectrum AI & Development Capabilities</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From conversational AI to computer vision, from mobile apps to go-to-market strategies — we deliver end-to-end solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability) => (
                <Card key={capability.number} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="text-5xl font-bold text-primary/20 leading-none mb-2">
                          {capability.number}
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <capability.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold">{capability.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {capability.offerings.map((offering) => (
                            <span
                              key={offering}
                              className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full"
                            >
                              {offering}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Featured Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep dive into our core service areas designed specifically for media and entertainment companies
            </p>
          </div>
          <div className="space-y-16">
            {services.map((service, index) => (
              <Card key={service.slug} className="bg-card/50 border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    <div className={`p-8 md:p-12 space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h2 className="text-3xl md:text-4xl">{service.title}</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                              </div>
                            </div>
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href={`/services/${service.slug}`}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className={`bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <service.icon className="h-32 w-32 md:h-48 md:w-48 text-primary/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2>Why Work With Us</h2>
              <p className="text-xl text-muted-foreground">
                We bring together technical excellence, cultural understanding, and AI expertise.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">AI-Native</h3>
                <p className="text-muted-foreground">
                  Built for the future of intelligent systems
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Culture-First</h3>
                <p className="text-muted-foreground">
                  Deep understanding of Black media and entertainment
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Engineering-Led</h3>
                <p className="text-muted-foreground">
                  Technical excellence meets strategic vision
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
