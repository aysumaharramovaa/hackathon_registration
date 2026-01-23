const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  
  }
});
app.post("/api/register", async (req, res) => {
  const { fullname, email, phone, idea } = req.body;
  if (!fullname || !email || !phone || !idea) {
    return res.status(400).json({ error: "All fields required" });
  }

  await pool.query(
    "INSERT INTO applications(fullname, email, phone, idea) VALUES($1,$2,$3,$4)",
    [fullname, email, phone, idea]
  );

  res.json({ message: "Application submitted" });
});

app.get("/api/applications", async (req, res) => {
  const result = await pool.query("SELECT * FROM applications ORDER BY id DESC");
  res.json(result.rows);
});
