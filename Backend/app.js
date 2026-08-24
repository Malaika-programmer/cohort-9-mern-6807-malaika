import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";

import authRoutes from "./src/routes/auth.routes.js";

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pino request logger
app.use(pinoHttp());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Note App API is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Handle routes that do not exist
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Something went wrong",
  });
});

export default app;