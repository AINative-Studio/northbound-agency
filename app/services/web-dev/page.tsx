import Link from 'next/link';
import { Code, Zap, Globe, Smartphone, CheckCircle2, ArrowRight, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const capabilities = [
  {
    icon: Code,
    title: 'Next.js Development',
    description: 'Modern React applications with server-side rendering, API routes, and optimal performance.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast load times, efficient code splitting, and optimal user experience.',
  },
  {
    icon: Globe,
    title: 'API-First Architecture',
    description: 'Scalable backend systems that power web, mobile, and AI applications.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Beautiful interfaces that work seamlessly across all devices and screen sizes.',
  },
];

const features = [
  'Modern, component-driven architecture',
  'TypeScript for type safety and maintainability',
  'Tailwind CSS for rapid, consistent styling',
  'SEO optimization and meta tags',
  'Analytics and tracking integration',
  'Authentication and user management',
  'Database design and integration',
  'CI/CD and deployment automation',
];

const techStack = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Vercel', category: 'Hosting' },
];

export default function WebDevPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h1>Web Development</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              High-performance web platforms built with modern technologies. We create fast, scalable applications that deliver exceptional user experiences and drive business results.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
              <Link href="/contact">
                Start Your Web Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">What We Do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Full-stack development with engineering excellence
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
              <h2 className="mb-4">Features & Capabilities</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need for a modern web application
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Tech Stack</h2>
              <p className="text-xl text-muted-foreground">
                We use proven, modern technologies that scale
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <Card key={tech.name} className="bg-card/50 border-border/50">
                  <CardContent className="p-6 text-center space-y-2">
                    <h3 className="text-lg font-semibold">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.category}</p>
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
                <div className="text-center space-y-6">
                  <Gauge className="h-16 w-16 text-primary mx-auto" />
                  <h2 className="text-3xl md:text-4xl">Performance Matters</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Every millisecond counts. We optimize for Core Web Vitals, implement efficient code splitting,
                    and use modern best practices to ensure your site loads fast and runs smoothly. Our goal is
                    90+ Lighthouse scores across all metrics.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-primary">Fast</h3>
                      <p className="text-muted-foreground">Optimized load times</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-primary">Accessible</h3>
                      <p className="text-muted-foreground">WCAG compliant</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-primary">SEO Ready</h3>
                      <p className="text-muted-foreground">Optimized for search</p>
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
            <h2>Ready to Build Your Platform?</h2>
            <p className="text-xl text-muted-foreground">
              Let's create a web application that's fast, scalable, and built to last.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/work">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
