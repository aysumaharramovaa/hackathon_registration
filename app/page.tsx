"use client";

import { useState, ChangeEvent } from "react";

type Member = {
  name: string;
  email: string;
  phone: string;
};

export default function HackathonForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { name: "", email: "", phone: "" },
  ]);
  const [solutionName, setSolutionName] = useState("");
  const [solutionDesc, setSolutionDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string
  ) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addMember = () => {
    if (members.length < 3)
      setMembers([...members, { name: "", email: "", phone: "" }]);
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    else setFile(null);
  };

  const resetForm = () => {
    setSuccess(true);
    setTeamName("");
    setMembers([{ name: "", email: "", phone: "" }]);
    setSolutionName("");
    setSolutionDesc("");
    setFile(null);
    setLoading(false);
    setTimeout(() => setSuccess(false), 5000);
  };

  const submit = async () => {
    if (!teamName || !solutionName || !solutionDesc) {
      alert("Bütün sahələr doldurulmalıdır");
      return;
    }

    setLoading(true);

    const data: any = {
      team_name: teamName,
      members,
      solution_name: solutionName,
      solution_desc: solutionDesc,
    };

    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (!reader.result) {
            setLoading(false);
            return alert("Fayl oxunmadı!");
          }
          const base64 = reader.result.toString().split(",")[1];
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileBase64: base64, fileName: file.name }),
          });
          const { url } = await uploadRes.json();
          data.file_url = url;

          const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (res.ok) resetForm();
          else {
            alert("Xəta baş verdi");
            setLoading(false);
          }
        };
        reader.readAsDataURL(file);
      } else {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) resetForm();
        else {
          alert("Xəta baş verdi");
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      alert("Gözlənilməz xəta baş verdi");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        color: "#fff",
        background: "#0f172a",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      {success && (
        <div
          style={{
            background: "linear-gradient(90deg,#22c55e,#16a34a)",
            padding: "16px",
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          🎉 Qeydiyyat uğurla tamamlandı! Hackathonda görüşərik 🚀
        </div>
      )}

      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        Hackathon Qeydiyyatı
      </h1>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <input
          placeholder="Komanda adı"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          style={inputStyle}
        />

        <h3 style={{ marginTop: "20px" }}>Komanda üzvləri</h3>
        {members.map((member, index) => (
          <div
            key={index}
            style={{
              marginBottom: "12px",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <input
              placeholder={`Üzv ${index + 1} Ad Soyad`}
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              style={inputStyle}
            />
            <input
              placeholder={`Üzv ${index + 1} Email`}
              value={member.email}
              onChange={(e) =>
                handleMemberChange(index, "email", e.target.value)
              }
              style={inputStyle}
            />
            <input
              placeholder={`Üzv ${index + 1} Telefon`}
              value={member.phone}
              onChange={(e) =>
                handleMemberChange(index, "phone", e.target.value)
              }
              style={inputStyle}
            />
          </div>
        ))}
        {members.length < 3 && (
          <button onClick={addMember} style={smallButtonStyle}>
            + Üzv əlavə et
          </button>
        )}

        <input
          placeholder="Hansı FinTech həllini təqdim edirsiniz"
          value={solutionName}
          onChange={(e) => setSolutionName(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="FinTech həlliniz haqqında izzah (max 5 cümlə)"
          value={solutionDesc}
          onChange={(e) => setSolutionDesc(e.target.value)}
          style={{ ...inputStyle, height: "100px", resize: "none" }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: "12px", color: "#fff" }}
        />

        <button onClick={submit} style={submitButtonStyle} disabled={loading}>
          {loading ? "Göndərilir..." : "Qeydiyyatı tamamla"}
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "8px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#fff",
};
const smallButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#6366f1",
  cursor: "pointer",
  color: "#fff",
};
const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
  cursor: "pointer",
  color: "#fff",
};

