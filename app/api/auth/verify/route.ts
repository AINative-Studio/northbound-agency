import { NextRequest, NextResponse } from 'next/server';

/**
 * Verify AINative Authentication Token
 *
 * Checks if the user has a valid ainative_token cookie
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('ainative_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In production, verify token against AINative API
    // For now, if token exists, consider user authenticated

    // You could optionally verify the token by calling AINative API:
    // const apiUrl = process.env.NEXT_PUBLIC_AINATIVE_API_URL || 'https://api.ainative.studio';
    // const verifyResponse = await fetch(`${apiUrl}/v1/auth/verify`, {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });

    return NextResponse.json({
      success: true,
      user: {
        // In production, get actual user data from AINative API
        username: 'Reseller',
        authenticated: true,
      },
    });

  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
