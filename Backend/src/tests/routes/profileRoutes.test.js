import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import profileRouter from '../../routes/profile.routes.js';
import profileService from '../../services/profile.service.js';

// Setup isolated Express test instance
const app = express();
app.use(express.json());
app.use('/api/profile', profileRouter);

// Global error-handling middleware for next(error)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

describe('Profile Routes Integration (tests/routes/profileRoutes.test.js)', () => {
  const secretKey = 'test-jwt-secret';
  let validToken;
  const originalService = { ...profileService };

  const mockProfile = {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user',
    username: 'janedoe',
    skills: ['JavaScript', 'Node.js'],
    socialLinks: { github: 'https://github.com/janedoe' },
    avatar: 'https://example.com/avatar.png',
  };

  beforeEach(() => {
    process.env.JWT_SECRET = secretKey;
    validToken = jwt.sign({ id: 1, email: 'jane@example.com' }, secretKey);
  });

  afterEach(() => {
    Object.assign(profileService, originalService);
  });

  describe('Authentication Guard', () => {
    it('should block unauthorized requests with HTTP 401 when token is missing', async () => {
      const response = await request(app).get('/api/profile');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Authentication token is required.',
      });
    });
  });

  describe('GET /api/profile', () => {
    it('should fetch profile data and return HTTP 200', async () => {
      profileService.getProfile = async () => mockProfile;

      const response = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        data: mockProfile,
      });
    });
  });

  describe('PUT /api/profile', () => {
    it('should update profile and return HTTP 200', async () => {
      const updatedProfile = { ...mockProfile, fullName: 'Jane Smith' };
      profileService.updateProfile = async () => updatedProfile;

      const response = await request(app)
        .put('/api/profile')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ fullName: 'Jane Smith' });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Profile updated successfully.',
        data: updatedProfile,
      });
    });
  });

  describe('PUT /api/profile/skills', () => {
    it('should update skills and return HTTP 200', async () => {
      const newSkills = ['React', 'TypeScript'];
      const updatedProfile = { ...mockProfile, skills: newSkills };
      profileService.updateSkills = async () => updatedProfile;

      const response = await request(app)
        .put('/api/profile/skills')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ skills: newSkills });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Skills updated successfully.',
        data: updatedProfile,
      });
    });
  });

  describe('PUT /api/profile/social-links', () => {
    it('should update social links and return HTTP 200', async () => {
      const socialLinks = { github: 'https://github.com/janedoe' };
      const updatedProfile = { ...mockProfile, socialLinks };
      profileService.updateSocialLinks = async () => updatedProfile;

      const response = await request(app)
        .put('/api/profile/social-links')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ socialLinks });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Social links updated successfully.',
        data: updatedProfile,
      });
    });
  });

  describe('PUT /api/profile/avatar', () => {
    it('should update avatar and return HTTP 200', async () => {
      const avatar = 'https://example.com/new-avatar.png';
      const updatedProfile = { ...mockProfile, avatar };
      profileService.updateAvatar = async () => updatedProfile;

      const response = await request(app)
        .put('/api/profile/avatar')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ avatar });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Avatar updated successfully.',
        data: updatedProfile,
      });
    });
  });

  describe('PUT /api/profile/password', () => {
    it('should return HTTP 400 if currentPassword or newPassword is missing', async () => {
      const response = await request(app)
        .put('/api/profile/password')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ currentPassword: 'oldPassword123' });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Current password and new password are required.',
      });
    });

    it('should change password and return HTTP 200', async () => {
      const message = 'Password updated successfully.';
      profileService.changePassword = async () => ({ message });

      const response = await request(app)
        .put('/api/profile/password')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          currentPassword: 'oldPassword123',
          newPassword: 'newPassword123',
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message,
      });
    });
  });

  describe('DELETE /api/profile', () => {
    it('should delete account and return HTTP 200', async () => {
      const message = 'Account deleted successfully.';
      profileService.deleteAccount = async () => ({ message });

      const response = await request(app)
        .delete('/api/profile')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message,
      });
    });
  });
});