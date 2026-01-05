// app/api/register/route.ts
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { team_name, members, solution_name, solution_desc, file_url } = await req.json();

    const data = {
      team_name,
      member_1_name: members[0]?.name || null,
      member_1_email: members[0]?.email || null,
      member_1_phone: members[0]?.phone || null,
      member_2_name: members[1]?.name || null,
      member_2_email: members[1]?.email || null,
      member_2_phone: members[1]?.phone || null,
      member_3_name: members[2]?.name || null,
      member_3_email: members[2]?.email || null,
      member_3_phone: members[2]?.phone || null,
      solution_name,
      solution_desc,
      file_url: file_url || null,
    };

    const { error } = await supabase.from('registrations').insert([data]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: 'Qeydiyyat uğurla tamamlandı!' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Xəta baş verdi' }, { status: 500 });
  }
}
