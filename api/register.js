const { Client } = require("pg");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const { team, idea, ...members } = req.body;

  try {
    await client.connect();

    const teamResult = await client.query(
      "INSERT INTO teams (team_name, idea) VALUES ($1,$2) RETURNING id",
      [team, idea]
    );

    const teamId = teamResult.rows[0].id;

    for (let i = 1; i <= 3; i++) {
      if (members[`member${i}_name`]) {
        await client.query(
          `INSERT INTO members (team_id,name,email,phone,group_name)
           VALUES ($1,$2,$3,$4,$5)`,
          [
            teamId,
            members[`member${i}_name`],
            members[`member${i}_email`],
            members[`member${i}_phone`],
            members[`member${i}_group`],
          ]
        );
      }
    }

    await client.end();
    res.status(200).json({ message: "Application submitted!" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
