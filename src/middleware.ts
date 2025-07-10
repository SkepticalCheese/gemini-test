import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

// An array of routes that should be protected.
const protectedRoutes = ['/welcome'];

export async function middleware(req: NextRequest) {

export const config = {
  matcher: '/welcome',
};
