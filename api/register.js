import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const router = express.Router();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { team, idea, ...members } = req.body;

  if(!team || !idea) return res.status(400).json({error:"Team and Idea required"});

  try{
    const client = await pool.connect();
    const teamResult = await client.query(
      "INSERT INTO teams(team_name, idea) VALUES($1,$2) RETURNING id",
      [team, idea]
    );
    const teamId = teamResult.rows[0].id;

    // Insert members dynamically
    for(let i=1;i<=3;i++){
      if(members[`member${i}_name`]){
        await client.query(
          `INSERT INTO members(team_id,name,email,phone,group_name) VALUES($1,$2,$3,$4,$5)`,
          [
            teamId,
            members[`member${i}_name`],
            members[`member${i}_email`],
            members[`member${i}_phone`],
            members[`member${i}_group`]
          ]
        );
      }
    }
    client.release();
    res.json({message:"Application submitted successfully!"});
  }catch(err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

export default router;
