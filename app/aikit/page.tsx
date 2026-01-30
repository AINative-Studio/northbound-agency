import Link from 'next/link';
import { ArrowRight, Code, Zap, Shield, BarChart3, MessageSquare, Cpu, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stats = [
  { number: '15+', label: 'Components' },
  { number: '8+', label: 'Hooks' },
  { number: '3+', label: 'Frameworks' },
  { number: '6+', label: 'Tools' },
];

const demos = [
  {
    icon: MessageSquare,
    title: 'Streaming Chat',
    description: 'Real-time message streaming with markdown, code highlighting, and animations',
  },
  {
    icon: Cpu,
    title: 'Agent System',
    description: 'Multi-agent orchestration with tool execution and progress tracking',
  },
  {
    icon: Shield,
    title: 'Safety Features',
    description: 'PII detection, prompt injection protection, and content moderation',
  },
  {
    icon: BarChart3,
    title: 'Usage Dashboard',
    description: 'Token counting, cost tracking, and analytics visualization',
  },
];

const frameworks = [
  { name: 'React', package: '@ainative/ai-kit' },
  { name: 'Vue', package: '@ainative/ai-kit-vue' },
  { name: 'Svelte', package: '@ainative/ai-kit-svelte' },
];

export default function AIKitPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                Blaq Digital in Partnership with AINative
              </Badge>
              <h1 className="text-gradient">AI Kit</h1>
              <p className="text-2xl md:text-3xl font-semibold text-foreground">
                Build Stunning AI Interfaces
              </p>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Production-ready React components for streaming chat, agent orchestration, safety features, and usage analytics. Ship AI features in minutes, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <a href="#demos">
                  Explore Demos <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <a href="https://github.com/ainative" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demos" className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">Interactive Demos</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore each AI Kit feature with live, interactive demos. See how easy it is to build beautiful AI experiences.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demos.map((demo) => (
                <Card key={demo.title} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <demo.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{demo.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{demo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Multi-Framework Support</h2>
              <p className="text-xl text-muted-foreground">
                Use AI Kit with your favorite framework
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {frameworks.map((framework) => (
                <Card key={framework.name} className="bg-card/50 border-border/50">
                  <CardContent className="p-6 text-center space-y-3">
                    <h3 className="text-2xl font-semibold">{framework.name}</h3>
                    <code className="text-sm text-primary bg-background/50 px-3 py-1 rounded">
                      {framework.package}
                    </code>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Get Started in Seconds</h2>
              <p className="text-xl text-muted-foreground">
                Simple installation and intuitive API
              </p>
            </div>
            <Card className="bg-card/50 border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 space-y-6 bg-background/50">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Install AI Kit</div>
                        <code className="block bg-card/50 border border-border/50 rounded-lg p-4 text-sm text-foreground">
                          npm install @ainative/ai-kit
                        </code>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Use in your React app</div>
                        <pre className="bg-card/50 border border-border/50 rounded-lg p-4 text-xs text-foreground overflow-x-auto">
{`import { useConversation, StreamingMessage }
from '@ainative/ai-kit';

function Chat() {
  const { messages, send, isStreaming } =
    useConversation({
      url: '/api/chat',
    });

  return (
    <div>
      {messages.map(msg => (
        <StreamingMessage
          key={msg.id}
          content={msg.content}
        />
      ))}
    </div>
  );
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
                    <div className="space-y-6 text-center">
                      <Code className="h-24 w-24 text-primary/50 mx-auto" />
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">Try It Live</h3>
                        <p className="text-muted-foreground">
                          Test components in your browser
                        </p>
                      </div>
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/demos">View Interactive Demos</Link>
                      </Button>
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
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2>Ready to Build?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of developers building beautiful AI interfaces with AI Kit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                <a href="https://github.com/ainative" target="_blank" rel="noopener noreferrer">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
            <div className="pt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Built by</span>
              <span className="font-semibold text-foreground">Blaq Digital in Partnership with AINative Studio</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
