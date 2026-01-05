import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileBase64, fileName } = req.body;

    const { data, error } = await supabase.storage
      .from('uploads') // Supabase bucket adı
      .upload(`files/${fileName}`, Buffer.from(fileBase64, 'base64'), {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) return res.status(500).json({ error: error.message });

    const { publicUrl } = supabase.storage.from('uploads').getPublicUrl(data.path);

    res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Xəta baş verdi' });
  }
}
