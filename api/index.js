const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/api", (req, res) => {
  res.send("Hackathon backend working 🚀");
});

// müraciət əlavə etmək
app.post("/api/register", async (req, res) => {
  try {
    const { fullname, email, phone, idea } = req.body;
    if (!fullname || !email || !phone || !idea)
      return res.status(400).json({ error: "All fields required" });

    await pool.query(
      "INSERT INTO applications(fullname, email, phone, idea) VALUES($1,$2,$3,$4)",
      [fullname, email, phone, idea]
    );

    res.json({ message: "Application submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("A server error occurred");
  }
});

//bütün müraciətləri gətir
app.get("/api/applications", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM applications ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("A server error occurred");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
