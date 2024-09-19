// src/utils/auth.ts

// import { NextResponse } from 'next/server';
import supabase from '@/utils/supabaseClient';

export async function extractAndSetSession(request: Request) {
  const cookies = request.headers.get('Cookie');
  if (!cookies) {
    return { error: 'No cookies found', status: 401 };
  }

  const cookieMap = new Map(
    cookies.split('; ').map(cookie => {
      const [key, value] = cookie.split('=');
      return [key, value];
    })
  );

  const accessToken = cookieMap.get('access_token') as string;
  const refreshToken = cookieMap.get('refresh_token') as string;

  if (!accessToken || !refreshToken) {
    return { error: 'Missing access or refresh token', status: 401 };
  }

  const { data: session, error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (sessionError) {
    console.error('Error setting session:', sessionError);
    return { error: 'Error setting session', status: 401 };
  }

  return { session, status: 200 };
}