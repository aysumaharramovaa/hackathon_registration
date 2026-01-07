import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            return NextResponse.json({ error: 'not configureed' }, { status: 500 });
        }

        if (password === adminPassword) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'invalid password' }, { status: 401 });
        }
    } catch (err) {
        return NextResponse.json({ error: 'server error' }, { status: 500 });
    }
}
