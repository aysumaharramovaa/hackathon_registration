import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  const adminPass = req.headers["x-admin-password"];
  if (adminPass !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const teams = await pool.query("SELECT * FROM teams ORDER BY created_at DESC");
      for (let team of teams.rows) {
        const members = await pool.query("SELECT * FROM members WHERE team_id=$1", [team.id]);
        team.members = members.rows;
      }
      res.status(200).json(teams.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { teamId } = req.body;
      if (!teamId) return res.status(400).json({ error: "teamId is required" });

      await pool.query("DELETE FROM teams WHERE id=$1", [teamId]);
      res.status(200).json({ message: "Team deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
