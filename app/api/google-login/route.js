// app/api/login/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('http://localhost:5000/auth/google');
}
