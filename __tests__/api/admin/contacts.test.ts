/**
 * Test Suite: Admin Contacts API
 *
 * Tests for the protected /api/admin/contacts endpoint
 * Covers authentication, validation, error handling, and successful operations
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/admin/contacts/route';
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

describe('GET /api/admin/contacts', () => {
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

    const request = new NextRequest('http://localhost/api/admin/contacts');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 429 when rate limit exceeded', async () => {
    mockCheckRateLimit.mockReturnValue(false);

    const request = new NextRequest('http://localhost/api/admin/contacts');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Rate Limit Exceeded');
  });

  it('should return contact submissions when authenticated', async () => {
    const mockContacts = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        project_type: 'Web Development',
        description: 'Need a new website',
        status: 'new',
        created_at: '2026-01-30T10:00:00Z',
      },
    ];

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockContacts });

    const request = new NextRequest('http://localhost/api/admin/contacts');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.contacts).toHaveLength(1);
    expect(data.data.contacts[0].name).toBe('John Doe');
  });

  it('should filter by status', async () => {
    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: [] });

    const request = new NextRequest(
      'http://localhost/api/admin/contacts?status=new'
    );
    await GET(request);

    expect(mockZerodb.queryTable).toHaveBeenCalledWith('contact_submissions', {
      status: 'new',
    });
  });

  it('should filter by email', async () => {
    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: [] });

    const request = new NextRequest(
      'http://localhost/api/admin/contacts?email=test@example.com'
    );
    await GET(request);

    expect(mockZerodb.queryTable).toHaveBeenCalledWith('contact_submissions', {
      email: 'test@example.com',
    });
  });

  it('should filter by project type', async () => {
    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: [] });

    const request = new NextRequest(
      'http://localhost/api/admin/contacts?project_type=AI+Development'
    );
    await GET(request);

    expect(mockZerodb.queryTable).toHaveBeenCalledWith('contact_submissions', {
      project_type: 'AI Development',
    });
  });

  it('should apply pagination correctly', async () => {
    const mockContacts = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      name: `Contact ${i}`,
      email: `contact${i}@example.com`,
      created_at: `2026-01-${i + 1}T10:00:00Z`,
    }));

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockContacts });

    const request = new NextRequest(
      'http://localhost/api/admin/contacts?limit=5&offset=2'
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.contacts).toHaveLength(5);
    expect(data.data.offset).toBe(2);
    expect(data.data.limit).toBe(5);
  });

  it('should sort in descending order by default', async () => {
    const mockContacts = [
      { id: '1', created_at: '2026-01-01T10:00:00Z' },
      { id: '2', created_at: '2026-01-02T10:00:00Z' },
    ];

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockContacts });

    const request = new NextRequest('http://localhost/api/admin/contacts');
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.contacts[0].id).toBe('2'); // Most recent first
  });
});

describe('POST /api/admin/contacts', () => {
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

    const request = new NextRequest('http://localhost/api/admin/contacts', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost/api/admin/contacts', {
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
      name: 'Test',
      // Missing email, project_type, description
    };

    const request = new NextRequest('http://localhost/api/admin/contacts', {
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

  it('should return 400 for invalid email format', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      project_type: 'Web Dev',
      description: 'Test',
    };

    const request = new NextRequest('http://localhost/api/admin/contacts', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation Error');
    expect(data.details).toContain('Valid email is required');
  });

  it('should create contact submission with valid data', async () => {
    const validData = {
      name: 'Jane Smith',
      company: 'Tech Innovations Inc',
      email: 'jane@techinnovations.com',
      phone: '+1-555-0123',
      project_type: 'AI Development',
      description: 'Looking to build a RAG-powered chatbot',
      status: 'new',
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({
      rows: [{ id: 'contact-123' }],
    });

    const request = new NextRequest('http://localhost/api/admin/contacts', {
      method: 'POST',
      body: JSON.stringify(validData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.id).toBe('contact-123');
    expect(data.data.name).toBe(validData.name);
    expect(data.data.email).toBe(validData.email);
    expect(mockZerodb.insertTable).toHaveBeenCalledWith(
      'contact_submissions',
      expect.objectContaining({
        name: validData.name,
        email: validData.email,
      })
    );
  });

  it('should sanitize input to prevent XSS', async () => {
    const dataWithXSS = {
      name: 'Test <script>alert("xss")</script>',
      email: 'test@example.com',
      project_type: 'Web Dev <img src=x onerror=alert(1)>',
      description: 'Description',
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/contacts', {
      method: 'POST',
      body: JSON.stringify(dataWithXSS),
    });
    await POST(request);

    const insertCall = mockZerodb.insertTable.mock.calls[0][1];
    expect(insertCall.name).not.toContain('<script>');
    expect(insertCall.project_type).not.toContain('<img');
  });

  it('should apply default status when not provided', async () => {
    const minimalData = {
      name: 'Test User',
      email: 'test@example.com',
      project_type: 'Consultation',
      description: 'Need advice on AI implementation',
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/contacts', {
      method: 'POST',
      body: JSON.stringify(minimalData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(data.data.status).toBe('new');
  });

  it('should handle optional fields correctly', async () => {
    const dataWithOptional = {
      name: 'Test User',
      email: 'test@example.com',
      project_type: 'Development',
      description: 'Project description',
      company: 'Optional Company',
      phone: '+1-555-9999',
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/contacts', {
      method: 'POST',
      body: JSON.stringify(dataWithOptional),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(data.data.company).toBe('Optional Company');
    expect(data.data.phone).toBe('+1-555-9999');
  });
});
