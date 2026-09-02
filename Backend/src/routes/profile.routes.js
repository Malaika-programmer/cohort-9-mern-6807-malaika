import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getProfileController,
  updateProfileController,
  updateSkillsController,
  updateSocialLinksController,
  updateAvatarController,
  changePasswordController,
  deleteAccountController,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getProfileController);
router.put("/", updateProfileController);
router.put("/skills", updateSkillsController);
router.put("/social-links", updateSocialLinksController);
router.put("/avatar", updateAvatarController);
router.put("/password", changePasswordController);
router.delete("/", deleteAccountController);

export default router;
