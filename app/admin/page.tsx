'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Member = {
  name: string;
  email: string;
  phone: string;
};

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
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRegistrations = async () => {
    setLoading(true);
    let query = supabase.from('registrations').select('*').order('created_at', { ascending: false });
    const { data, error } = await query;

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setRegistrations(data as Registration[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filtered = registrations.filter((r) =>
    r.team_name.toLowerCase().includes(search.toLowerCase()) ||
    (r.member_1_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (r.member_2_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (r.member_3_name?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', background: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Panel - Hackathon Qeydiyyatları</h1>

      <input
        placeholder="Search by Team or Member"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #1e293b',
          marginBottom: '20px',
          background: '#020617',
          color: '#fff',
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Team Name</th>
              <th style={thStyle}>Members</th>
              <th style={thStyle}>Solution</th>
              <th style={thStyle}>File</th>
              <th style={thStyle}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={tdStyle}>{r.id}</td>
                <td style={tdStyle}>{r.team_name}</td>
                <td style={tdStyle}>
                  {r.member_1_name && (
                    <div>{r.member_1_name} ({r.member_1_email}, {r.member_1_phone})</div>
                  )}
                  {r.member_2_name && (
                    <div>{r.member_2_name} ({r.member_2_email}, {r.member_2_phone})</div>
                  )}
                  {r.member_3_name && (
                    <div>{r.member_3_name} ({r.member_3_email}, {r.member_3_phone})</div>
                  )}
                </td>
                <td style={tdStyle}>
                  <strong>{r.solution_name}</strong>
                  <p>{r.solution_desc}</p>
                </td>
                <td style={tdStyle}>
                  {r.file_url ? <a href={r.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e' }}>View File</a> : 'No File'}
                </td>
                <td style={tdStyle}>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #1e293b',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
};
