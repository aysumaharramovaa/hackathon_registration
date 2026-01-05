import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fileBase64, fileName } = req.body;

    const filePath = `files/${fileName}`;
    const fileBuffer = Buffer.from(fileBase64, 'base64');

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filePath, fileBuffer, { upsert: true });

    if (error) return res.status(500).json({ error: error.message });
    const { data: publicData } = supabase.storage.from('uploads').getPublicUrl(filePath);

    res.status(200).json({ url: publicData.publicUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Xəta baş verdi' });
  }
}
