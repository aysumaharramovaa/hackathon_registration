import { supabase } from '@/lib/supabase';

export async function POST(req) {
  const body = await req.json();

  const { name, email, team_name } = body;

  const { error } = await supabase
    .from('registrations')
    .insert([{ name, email, team_name }]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
