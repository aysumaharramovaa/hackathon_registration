'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Registration = {
  id: number;
  team_name: string;
  member_1_name: string | null;
  member_1_email: string | null;
  member_1_phone: string | null;
  member_2_name: string | null;
  member_2_email: string | null;
  member_2_phone: string | null;
  member_3_name: string | null;
  member_3_email: string | null;
  member_3_phone: string | null;
  solution_name: string;
  solution_desc: string;
  file_url: string | null;
  created_at: string;
};

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Login check
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthorized(true);
        fetchRegistrations();
      } else {
        alert('Səhv şifrə!');
      }
    } catch (err) {
      alert('Xətaaaaaaa');
    }
  };

  // Fetch registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    setRegistrations(data as Registration[]);
    setLoading(false);
  };

  const filtered = registrations.filter((r) =>
    r.team_name.toLowerCase().includes(search.toLowerCase()) ||
    (r.member_1_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (r.member_2_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (r.member_3_name?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  // Password form
  if (!authorized) {
    return (
      <div
        style={{
          fontFamily: 'sans-serif',
          background: '#0f172a',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ background: '#1e293b', padding: '32px', borderRadius: '12px' }}>
          <h2 style={{ color: '#fff', marginBottom: '16px' }}>Admin Girişi</h2>
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
              borderRadius: '8px',
              border: '1px solid #334155',
              background: '#020617',
              color: '#fff',
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#6366f1',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Giriş
          </button>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0f172a', minHeight: '100vh', padding: '40px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Qeydiyyatlar</h1>
        <input
          placeholder="Axtar (Komanda və ya Üzv)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#fff',
            width: '300px',
          }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#1e293b', borderRadius: '12px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '16px' }}>Komanda</th>
              <th style={{ padding: '16px' }}>Üzvlər</th>
              <th style={{ padding: '16px' }}>Həll</th>
              <th style={{ padding: '16px' }}>Fayl</th>
              <th style={{ padding: '16px' }}>Tarix</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '16px' }}>{r.team_name}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontSize: '14px' }}>
                    {r.member_1_name} ({r.member_1_email})
                    {r.member_2_name && (
                      <>
                        <br />
                        {r.member_2_name} ({r.member_2_email})
                      </>
                    )}
                    {r.member_3_name && (
                      <>
                        <br />
                        {r.member_3_name} ({r.member_3_email})
                      </>
                    )}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <strong>{r.solution_name}</strong>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{r.solution_desc}</p>
                </td>
                <td style={{ padding: '16px' }}>
                  {r.file_url ? (
                    <a href={r.file_url} target="_blank" style={{ color: '#6366f1' }}>
                      Bax
                    </a>
                  ) : (
                    'Yoxdur'
                  )}
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
