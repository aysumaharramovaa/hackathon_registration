const { Client } = require("pg");

module.exports = async (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const teams = await client.query(
      "SELECT * FROM teams ORDER BY created_at DESC"
    );

    for (let team of teams.rows) {
      const members = await client.query(
        "SELECT * FROM members WHERE team_id=$1",
        [team.id]
      );
      team.members = members.rows;
    }

    await client.end();
    res.status(200).json(teams.rows);

  } catch (err) {
    console.error("APPLICATIONS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
