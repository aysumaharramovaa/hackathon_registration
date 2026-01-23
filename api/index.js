import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRouter from "./routes/register.js";
import applicationsRouter from "./routes/applications.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/register", registerRouter);
app.use("/api/applications", applicationsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Hackathon Backend Working 🚀 on port ${PORT}`));
