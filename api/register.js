import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  try {
    const body = req.body;

    const team_name = body.team;
    const idea = body.idea;

    if (!team_name || !idea)
      return res.status(400).json({ error: "Missing team name or idea" });

    const teamInsert = await pool.query(
      "INSERT INTO teams (team_name, idea) VALUES ($1,$2) RETURNING id",
      [team_name, idea]
    );

    const teamId = teamInsert.rows[0].id;

    for (let i = 1; i <= 3; i++) {
      if (body[`member${i}_name`]) {
        await pool.query(
          "INSERT INTO members (team_id,name,email,phone,group_name) VALUES ($1,$2,$3,$4,$5)",
          [
            teamId,
            body[`member${i}_name`],
            body[`member${i}_email`],
            body[`member${i}_phone`],
            body[`member${i}_group`],
          ]
        );
      }
    }

    res.status(200).json({ message: "Application saved!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
