import { getSettings, saveSettingsSection, deleteAccount, exportUserData } from "../services/settings.service.js";

export async function getSettingsController(req, res, next) {
  try {
    const settings = await getSettings(req.user.id);
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
}

export async function saveSettingsSectionController(req, res, next) {
  try {
    const section = req.params.section;
    const values = req.body;
    
    await saveSettingsSection(req.user.id, section, values);
    
    res.status(200).json({
      success: true,
      message: "Settings saved successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAccountController(req, res, next) {
  try {
    await deleteAccount(req.user.id);
    res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function exportUserDataController(req, res, next) {
  try {
    const data = await exportUserData(req.user.id);
    
    res.setHeader("Content-Disposition", "attachment; filename=mindplanai-export.json");
    res.setHeader("Content-Type", "application/json");
    
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (error) {
    next(error);
  }
}
