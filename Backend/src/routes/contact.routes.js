import express from "express";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = express.Router();

// Public route to submit contact form
router.post("/", submitContactForm);

export default router;
