import { NextResponse } from 'next/server';

/**
 * AINative Authentication Logout Endpoint
 *
 * Clears the authentication cookie
 */
export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );

  // Clear the auth cookie
  response.cookies.delete('ainative_token');

  return response;
}
