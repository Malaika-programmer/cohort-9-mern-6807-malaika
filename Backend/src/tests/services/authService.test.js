import { expect } from 'chai';
import authService from '../../services/auth.service.js';
import prisma from '../../config/database.js';

describe('Auth Service (tests/services/authService.test.js)', () => {
  const mockUser = {
    id: 1,
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    password: '$2b$10$hashedpasswordstring', // Simulated hashed password
    role: 'user',
  };

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret-key';

    // Mock Prisma user table methods
    prisma.user = {
      findUnique: async () => null,
      create: async () => mockUser,
      update: async () => mockUser,
      findFirst: async () => null,
    };
  });

  describe('register()', () => {
    it('should throw a 409 error if email is already registered', async () => {
      prisma.user.findUnique = async () => mockUser;

      try {
        await authService.register({
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          password: 'password123',
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('An account with this email already exists.');
        expect(error.statusCode).to.equal(409);
      }
    });

    it('should create and return a new user object on valid registration', async () => {
      let createdData = null;
      prisma.user.create = async ({ data }) => {
        createdData = data;
        return { id: 2, ...data, role: 'user' };
      };

      const result = await authService.register({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      });

      expect(createdData.email).to.equal('jane@example.com');
      expect(result).to.deep.equal({
        id: 2,
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        role: 'user',
      });
    });
  });

  describe('login()', () => {
    it('should throw a 401 error if user email is not found', async () => {
      prisma.user.findUnique = async () => null;

      try {
        await authService.login('nonexistent@example.com', 'password123');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Invalid email or password.');
        expect(error.statusCode).to.equal(401);
      }
    });

    it('should throw a 401 error if password does not match', async () => {
      prisma.user.findUnique = async () => mockUser;

      try {
        await authService.login('jane@example.com', 'wrongpassword');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Invalid email or password.');
        expect(error.statusCode).to.equal(401);
      }
    });

    it('should return user payload and JWT token on valid login', async () => {
      // Fixed relative import path below
      const { hashPassword } = await import('../../utils/password.js');
      const validHashedPassword = await hashPassword('password123');

      prisma.user.findUnique = async () => ({
        ...mockUser,
        password: validHashedPassword,
      });

      const result = await authService.login('jane@example.com', 'password123');

      expect(result).to.have.property('token').that.is.a('string');
      expect(result.user).to.deep.equal({
        id: mockUser.id,
        fullName: mockUser.fullName,
        email: mockUser.email,
        role: mockUser.role,
      });
    });
  });

  describe('logout()', () => {
    it('should return a success message on logout', async () => {
      const result = await authService.logout();

      expect(result).to.deep.equal({
        message: 'Logged out successfully.',
      });
    });
  });

  describe('forgotPassword()', () => {
    it('should throw a 400 error if email is missing', async () => {
      try {
        await authService.forgotPassword('');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Email address is required.');
        expect(error.statusCode).to.equal(400);
      }
    });

    it('should throw a 404 error if email is not found in database', async () => {
      prisma.user.findUnique = async () => null;

      try {
        await authService.forgotPassword('unknown@example.com');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('No account found with this email address.');
        expect(error.statusCode).to.equal(404);
      }
    });
  });

  describe('resetPassword()', () => {
    it('should throw a 400 error if reset token is missing', async () => {
      try {
        await authService.resetPassword('', 'newPassword123');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Reset token is required.');
        expect(error.statusCode).to.equal(400);
      }
    });

    it('should throw a 400 error if new password is fewer than 6 characters', async () => {
      try {
        await authService.resetPassword('valid-token', '123');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('New password must be at least 6 characters long.');
        expect(error.statusCode).to.equal(400);
      }
    });

    it('should throw a 400 error if token is invalid or expired', async () => {
      prisma.user.findFirst = async () => null;

      try {
        await authService.resetPassword('invalid-or-expired-token', 'newPassword123');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Invalid or expired password reset token.');
        expect(error.statusCode).to.equal(400);
      }
    });

    it('should update password and clear reset token on success', async () => {
      let updatedData = null;
      prisma.user.findFirst = async () => mockUser;
      prisma.user.update = async ({ data }) => {
        updatedData = data;
        return mockUser;
      };

      const result = await authService.resetPassword('valid-token', 'newPassword123');

      expect(result).to.deep.equal({
        message: 'Your password has been reset successfully.',
      });
      expect(updatedData.resetToken).to.be.null;
      expect(updatedData.resetTokenExpiry).to.be.null;
      expect(updatedData.password).to.be.a('string');
    });
  });
});