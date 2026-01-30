/**
 * Test Suite: Admin Chat Logs API
 *
 * Tests for the protected /api/admin/chat-logs endpoint
 * Covers authentication, validation, error handling, and successful operations
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/admin/chat-logs/route';
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

describe('GET /api/admin/chat-logs', () => {
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

    const request = new NextRequest('http://localhost/api/admin/chat-logs');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 429 when rate limit exceeded', async () => {
    mockCheckRateLimit.mockReturnValue(false);

    const request = new NextRequest('http://localhost/api/admin/chat-logs');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Rate Limit Exceeded');
  });

  it('should return chat logs when authenticated', async () => {
    const mockChatLogs = [
      {
        id: '1',
        session_id: 'session-123',
        message: 'What services do you offer?',
        response: 'We offer AI development services',
        message_type: 'rag',
        created_at: '2026-01-30T10:00:00Z',
      },
    ];

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockChatLogs });

    const request = new NextRequest('http://localhost/api/admin/chat-logs');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.chat_logs).toHaveLength(1);
    expect(data.data.chat_logs[0].message).toBe('What services do you offer?');
  });

  it('should filter by session_id', async () => {
    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: [] });

    const request = new NextRequest(
      'http://localhost/api/admin/chat-logs?session_id=session-123'
    );
    await GET(request);

    expect(mockZerodb.queryTable).toHaveBeenCalledWith('chat_logs', {
      session_id: 'session-123',
    });
  });

  it('should filter by message_type', async () => {
    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: [] });

    const request = new NextRequest(
      'http://localhost/api/admin/chat-logs?message_type=rag'
    );
    await GET(request);

    expect(mockZerodb.queryTable).toHaveBeenCalledWith('chat_logs', {
      message_type: 'rag',
    });
  });

  it('should search in message and response text', async () => {
    const mockChatLogs = [
      {
        id: '1',
        session_id: 'session-1',
        message: 'Tell me about pricing',
        response: 'Our pricing starts at $5000',
        message_type: 'chatbot',
      },
      {
        id: '2',
        session_id: 'session-2',
        message: 'What is RAG?',
        response: 'RAG stands for Retrieval Augmented Generation',
        message_type: 'rag',
      },
    ];

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockChatLogs });

    const request = new NextRequest(
      'http://localhost/api/admin/chat-logs?search=pricing'
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.chat_logs).toHaveLength(1);
    expect(data.data.chat_logs[0].id).toBe('1');
  });

  it('should return session statistics', async () => {
    const mockChatLogs = [
      {
        id: '1',
        session_id: 'session-1',
        message: 'Message 1',
        response: 'Response 1',
        message_type: 'rag',
      },
      {
        id: '2',
        session_id: 'session-1',
        message: 'Message 2',
        response: 'Response 2',
        message_type: 'rag',
      },
      {
        id: '3',
        session_id: 'session-2',
        message: 'Message 3',
        response: 'Response 3',
        message_type: 'chatbot',
      },
    ];

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockChatLogs });

    const request = new NextRequest('http://localhost/api/admin/chat-logs');
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.stats.total_sessions).toBe(2);
    expect(data.data.stats.total_messages).toBe(3);
    expect(data.data.stats.message_types.rag).toBe(2);
    expect(data.data.stats.message_types.chatbot).toBe(1);
    expect(data.data.stats.avg_messages_per_session).toBe(1.5);
  });

  it('should apply pagination correctly', async () => {
    const mockChatLogs = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      session_id: 'session-1',
      message: `Message ${i}`,
      response: `Response ${i}`,
      message_type: 'rag',
      created_at: `2026-01-${i + 1}T10:00:00Z`,
    }));

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockChatLogs });

    const request = new NextRequest(
      'http://localhost/api/admin/chat-logs?limit=3&offset=2'
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.chat_logs).toHaveLength(3);
    expect(data.data.offset).toBe(2);
    expect(data.data.limit).toBe(3);
  });

  it('should sort in descending order by default', async () => {
    const mockChatLogs = [
      { id: '1', created_at: '2026-01-01T10:00:00Z' },
      { id: '2', created_at: '2026-01-02T10:00:00Z' },
    ];

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.queryTable = jest.fn().mockResolvedValue({ rows: mockChatLogs });

    const request = new NextRequest('http://localhost/api/admin/chat-logs');
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.chat_logs[0].id).toBe('2'); // Most recent first
  });
});

describe('POST /api/admin/chat-logs', () => {
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

    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
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
      session_id: 'session-123',
      // Missing message, response, message_type
    };

    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
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

  it('should return 400 for invalid message_type', async () => {
    const invalidData = {
      session_id: 'session-123',
      message: 'Test message',
      response: 'Test response',
      message_type: 'invalid-type',
    };

    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation Error');
    expect(data.details).toContain('Message type must be either "rag" or "chatbot"');
  });

  it('should create chat log with valid data', async () => {
    const validData = {
      session_id: 'session-abc123',
      message: 'How does RAG work?',
      response: 'RAG combines retrieval with generation...',
      message_type: 'rag' as const,
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({
      rows: [{ id: 'log-456' }],
    });

    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
      method: 'POST',
      body: JSON.stringify(validData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.id).toBe('log-456');
    expect(data.data.session_id).toBe(validData.session_id);
    expect(data.data.message).toBe(validData.message);
    expect(mockZerodb.insertTable).toHaveBeenCalledWith(
      'chat_logs',
      expect.objectContaining({
        session_id: validData.session_id,
        message: validData.message,
        response: validData.response,
        message_type: validData.message_type,
      })
    );
  });

  it('should sanitize input to prevent XSS', async () => {
    const dataWithXSS = {
      session_id: 'session-xss',
      message: 'Test <script>alert("xss")</script>',
      response: 'Response <img src=x onerror=alert(1)>',
      message_type: 'chatbot' as const,
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
      method: 'POST',
      body: JSON.stringify(dataWithXSS),
    });
    await POST(request);

    const insertCall = mockZerodb.insertTable.mock.calls[0][1];
    expect(insertCall.message).not.toContain('<script>');
    expect(insertCall.response).not.toContain('<img');
  });

  it('should accept chatbot message_type', async () => {
    const validData = {
      session_id: 'session-chatbot',
      message: 'Hello chatbot',
      response: 'Hello! How can I help you?',
      message_type: 'chatbot' as const,
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
      method: 'POST',
      body: JSON.stringify(validData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.data.message_type).toBe('chatbot');
  });

  it('should add created_at timestamp', async () => {
    const validData = {
      session_id: 'session-timestamp',
      message: 'Test',
      response: 'Test response',
      message_type: 'rag' as const,
    };

    const mockZerodb = zerodbModule.zerodb as any;
    mockZerodb.insertTable = jest.fn().mockResolvedValue({ rows: [{ id: '1' }] });

    const request = new NextRequest('http://localhost/api/admin/chat-logs', {
      method: 'POST',
      body: JSON.stringify(validData),
    });
    const response = await POST(request);
    const data = await response.json();

    expect(data.data.created_at).toBeDefined();
    expect(new Date(data.data.created_at).getTime()).toBeLessThanOrEqual(Date.now());
  });
});
