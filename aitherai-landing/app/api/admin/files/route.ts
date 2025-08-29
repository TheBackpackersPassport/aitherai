import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dir = path.join(process.cwd(), 'private-html');
    let files: string[] = [];
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      files = entries
        .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.html'))
        .map((e) => e.name.replace(/\.html$/i, ''));
    } catch {
      // If directory missing, return empty list to avoid server error
      files = [];
    }

    return NextResponse.json({ files });
  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
