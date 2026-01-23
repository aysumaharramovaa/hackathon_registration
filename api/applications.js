import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get("/", async (req, res) => {
  try{
    const client = await pool.connect();
    const result = await client.query(
      `SELECT t.id as team_id, t.team_name, t.idea, t.created_at, 
      m.id as member_id, m.name, m.email, m.phone, m.group_name
      FROM teams t
      LEFT JOIN members m ON m.team_id = t.id
      ORDER BY t.id, m.id`
    );
    client.release();
    
    // Group members by team
    const teams = {};
    result.rows.forEach(r=>{
      if(!teams[r.team_id]){
        teams[r.team_id] = { team_name:r.team_name, idea:r.idea, created_at:r.created_at, members:[] };
      }
      if(r.member_id){
        teams[r.team_id].members.push({
          name:r.name,
          email:r.email,
          phone:r.phone,
          group:r.group_name
        });
      }
    });
    res.json(Object.values(teams));
  }catch(err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

export default router;
