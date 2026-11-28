
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import Vehicle from "./models/Vehicle";

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


 // Get all vehicles
app.get("/api/vehicles", async (_req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
    });
  }
});

// Add a vehicle
app.post("/api/vehicles", async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create vehicle",
    });
  }
});


// Start server only after DB connection
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`CampusKart API running on port ${PORT}`);
  });
}

startServer();
