"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    university: "",
    teamName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Qeydiyyat uğurlu oldu 🎉");
      setForm({ fullName: "", email: "", university: "", teamName: "" });
    } else {
      const data = await res.json();
      alert(data.message || "Xəta baş verdi");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Hackathon Qeydiyyat</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Ad Soyad"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="university"
          placeholder="Universitet"
          value={form.university}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="teamName"
          placeholder="Komanda adı (istəyə bağlı)"
          value={form.teamName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Qeydiyyat
        </button>
      </form>
    </div>
  );
}
