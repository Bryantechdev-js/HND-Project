import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const response =  NextResponse.json({ message: 'Logout successful' });

  // Clear session token cookie
   response.cookies.set('sessionToken', '', {
    expires: new Date(0),
    path: '/',
  });

  return response;
}
