import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  try {
    const teams = await pool.query("SELECT * FROM teams ORDER BY created_at DESC");

    for (let team of teams.rows) {
      const members = await pool.query(
        "SELECT * FROM members WHERE team_id=$1",
        [team.id]
      );
      team.members = members.rows;
    }

    res.status(200).json(teams.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
