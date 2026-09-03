import { expect } from 'chai';
import profileService from '../../services/profile.service.js'; // or 'profile.service.js' depending on your file name
import {
  getProfileController,
  updateProfileController,
  updateSkillsController,
  updateSocialLinksController,
  updateAvatarController,
  changePasswordController,
  deleteAccountController,
} from '../../controllers/profile.controller.js';

// Helper function to mock req, res, and next objects
const createMockReqRes = (body = {}, params = {}, user = { id: 1 }) => {
  const req = { body, params, user };
  const res = {
    statusCode: null,
    jsonBody: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonBody = data;
      return this;
    },
  };
  let passedError = null;
  const next = (err) => {
    passedError = err;
  };

  return { req, res, next, getPassedError: () => passedError };
};

describe('Profile Controller (src/tests/controllers/profileController.test.js)', () => {
  const mockProfile = {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user',
    username: 'janedoe',
    skills: ['JavaScript', 'Node.js'],
    socialLinks: { linkedin: '', github: '', portfolio: '' },
    avatar: 'https://example.com/avatar.png',
  };

  const originalService = { ...profileService };

  afterEach(() => {
    // Restore original service methods after each test
    Object.assign(profileService, originalService);
  });

  describe('getProfileController()', () => {
    it('should return 200 and profile data for authenticated user', async () => {
      profileService.getProfile = async () => mockProfile;

      const { req, res, next } = createMockReqRes();

      await getProfileController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        data: mockProfile,
      });
    });

    it('should call next(error) if profileService.getProfile fails', async () => {
      const mockError = new Error('User not found');
      profileService.getProfile = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes();

      await getProfileController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('updateProfileController()', () => {
    it('should return 200 and updated profile on success', async () => {
      const updatedMock = { ...mockProfile, fullName: 'Jane Smith' };
      profileService.updateProfile = async () => updatedMock;

      const { req, res, next } = createMockReqRes({ fullName: 'Jane Smith' });

      await updateProfileController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Profile updated successfully.',
        data: updatedMock,
      });
    });

    it('should call next(error) if profile update throws an error', async () => {
      const mockError = new Error('Username taken');
      profileService.updateProfile = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({ username: 'taken' });

      await updateProfileController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('updateSkillsController()', () => {
    it('should return 200 and updated profile when updating skills', async () => {
      const newSkills = ['React', 'TypeScript'];
      const updatedMock = { ...mockProfile, skills: newSkills };
      profileService.updateSkills = async () => updatedMock;

      const { req, res, next } = createMockReqRes({ skills: newSkills });

      await updateSkillsController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Skills updated successfully.',
        data: updatedMock,
      });
    });

    it('should call next(error) if profileService.updateSkills fails', async () => {
      const mockError = new Error('Database write error');
      profileService.updateSkills = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({ skills: [] });

      await updateSkillsController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('updateSocialLinksController()', () => {
    it('should return 200 and updated profile when updating social links', async () => {
      const socialLinks = { github: 'https://github.com/janedoe' };
      const updatedMock = { ...mockProfile, socialLinks };
      profileService.updateSocialLinks = async () => updatedMock;

      const { req, res, next } = createMockReqRes({ socialLinks });

      await updateSocialLinksController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Social links updated successfully.',
        data: updatedMock,
      });
    });

    it('should call next(error) on service error', async () => {
      const mockError = new Error('Update failed');
      profileService.updateSocialLinks = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({ socialLinks: {} });

      await updateSocialLinksController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('updateAvatarController()', () => {
    it('should return 200 and updated avatar profile on success', async () => {
      const avatar = 'https://example.com/new-avatar.png';
      const updatedMock = { ...mockProfile, avatar };
      profileService.updateAvatar = async () => updatedMock;

      const { req, res, next } = createMockReqRes({ avatar });

      await updateAvatarController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Avatar updated successfully.',
        data: updatedMock,
      });
    });

    it('should call next(error) on failure', async () => {
      const mockError = new Error('Upload error');
      profileService.updateAvatar = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({ avatar: 'invalid' });

      await updateAvatarController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('changePasswordController()', () => {
    it('should return 400 if currentPassword or newPassword is missing', async () => {
      const { req, res, next } = createMockReqRes({ currentPassword: 'old' });

      await changePasswordController(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Current password and new password are required.',
      });
    });

    it('should return 200 on successful password change', async () => {
      const message = 'Password updated successfully.';
      profileService.changePassword = async () => ({ message });

      const { req, res, next } = createMockReqRes({
        currentPassword: 'oldPassword123',
        newPassword: 'newPassword123',
      });

      await changePasswordController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message,
      });
    });

    it('should call next(error) if profileService.changePassword fails', async () => {
      const mockError = new Error('Incorrect password');
      profileService.changePassword = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({
        currentPassword: 'wrongPassword',
        newPassword: 'newPassword123',
      });

      await changePasswordController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('deleteAccountController()', () => {
    it('should return 200 on successful account deletion', async () => {
      const message = 'Account deleted successfully.';
      profileService.deleteAccount = async () => ({ message });

      const { req, res, next } = createMockReqRes();

      await deleteAccountController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message,
      });
    });

    it('should call next(error) if account deletion fails', async () => {
      const mockError = new Error('Deletion error');
      profileService.deleteAccount = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes();

      await deleteAccountController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });
});