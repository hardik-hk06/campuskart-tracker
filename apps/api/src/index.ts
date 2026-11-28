
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check API
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "CampusKart API is running!",
  });
});

// Start server only after DB connection
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`CampusKart API running on port ${PORT}`);
  });
}

startServer();
