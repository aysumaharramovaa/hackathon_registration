"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      alert("Qeydiyyat uğurla tamamlandı 🎉");

      setForm({
        name: "",
        email: "",
        university: "",
      });
    } catch (error) {
      alert("Xəta baş verdi ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Hackathon Qeydiyyatı</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ad Soyad"
          value={form.name}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="university"
          placeholder="Universitet"
          value={form.university}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "20px" }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Göndərilir..." : "Qeydiyyat"}
        </button>
      </form>
    </main>
  );
}
