import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/lib/session';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  _req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const safeName = params.name.replace(/[^a-zA-Z0-9-_]/g, '');
    const filePath = path.join(process.cwd(), 'private-html', `${safeName}.html`);

    try {
      const html = await fs.readFile(filePath, 'utf8');
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (e) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Serve file error:', error);
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
  }
}
