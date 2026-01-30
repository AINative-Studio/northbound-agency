/**
 * Test Suite: Admin Case Studies API
 *
 * Tests for the protected /api/admin/case-studies endpoint
 * Covers authentication, validation, error handling, and successful operations
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/admin/case-studies/route';
import * as authModule from '@/lib/auth';
import * as zerodbModule from '@/lib/zerodb';

// Mock dependencies
jest.mock('@/lib/auth');
jest.mock('@/lib/zerodb');

const mockAuthenticateRequest = authModule.authenticateRequest as jest.MockedFunction<
  typeof authModule.authenticateRequest
>;
const mockCheckRateLimit = authModule.checkRateLimit as jest.MockedFunction<
  typeof authModule.checkRateLimit
>;

describe('GET /api/admin/case-studies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default to passing rate limit and auth
    mockCheckRateLimit.mockReturnValue(true);
    mockAuthenticateRequest.mockResolvedValue({
      authenticated: true,
      user: { id: 'admin-1', email: 'admin@test.com', role: 'admin' },
    });
  });

  it('should return 401 when not authenticated', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      authenticated: false,
      error: 'Invalid token',
    });

    const request = new NextRequest('http://localhost/api/admin/case-studies');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 429 when rate limit exceeded', async () => {
    mockCheckRateLimit.mockReturnValue(false);

    const request = new NextRequest('http://localhost/api/admin/case-studies');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Rate Limit Exceeded');
  });

  it('should return case studies when authenticated', async () => {
    const mockCaseStudies = [
      {
        id: '1',
        title: 'AI Chatbot',
        client: 'Acme Corp',
        problem: 'Customer support scaling',
        solution: 'RAG-powered chatbot',
        tech_stack: ['React', 'Node.js', 'OpenAI'],
        ai_used: 'GPT-4 with RAG',
        outcome: '50% reduction in support tickets',
        published: true,
        order_index: 1,
      },
    ];

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockCaseStudies });

    const request = new NextRequest('http://localhost/api/admin/case-studies');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.case_studies).toHaveLength(1);
    expect(data.data.case_studies[0].title).toBe('AI Chatbot');
  });

  it('should filter by published status', async () => {
    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: [] });

    const request = new NextRequest(
      'http://localhost/api/admin/case-studies?published=true'
    );
    await GET(request);

    expect(mockZerodb.queryTable).toHaveBeenCalledWith('case_studies', {
      published: true,
    });
  });

  it('should apply pagination correctly', async () => {
    const mockCaseStudies = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      title: `Case Study ${i}`,
      order_index: i,
    }));

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockCaseStudies });

    const request = new NextRequest(
      'http://localhost/api/admin/case-studies?limit=5&offset=3'
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.case_studies).toHaveLength(5);
    expect(data.data.offset).toBe(3);
    expect(data.data.limit).toBe(5);
  });
});

describe('POST /api/admin/case-studies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckRateLimit.mockReturnValue(true);
    mockAuthenticateRequest.mockResolvedValue({
      authenticated: true,
      user: { id: 'admin-1', email: 'admin@test.com', role: 'admin' },
    });
  });

  it('should return 401 when not authenticated', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      authenticated: false,
      error: 'Invalid token',
    });

    const request = new NextRequest('http://localhost/api/admin/case-studies', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost/api/admin/case-studies', {
      method: 'POST',
      body: 'invalid json',
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Bad Request');
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = {
      title: 'Test',
      // Missing other required fields
    };

    const request = new NextRequest('http://localhost/api/admin/case-studies', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation Error');
    expect(data.details).toBeDefined();
    expect(data.details.length).toBeGreaterThan(0);
  });

  it('should create case study with valid data', async () => {
    const validData = {
      title: 'AI Chatbot Platform',
      client: 'Tech Startup Inc',
      problem: 'Need for 24/7 customer support',
      solution: 'RAG-powered AI chatbot',
      tech_stack: ['React', 'Node.js', 'OpenAI', 'PostgreSQL'],
      ai_used: 'GPT-4 with custom RAG implementation',
      outcome: 'Reduced support costs by 60%',
      image_url: 'https://example.com/chatbot.jpg',
      published: true,
      order_index: 1,
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({
      rows: [{ id: 'new-id-123' }],
    });

    const request = new NextRequest('http://localhost/api/admin/case-studies', {
      method: 'POST',
      body: JSON.stringify(validData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.id).toBe('new-id-123');
    expect(data.data.title).toBe(validData.title);
    expect(mockZerodb.insertTable).toHaveBeenCalledWith(
      'case_studies',
      expect.objectContaining({
        title: validData.title,
        client: validData.client,
      })
    );
  });

  it('should sanitize input to prevent XSS', async () => {
    const dataWithXSS = {
      title: 'Test <script>alert("xss")</script>',
      client: 'Client <img src=x onerror=alert(1)>',
      problem: 'Problem',
      solution: 'Solution',
      tech_stack: ['React'],
      ai_used: 'GPT-4',
      outcome: 'Success',
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/case-studies', {
      method: 'POST',
      body: JSON.stringify(dataWithXSS),
    });
    await POST(request);

    const insertCall = mockZerodb.insertTable.mock.calls[0][1];
    expect(insertCall.title).not.toContain('<script>');
    expect(insertCall.title).not.toContain('</script>');
    expect(insertCall.client).not.toContain('<img');
  });

  it('should apply default values for optional fields', async () => {
    const minimalData = {
      title: 'Minimal Case Study',
      client: 'Client Name',
      problem: 'Problem',
      solution: 'Solution',
      tech_stack: ['React'],
      ai_used: 'GPT-4',
      outcome: 'Success',
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/case-studies', {
      method: 'POST',
      body: JSON.stringify(minimalData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(data.data.published).toBe(false);
    expect(data.data.order_index).toBe(0);
  });
});
