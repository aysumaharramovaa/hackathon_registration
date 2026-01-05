import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { fileBase64, fileName } = await req.json();

    const filePath = `files/${fileName}`;
    const fileBuffer = Buffer.from(fileBase64, 'base64');

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filePath, fileBuffer, { upsert: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data: publicData } = supabase.storage.from('uploads').getPublicUrl(filePath);

    return NextResponse.json({ url: publicData.publicUrl });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Xəta baş verdi' }, { status: 500 });
  }
}
