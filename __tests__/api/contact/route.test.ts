/**
 * Test Suite: Contact Form API with Resend Email Integration
 *
 * Tests for the /api/contact endpoint
 * Covers POST request handling, ZeroDB insertion, Resend email sending,
 * validation, error handling, and graceful degradation
 *
 * TDD Approach: RED -> GREEN -> REFACTOR
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';
import * as zerodbModule from '@/lib/zerodb';

// Mock dependencies
jest.mock('@/lib/zerodb');

// Create a mock for Resend email send function
const mockEmailSend = jest.fn();

jest.mock('resend', () => {
  const mockSend = jest.fn();
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    })),
    __mockEmailSend: mockSend, // Export for access in tests
  };
});

// Get the actual mock function from the Resend module
const { Resend } = require('resend');
const resendInstance = new (Resend as any)();
const actualMockEmailSend = resendInstance.emails.send;

const mockZerodb = zerodbModule.zerodb as any;

describe('POST /api/contact - TDD Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock for successful ZeroDB insertion
    mockZerodb.insertTable = jest.fn().mockResolvedValue({
      rows: [{ id: 'contact-123', created_at: '2026-02-20T10:00:00Z' }],
    });

    // Reset Resend mock to successful email sending
    actualMockEmailSend.mockResolvedValue({ id: 'email-123' });
  });

  describe('Request Validation', () => {
    it('should return 400 for invalid JSON', async () => {
      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: 'invalid json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('should return 400 for missing required field: name', async () => {
      const invalidData = {
        company: 'Test Corp',
        email: 'test@example.com',
        ai_workflow: 'Need help with AI',
        has_project: 'yes',
        project_description: 'Build chatbot',
        service_preference: 'full_service',
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('name');
    });

    it('should return 400 for missing required field: email', async () => {
      const invalidData = {
        name: 'John Doe',
        company: 'Test Corp',
        ai_workflow: 'Need help with AI',
        has_project: 'yes',
        project_description: 'Build chatbot',
        service_preference: 'full_service',
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('email');
    });

    it('should return 400 for invalid email format', async () => {
      const invalidData = {
        name: 'John Doe',
        company: 'Test Corp',
        email: 'invalid-email',
        ai_workflow: 'Need help with AI',
        has_project: 'yes',
        project_description: 'Build chatbot',
        service_preference: 'full_service',
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('email');
    });

    it('should return 400 for invalid has_project value', async () => {
      const invalidData = {
        name: 'John Doe',
        company: 'Test Corp',
        email: 'john@example.com',
        ai_workflow: 'Need help with AI',
        has_project: 'invalid_value',
        project_description: 'Build chatbot',
        service_preference: 'full_service',
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('has_project');
    });

    it('should return 400 for invalid service_preference value', async () => {
      const invalidData = {
        name: 'John Doe',
        company: 'Test Corp',
        email: 'john@example.com',
        ai_workflow: 'Need help with AI',
        has_project: 'yes',
        project_description: 'Build chatbot',
        service_preference: 'invalid_preference',
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('service_preference');
    });
  });

  describe('ZeroDB Integration', () => {
    it('should insert contact data into ZeroDB with all required fields', async () => {
      const validData = {
        name: 'Jane Smith',
        company: 'Tech Innovations Inc',
        email: 'jane@techinnovations.com',
        ai_workflow: 'We want to build an AI chatbot for customer support',
        has_project: 'yes' as const,
        project_description: 'RAG-powered support system with knowledge base',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockZerodb.insertTable).toHaveBeenCalledWith(
        'contact_submissions',
        expect.objectContaining({
          name: validData.name,
          company: validData.company,
          email: validData.email,
          ai_workflow: validData.ai_workflow,
          has_project: validData.has_project,
          project_description: validData.project_description,
          service_preference: validData.service_preference,
        })
      );
    });

    it('should handle null company field correctly', async () => {
      const validData = {
        name: 'John Doe',
        company: null,
        email: 'john@example.com',
        ai_workflow: 'Exploring AI solutions',
        has_project: 'not_yet' as const,
        project_description: null,
        service_preference: 'self_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockZerodb.insertTable).toHaveBeenCalledWith(
        'contact_submissions',
        expect.objectContaining({
          company: null,
        })
      );
    });

    it('should handle null project_description when has_project is "not_yet"', async () => {
      const validData = {
        name: 'Sarah Johnson',
        company: 'Startup Co',
        email: 'sarah@startup.com',
        ai_workflow: 'Just exploring possibilities',
        has_project: 'not_yet' as const,
        project_description: null,
        service_preference: 'self_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockZerodb.insertTable).toHaveBeenCalledWith(
        'contact_submissions',
        expect.objectContaining({
          project_description: null,
        })
      );
    });
  });

  describe('Resend Email Integration', () => {
    it('should send email via Resend API with correct template', async () => {
      const validData = {
        name: 'Michael Chen',
        company: 'AI Ventures',
        email: 'michael@aiventures.com',
        ai_workflow: 'Building a content recommendation engine',
        has_project: 'yes' as const,
        project_description: 'Need ML models for personalized recommendations',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.email_sent).toBe(true);
    });

    it('should format email with correct subject line', async () => {
      const validData = {
        name: 'Emily Rodriguez',
        company: 'MediaTech',
        email: 'emily@mediatech.com',
        ai_workflow: 'Video content analysis',
        has_project: 'yes' as const,
        project_description: 'Automated video tagging and categorization',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      // Email subject should include name
      expect(actualMockEmailSend).toHaveBeenCalled();
      const lastCall = actualMockEmailSend.mock.calls[actualMockEmailSend.mock.calls.length - 1][0];
      expect(lastCall.subject).toContain('Emily Rodriguez');
    });

    it('should include all form data in email body', async () => {
      const validData = {
        name: 'David Park',
        company: 'FinTech Solutions',
        email: 'david@fintech.com',
        ai_workflow: 'Fraud detection system',
        has_project: 'yes' as const,
        project_description: 'Real-time transaction monitoring with ML',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(actualMockEmailSend).toHaveBeenCalled();
      const lastCall = actualMockEmailSend.mock.calls[actualMockEmailSend.mock.calls.length - 1][0];
      const emailHtml = lastCall.html;

      expect(emailHtml).toContain('David Park');
      expect(emailHtml).toContain('FinTech Solutions');
      expect(emailHtml).toContain('david@fintech.com');
      expect(emailHtml).toContain('Fraud detection system');
      expect(emailHtml).toContain('Real-time transaction monitoring with ML');
    });

    it('should set replyTo to user email address', async () => {
      const validData = {
        name: 'Lisa Wong',
        company: 'E-commerce Plus',
        email: 'lisa@ecommerce.com',
        ai_workflow: 'Product search optimization',
        has_project: 'yes' as const,
        project_description: 'Semantic search for product catalog',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(actualMockEmailSend).toHaveBeenCalled();
      const lastCall = actualMockEmailSend.mock.calls[actualMockEmailSend.mock.calls.length - 1][0];
      expect(lastCall.replyTo).toBe('lisa@ecommerce.com');
    });
  });

  describe('Error Handling and Graceful Degradation', () => {
    it('should return success even if email fails (graceful degradation)', async () => {
      // Make Resend throw an error
      actualMockEmailSend.mockRejectedValueOnce(new Error('Resend API error'));

      const validData = {
        name: 'Test User',
        company: 'Test Corp',
        email: 'test@example.com',
        ai_workflow: 'Test workflow',
        has_project: 'yes' as const,
        project_description: 'Test project',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.email_sent).toBe(false);
      expect(data.data.email_error).toBeDefined();
    });

    it('should store submission in ZeroDB even if email fails', async () => {
      // Make Resend throw an error
      actualMockEmailSend.mockRejectedValueOnce(new Error('Email service down'));

      const validData = {
        name: 'Resilient User',
        company: 'Test Inc',
        email: 'resilient@example.com',
        ai_workflow: 'Testing error handling',
        has_project: 'not_yet' as const,
        project_description: null,
        service_preference: 'self_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(mockZerodb.insertTable).toHaveBeenCalledWith(
        'contact_submissions',
        expect.objectContaining({
          name: 'Resilient User',
          email: 'resilient@example.com',
        })
      );
    });

    it('should return 500 if ZeroDB insertion fails', async () => {
      mockZerodb.insertTable.mockRejectedValue(new Error('Database error'));

      const validData = {
        name: 'Test User',
        company: 'Test Corp',
        email: 'test@example.com',
        ai_workflow: 'Test workflow',
        has_project: 'yes' as const,
        project_description: 'Test project',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('should log email errors to console for debugging', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // Make Resend throw an error
      actualMockEmailSend.mockRejectedValueOnce(new Error('SMTP connection failed'));

      const validData = {
        name: 'Debug User',
        company: 'Debug Corp',
        email: 'debug@example.com',
        ai_workflow: 'Testing logging',
        has_project: 'yes' as const,
        project_description: 'Test',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Email Template Formatting', () => {
    it('should display "Not provided" for null company field', async () => {
      const validData = {
        name: 'Solo Founder',
        company: null,
        email: 'solo@startup.com',
        ai_workflow: 'Building MVP',
        has_project: 'yes' as const,
        project_description: 'Early stage startup',
        service_preference: 'self_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(actualMockEmailSend).toHaveBeenCalled();
      const lastCall = actualMockEmailSend.mock.calls[actualMockEmailSend.mock.calls.length - 1][0];
      expect(lastCall.html).toContain('Not provided');
    });

    it('should display "N/A" for null project_description', async () => {
      const validData = {
        name: 'Explorer User',
        company: 'Exploring Corp',
        email: 'explorer@example.com',
        ai_workflow: 'Just researching',
        has_project: 'not_yet' as const,
        project_description: null,
        service_preference: 'self_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(actualMockEmailSend).toHaveBeenCalled();
      const lastCall = actualMockEmailSend.mock.calls[actualMockEmailSend.mock.calls.length - 1][0];
      expect(lastCall.html).toContain('N/A');
    });

    it('should display "Yes" or "Not yet" for has_project field', async () => {
      const validData = {
        name: 'Test User',
        company: 'Test Corp',
        email: 'test@example.com',
        ai_workflow: 'Test',
        has_project: 'yes' as const,
        project_description: 'Test project',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(actualMockEmailSend).toHaveBeenCalled();
      const lastCall = actualMockEmailSend.mock.calls[actualMockEmailSend.mock.calls.length - 1][0];
      expect(lastCall.html).toContain('Yes');
    });

    it('should display "Full-Service Implementation" or "Self-Service Platform" for service_preference', async () => {
      const validData = {
        name: 'Premium Client',
        company: 'Enterprise Corp',
        email: 'premium@enterprise.com',
        ai_workflow: 'Full implementation needed',
        has_project: 'yes' as const,
        project_description: 'Enterprise-grade system',
        service_preference: 'full_service' as const,
      };

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validData),
      });

      await POST(request);

      expect(actualMockEmailSend).toHaveBeenCalled();
      const lastCall = actualMockEmailSend.mock.calls[actualMockEmailSend.mock.calls.length - 1][0];
      expect(lastCall.html).toContain('Full-Service Implementation');
    });
  });
});

// Export mock for use in other tests if needed
export { actualMockEmailSend as mockEmailSend };
