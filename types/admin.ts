/**
 * Admin API Types and Validation Schemas
 *
 * This file contains TypeScript types and validation schemas for all admin API endpoints.
 * These types ensure type safety and provide runtime validation for incoming requests.
 */

// Case Study Types
export interface CaseStudy {
  id?: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  tech_stack: string[];
  ai_used: string;
  outcome: string;
  image_url?: string;
  published: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCaseStudyRequest {
  title: string;
  client: string;
  problem: string;
  solution: string;
  tech_stack: string[];
  ai_used: string;
  outcome: string;
  image_url?: string;
  published?: boolean;
  order_index?: number;
}

// Contact Submission Types
export interface ContactSubmission {
  id?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  project_type: string;
  description: string;
  status?: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  created_at?: string;
}

export interface CreateContactSubmissionRequest {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  project_type: string;
  description: string;
  status?: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
}

// Chat Log Types
export interface ChatLog {
  id?: string;
  session_id: string;
  message: string;
  response: string;
  message_type: 'rag' | 'chatbot';
  created_at?: string;
}

export interface CreateChatLogRequest {
  session_id: string;
  message: string;
  response: string;
  message_type: 'rag' | 'chatbot';
}

// API Response Types
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  details?: any;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Query Parameters
export interface AdminQueryParams {
  limit?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  filter?: Record<string, any>;
}

// Validation Functions
export function validateCaseStudy(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (!data.client || typeof data.client !== 'string' || data.client.trim().length === 0) {
    errors.push('Client is required and must be a non-empty string');
  }

  if (!data.problem || typeof data.problem !== 'string' || data.problem.trim().length === 0) {
    errors.push('Problem is required and must be a non-empty string');
  }

  if (!data.solution || typeof data.solution !== 'string' || data.solution.trim().length === 0) {
    errors.push('Solution is required and must be a non-empty string');
  }

  if (!data.ai_used || typeof data.ai_used !== 'string' || data.ai_used.trim().length === 0) {
    errors.push('AI Used is required and must be a non-empty string');
  }

  if (!data.outcome || typeof data.outcome !== 'string' || data.outcome.trim().length === 0) {
    errors.push('Outcome is required and must be a non-empty string');
  }

  if (!Array.isArray(data.tech_stack)) {
    errors.push('Tech stack must be an array');
  } else if (data.tech_stack.length === 0) {
    errors.push('Tech stack must contain at least one technology');
  }

  if (data.published !== undefined && typeof data.published !== 'boolean') {
    errors.push('Published must be a boolean');
  }

  if (data.order_index !== undefined && (typeof data.order_index !== 'number' || data.order_index < 0)) {
    errors.push('Order index must be a non-negative number');
  }

  if (data.image_url !== undefined && typeof data.image_url !== 'string') {
    errors.push('Image URL must be a string');
  }

  return { valid: errors.length === 0, errors };
}

export function validateContactSubmission(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.project_type || typeof data.project_type !== 'string' || data.project_type.trim().length === 0) {
    errors.push('Project type is required and must be a non-empty string');
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  }

  if (data.company !== undefined && typeof data.company !== 'string') {
    errors.push('Company must be a string');
  }

  if (data.phone !== undefined && typeof data.phone !== 'string') {
    errors.push('Phone must be a string');
  }

  if (data.status !== undefined) {
    const validStatuses = ['new', 'contacted', 'in_progress', 'completed', 'archived'];
    if (!validStatuses.includes(data.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateChatLog(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.session_id || typeof data.session_id !== 'string' || data.session_id.trim().length === 0) {
    errors.push('Session ID is required and must be a non-empty string');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required and must be a non-empty string');
  }

  if (!data.response || typeof data.response !== 'string' || data.response.trim().length === 0) {
    errors.push('Response is required and must be a non-empty string');
  }

  if (!data.message_type || !['rag', 'chatbot'].includes(data.message_type)) {
    errors.push('Message type must be either "rag" or "chatbot"');
  }

  return { valid: errors.length === 0, errors };
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitization functions to prevent XSS and injection attacks
export function sanitizeString(value: string): string {
  return value.trim().replace(/[<>]/g, '');
}

export function sanitizeCaseStudy(data: CreateCaseStudyRequest): CreateCaseStudyRequest {
  return {
    ...data,
    title: sanitizeString(data.title),
    client: sanitizeString(data.client),
    problem: sanitizeString(data.problem),
    solution: sanitizeString(data.solution),
    ai_used: sanitizeString(data.ai_used),
    outcome: sanitizeString(data.outcome),
    tech_stack: data.tech_stack.map(tech => sanitizeString(tech)),
    image_url: data.image_url ? sanitizeString(data.image_url) : undefined,
  };
}

export function sanitizeContactSubmission(data: CreateContactSubmissionRequest): CreateContactSubmissionRequest {
  return {
    ...data,
    name: sanitizeString(data.name),
    email: sanitizeString(data.email),
    project_type: sanitizeString(data.project_type),
    description: sanitizeString(data.description),
    company: data.company ? sanitizeString(data.company) : undefined,
    phone: data.phone ? sanitizeString(data.phone) : undefined,
  };
}

export function sanitizeChatLog(data: CreateChatLogRequest): CreateChatLogRequest {
  return {
    ...data,
    session_id: sanitizeString(data.session_id),
    message: sanitizeString(data.message),
    response: sanitizeString(data.response),
  };
}
