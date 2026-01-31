import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * AINative Authentication Login Endpoint
 *
 * Authenticates users against the AINative API and sets a secure HTTP-only cookie
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Authenticate with AINative API
    const apiUrl = process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio';

    try {
      const authResponse = await axios.post(
        `${apiUrl}/v1/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      // Get the access token from the response
      const { access_token, token_type = 'Bearer', expires_in } = authResponse.data;

      if (!access_token) {
        return NextResponse.json(
          { error: 'Authentication failed - no token received' },
          { status: 401 }
        );
      }

      // Create response with success message
      const response = NextResponse.json(
        {
          success: true,
          message: 'Authentication successful',
          user: { username },
        },
        { status: 200 }
      );

      // Set HTTP-only cookie with the auth token
      const maxAge = expires_in || 7 * 24 * 60 * 60; // Default 7 days if not specified

      response.cookies.set('ainative_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge,
        path: '/',
      });

      return response;

    } catch (authError: any) {
      console.error('AINative auth error:', authError.response?.data || authError.message);

      // Handle authentication errors
      if (authError.response?.status === 401 || authError.response?.status === 403) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // If AINative API is unavailable, fall back to env variable check
      // This allows local development to work without the API
      const envUsername = process.env.ZERODB_USERNAME || process.env.AINATIVE_USERNAME;
      const envPassword = process.env.ZERODB_PASSWORD || process.env.AINATIVE_PASSWORD;
      const envToken = process.env.ZERODB_API_TOKEN || process.env.AINATIVE_API_TOKEN;

      if (username === envUsername && password === envPassword && envToken) {
        console.log('Using fallback authentication with environment variables');

        const response = NextResponse.json(
          {
            success: true,
            message: 'Authentication successful (fallback mode)',
            user: { username },
          },
          { status: 200 }
        );

        response.cookies.set('ainative_token', envToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/',
        });

        return response;
      }

      return NextResponse.json(
        { error: 'Authentication service unavailable' },
        { status: 503 }
      );
    }

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
