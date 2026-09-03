import profileService from "../services/profile.service.js";

export async function getProfileController(req, res, next) {
  try {
    const profile = await profileService.getProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfileController(req, res, next) {
  try {
    const profile = await profileService.updateProfile(
      req.user.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSkillsController(req, res, next) {
  try {
    const profile = await profileService.updateSkills(
      req.user.id,
      req.body.skills,
    );

    res.status(200).json({
      success: true,
      message: "Skills updated successfully.",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSocialLinksController(req, res, next) {
  try {
    const profile = await profileService.updateSocialLinks(
      req.user.id,
      req.body.socialLinks,
    );

    res.status(200).json({
      success: true,
      message: "Social links updated successfully.",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAvatarController(req, res, next) {
  try {
    const profile = await profileService.updateAvatar(
      req.user.id,
      req.body.avatar,
    );

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully.",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function changePasswordController(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    const result = await profileService.changePassword(
      req.user.id,
      currentPassword,
      newPassword,
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAccountController(req, res, next) {
  try {
    const result = await profileService.deleteAccount(req.user.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}
