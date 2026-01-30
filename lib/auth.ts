/**
 * Authentication Utilities for Protected API Routes
 *
 * This module provides authentication helper functions for protecting admin API routes.
 * It validates the presence and validity of authentication tokens from cookies or headers.
 *
 * Authentication Methods Supported:
 * 1. Cookie-based: ainative_token cookie (preferred for web apps)
 * 2. Header-based: Authorization: Bearer <token> (for API clients)
 */

import { NextRequest } from 'next/server';
import axios from 'axios';

/**
 * Authentication result containing user info or error
 */
export interface AuthResult {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
    role?: string;
  };
  error?: string;
}

/**
 * Extracts authentication token from request
 *
 * Checks multiple sources in order of priority:
 * 1. ainative_token cookie
 * 2. Authorization header (Bearer token)
 * 3. x-api-key header
 *
 * @param request - Next.js request object
 * @returns Token string or null if not found
 */
export function extractAuthToken(request: NextRequest): string | null {
  // 1. Check for cookie (preferred for web apps)
  const cookieToken = request.cookies.get('ainative_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // 2. Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // 3. Check X-API-Key header (alternative auth method)
  const apiKeyHeader = request.headers.get('x-api-key');
  if (apiKeyHeader) {
    return apiKeyHeader;
  }

  return null;
}

/**
 * Verifies authentication token with AINative API
 *
 * Calls the AINative auth verification endpoint to validate the token
 * and retrieve user information. This ensures the token is valid and not expired.
 *
 * @param token - Authentication token to verify
 * @returns AuthResult with user info if valid, or error if invalid
 */
export async function verifyAuthToken(token: string): Promise<AuthResult> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio';

    // Determine auth method based on token format
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token.startsWith('eyJ')) {
      // JWT token
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      // API key
      headers['X-API-Key'] = token;
    }

    // Verify token with AINative admin auth endpoint
    const response = await axios.get(`${apiUrl}/v1/admin/auth/me`, {
      headers,
      timeout: 5000, // 5 second timeout for auth verification
    });

    if (response.status === 200 && response.data) {
      return {
        authenticated: true,
        user: {
          id: response.data.id || response.data.user_id || 'admin',
          email: response.data.email || 'admin@ainative.studio',
          role: response.data.role || 'admin',
        },
      };
    }

    return {
      authenticated: false,
      error: 'Invalid authentication response',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        return {
          authenticated: false,
          error: 'Invalid or expired authentication token',
        };
      }

      if (status === 403) {
        return {
          authenticated: false,
          error: 'Insufficient permissions',
        };
      }

      return {
        authenticated: false,
        error: error.response?.data?.detail || 'Authentication verification failed',
      };
    }

    console.error('Auth verification error:', error);
    return {
      authenticated: false,
      error: 'Internal authentication error',
    };
  }
}

/**
 * Authenticates incoming API request
 *
 * This is the main authentication function to be used in API route handlers.
 * It combines token extraction and verification in a single call.
 *
 * @param request - Next.js request object
 * @returns AuthResult with authentication status and user info
 *
 * @example
 * ```typescript
 * export async function GET(request: NextRequest) {
 *   const auth = await authenticateRequest(request);
 *   if (!auth.authenticated) {
 *     return NextResponse.json({ error: auth.error }, { status: 401 });
 *   }
 *   // Proceed with authenticated request
 * }
 * ```
 */
export async function authenticateRequest(request: NextRequest): Promise<AuthResult> {
  const token = extractAuthToken(request);

  if (!token) {
    return {
      authenticated: false,
      error: 'No authentication token provided',
    };
  }

  return await verifyAuthToken(token);
}

/**
 * Creates an unauthorized response
 *
 * Helper function to generate consistent 401 responses
 *
 * @param message - Optional error message
 * @returns JSON response with 401 status
 */
export function createUnauthorizedResponse(message: string = 'Unauthorized') {
  return {
    error: 'Unauthorized',
    message,
    success: false,
  };
}

/**
 * Creates a forbidden response
 *
 * Helper function to generate consistent 403 responses
 *
 * @param message - Optional error message
 * @returns JSON response with 403 status
 */
export function createForbiddenResponse(message: string = 'Forbidden') {
  return {
    error: 'Forbidden',
    message,
    success: false,
  };
}

/**
 * Rate limiting map to prevent brute force attacks
 * Maps IP address to array of request timestamps
 */
const rateLimitMap = new Map<string, number[]>();

/**
 * Simple rate limiting for authentication endpoints
 *
 * Limits the number of requests per IP address within a time window.
 * This helps prevent brute force attacks on authentication endpoints.
 *
 * @param request - Next.js request object
 * @param maxRequests - Maximum requests allowed (default: 100)
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @returns true if request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(
  request: NextRequest,
  maxRequests: number = 100,
  windowMs: number = 60000
): boolean {
  // Get client IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
             request.headers.get('x-real-ip') ||
             'unknown';

  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove timestamps outside the window
  const recentTimestamps = timestamps.filter(ts => now - ts < windowMs);

  if (recentTimestamps.length >= maxRequests) {
    return false;
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  // Cleanup old entries every 100 requests
  if (rateLimitMap.size > 1000) {
    const entries = Array.from(rateLimitMap.entries());
    for (const [key, values] of entries) {
      const recent = values.filter(ts => now - ts < windowMs);
      if (recent.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, recent);
      }
    }
  }

  return true;
}

/**
 * Validates admin role from auth result
 *
 * Checks if the authenticated user has admin privileges
 *
 * @param auth - AuthResult from authenticateRequest
 * @returns true if user is admin, false otherwise
 */
export function isAdmin(auth: AuthResult): boolean {
  if (!auth.authenticated || !auth.user) {
    return false;
  }

  // Check if user has admin role
  return auth.user.role === 'admin' || auth.user.email?.includes('admin@');
}
