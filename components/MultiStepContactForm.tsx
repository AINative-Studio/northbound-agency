'use client';

import { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zerodb } from '@/lib/zerodb';

interface FormData {
  name: string;
  company: string;
  email: string;
  ai_workflow: string;
  has_project: 'yes' | 'not_yet' | '';
  project_description: string;
  service_preference: 'full_service' | 'self_service' | '';
}

interface MultiStepContactFormProps {
  onClose?: () => void;
}

export default function MultiStepContactForm({ onClose }: MultiStepContactFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    ai_workflow: '',
    has_project: '',
    project_description: '',
    service_preference: '',
  });

  const totalSteps = 4;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRadioChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' &&
               formData.email.trim() !== '' &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 2:
        return formData.ai_workflow.trim() !== '';
      case 3:
        return formData.has_project !== '';
      case 4:
        return formData.service_preference !== '';
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // Reset form
    setCurrentStep(1);
    setFormData({
      name: '',
      company: '',
      email: '',
      ai_workflow: '',
      has_project: '',
      project_description: '',
      service_preference: '',
    });
    setIsSuccess(false);
    setError('');
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      await zerodb.insertTable('contact_submissions', {
        name: formData.name,
        company: formData.company || null,
        email: formData.email,
        ai_workflow: formData.ai_workflow,
        has_project: formData.has_project,
        project_description: formData.project_description || null,
        service_preference: formData.service_preference,
        submitted_at: new Date().toISOString(),
      });

      setIsSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  if (isSuccess) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-8">
          <div className="text-center space-y-6 py-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Thank You!</h3>
              <p className="text-muted-foreground">
                We've received your submission and will get back to you within 24 hours.
              </p>
            </div>
            <Button onClick={handleClose} variant="outline">
              Submit Another Response
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-8">
        {/* Header with Close button */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Contact Form</h3>
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="space-y-6 min-h-[300px]">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                <p className="text-sm text-muted-foreground">
                  Let's start with some basic information about you.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  autoFocus
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
                  onChange={handleInputChange}
                  placeholder="Your company (optional)"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: AI Workflow Assessment */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-lg font-semibold mb-2">AI Workflow Assessment</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand your current AI development process.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="ai_workflow" className="text-sm font-medium">
                  Tell us how you use AI today in your development process{' '}
                  <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="ai_workflow"
                  name="ai_workflow"
                  value={formData.ai_workflow}
                  onChange={handleInputChange}
                  placeholder="Describe your current AI tools, workflows, challenges, or aspirations..."
                  rows={8}
                  autoFocus
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Be as detailed as you'd like. This helps us tailor our approach to your needs.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Project Readiness */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-lg font-semibold mb-2">Project Readiness</h4>
                <p className="text-sm text-muted-foreground">
                  Let us know if you have a specific project in mind.
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Do you have a project or feature in mind?{' '}
                  <span className="text-destructive">*</span>
                </label>

                <RadioGroup
                  value={formData.has_project}
                  onValueChange={(value) => handleRadioChange('has_project', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-input hover:border-primary transition-colors">
                    <RadioGroupItem value="yes" id="project-yes" />
                    <label
                      htmlFor="project-yes"
                      className="flex-1 cursor-pointer text-sm font-medium"
                    >
                      Yes, I have a project in mind
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-input hover:border-primary transition-colors">
                    <RadioGroupItem value="not_yet" id="project-no" />
                    <label
                      htmlFor="project-no"
                      className="flex-1 cursor-pointer text-sm font-medium"
                    >
                      Not yet, just exploring options
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {formData.has_project === 'yes' && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <label htmlFor="project_description" className="text-sm font-medium">
                    Tell us about your project
                  </label>
                  <Textarea
                    id="project_description"
                    name="project_description"
                    value={formData.project_description}
                    onChange={handleInputChange}
                    placeholder="Describe your project goals, timeline, and any specific requirements..."
                    rows={6}
                    className="resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Service Selection */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="text-lg font-semibold mb-2">Service Selection</h4>
                <p className="text-sm text-muted-foreground">
                  Choose the service model that best fits your needs.
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Select your preferred service{' '}
                  <span className="text-destructive">*</span>
                </label>

                <div className="grid gap-4">
                  <button
                    type="button"
                    onClick={() => handleRadioChange('service_preference', 'full_service')}
                    className={`p-6 rounded-lg border-2 text-left transition-all hover:border-primary ${
                      formData.service_preference === 'full_service'
                        ? 'border-primary bg-primary/5'
                        : 'border-input'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-lg">Full-Service Implementation</h5>
                        {formData.service_preference === 'full_service' && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We build and deploy your AI solution end-to-end. Perfect for complex projects
                        or teams without dedicated AI expertise.
                      </p>
                      <div className="pt-2 space-y-1">
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                          Full project management and development
                        </div>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                          Custom AI models and integrations
                        </div>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                          Ongoing support and maintenance
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRadioChange('service_preference', 'self_service')}
                    className={`p-6 rounded-lg border-2 text-left transition-all hover:border-primary ${
                      formData.service_preference === 'self_service'
                        ? 'border-primary bg-primary/5'
                        : 'border-input'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-lg">Self-Service Platform</h5>
                        {formData.service_preference === 'self_service' && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Access our AI tools and platform to build solutions yourself. Ideal for
                        technical teams who want flexibility and control.
                      </p>
                      <div className="pt-2 space-y-1">
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                          Pre-built AI components and APIs
                        </div>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                          Comprehensive documentation
                        </div>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                          Community support and resources
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
          <div>
            {currentStep > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>

          <div>
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleContinue}
                disabled={!isStepValid()}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
