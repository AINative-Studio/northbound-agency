'use client';

import { useState } from 'react';
import { Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            company: formData.company || null,
            email: formData.email,
            project_type: formData.projectType,
            description: formData.description,
          },
        ]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        projectType: '',
        description: '',
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-green-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1>Let's Build Something Amazing</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you're ready to start a project or just want to explore what's possible, we're here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Tell us about your project, challenges, or ideas. We'll get back to you within 24 hours to schedule a discovery call.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Discovery Call</h3>
                      <p className="text-sm text-muted-foreground">
                        Free 30-minute consultation to discuss your needs and explore solutions
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Project Scoping</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed technical assessment and transparent pricing based on your requirements
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-card/30 rounded-lg border border-border/50 p-6">
                <h3 className="font-semibold mb-3">What to Expect:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    Response within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    Free initial consultation
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    No pressure or sales tactics
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    Honest assessment of what AI can do for you
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center space-y-6 py-8">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">Thank You!</h3>
                        <p className="text-muted-foreground">
                          We've received your message and will get back to you within 24 hours.
                        </p>
                      </div>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">
                          Company
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company (optional)"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="projectType" className="text-sm font-medium">
                          Project Type *
                        </label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, projectType: value }))
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AI App Development">
                              AI App Development
                            </SelectItem>
                            <SelectItem value="Web Development">
                              Web Development
                            </SelectItem>
                            <SelectItem value="Media + AI Systems">
                              Media + AI Systems
                            </SelectItem>
                            <SelectItem value="Not Sure">
                              Not Sure / Exploring
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Project Description *
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          placeholder="Tell us about your project, challenges, or goals..."
                          rows={5}
                        />
                      </div>

                      {error && (
                        <div className="text-sm text-destructive">{error}</div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90"
                        size="lg"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
