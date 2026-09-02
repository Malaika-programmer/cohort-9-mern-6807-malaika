import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getSettingsController,
  saveSettingsSectionController,
  deleteAccountController,
  exportUserDataController,
} from "../controllers/settings.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getSettingsController);
router.get("/export", exportUserDataController);
router.put("/:section", saveSettingsSectionController);
router.delete("/account", deleteAccountController);

export default router;
