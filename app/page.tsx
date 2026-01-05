'use client';

import { useState } from 'react';

export default function Home() {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');

  const submit = async () => {
    if (!name || !email || !teamName) {
      alert('Bütün sahələri doldurun');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        team_name: teamName,
      }),
    });

    if (res.ok) {
      setSuccess(true);
      setName('');
      setEmail('');
      setTeamName('');
    } else {
      alert('Xəta baş verdi');
    }
  };

  return (
    <div style={{ background: '#0f172a', color: '#fff', fontFamily: 'sans-serif', minHeight: '100vh' }}>
 
      {success && (
        <div style={{
          background: 'linear-gradient(90deg,#22c55e,#16a34a)',
          padding: '16px',
          textAlign: 'center',
          fontWeight: '600',
        }}>
          🎉 Qeydiyyat uğurla tamamlandı! Hackathonda görüşərik 🚀
        </div>
      )}


      <section style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '46px', marginBottom: '20px' }}>🚀 FinTech Hackathon 2026</h1>
        <p style={{ fontSize: '18px', color: '#cbd5f5', maxWidth: '600px', margin: '0 auto 30px' }}>
          Gələcəyin maliyyə texnologiyalarını yarat, komandanla yarış,
          mentorlarla tanış ol və real problemləri həll et.
        </p>
        <p style={{ fontSize: '14px', color: '#94a3b8' }}>
          Form aşağıdadır, doldur və qeydiyyatı tamamla 👇
        </p>
      </section>

      <section style={{
        background: '#020617',
        padding: '80px 20px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Hackathon Qeydiyyatı</h2>
          
          <input
            placeholder="Ad Soyad"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Komanda adı"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={submit}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '14px',
              background: 'linear-gradient(90deg,#22c55e,#16a34a)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Qeydiyyatı tamamla
          </button>
        </div>
      </section>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '14px',
  borderRadius: '8px',
  border: '1px solid #1e293b',
  background: '#020617',
  color: '#fff',
};
