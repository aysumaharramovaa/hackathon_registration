import { useState, useRef } from 'react';

export default function Home() {
  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('')

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0f172a', color: '#fff' }}>


      {success && (
        <div style={{
          background: 'linear-gradient(90deg,#22c55e,#16a34a)',
          padding: '16px',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          🎉 Qeydiyyat uğurla tamamlandı! Hackathonda görüşərik 🚀
        </div>
      )}

      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px'
      }}>
        <div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
            🚀 FinTech Hackathon 2026
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5f5', maxWidth: '600px', margin: '0 auto 30px' }}>
            Gələcəyin maliyyə həllərini yarat, komandanla yarış,
            mentorlarla tanış ol və real problemləri texnologiya ilə həll et.
          </p>
          <button
            onClick={() => formRef.current.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              background: 'linear-gradient(90deg,#6366f1,#4f46e5)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Qeydiyyatdan keç
          </button>
        </div>
      </section>


      <section
        ref={formRef}
        style={{
          background: '#020617',
          padding: '80px 20px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: '#020617',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '32px'
        }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
            Hackathon Qeydiyyatı
          </h2>

          <input
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Komanda adı"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
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
              color: '#022c22',
              cursor: 'pointer'
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
