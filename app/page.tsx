'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');

  const submit = async () => {
    if (!name || !email || !teamName) {
      alert('Bütün sahələri doldur');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        team_name: teamName,
      }),
    });

    if (res.ok) {
      alert('Qeydiyyat uğurludur!');
      setName('');
      setEmail('');
      setTeamName('');
    } else {
      alert('Xəta baş verdi');
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Hackathon Qeydiyyat</h1>

      <input
        placeholder="Ad"
        value={name}
        onChange={(x) => setName(x.target.value)}
      />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(x) => setEmail(x.target.value)}
      />
      <br />

      <input
        placeholder="Team adı"
        value={teamName}
        onChange={(x) => setTeamName(x.target.value)}
      />
      <br />

      <button onClick={submit}>Göndər</button>
    </main>
  );
}
