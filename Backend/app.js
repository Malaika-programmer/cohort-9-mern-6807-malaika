import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";

import authRoutes from "./src/routes/auth.routes.js";
import notesRoutes from "./src/routes/notes.routes.js";
import tasksRoutes from "./src/routes/task.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";
import settingsRoutes from "./src/routes/settings.routes.js";

const app = express();

/*
 * Security & performance
 */
app.use(helmet());
app.use(compression());

/*
 * Middleware
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(pinoHttp());

/*
 * Health check
 */
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Re-Notes API is running.",
  });
});

/*
 * API Routes (Support both /api and /api/v1)
 */
app.use(["/api/auth", "/api/v1/auth"], authRoutes);
app.use(["/api/notes", "/api/v1/notes"], notesRoutes);
app.use(["/api/tasks", "/api/v1/tasks"], tasksRoutes);
app.use(["/api/profile", "/api/v1/profile"], profileRoutes);
app.use(["/api/contact", "/api/v1/contact"], contactRoutes);
app.use(["/api/settings", "/api/v1/settings"], settingsRoutes);

/*
 * 404 Handler
 */
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

/*
 * Global Error Handler
 */
app.use((error, req, res, next) => {
  console.error(error);

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error.",
  });
});

export default app;