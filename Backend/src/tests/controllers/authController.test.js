import { expect } from 'chai';
import authService from '../../services/auth.service.js';
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from '../../controllers/auth.controller.js';

// Helper function to mock req, res, and next objects
const createMockReqRes = (body = {}) => {
  const req = { body };
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

describe('Auth Controller (src/tests/controllers/authController.test.js)', () => {
  const originalService = { ...authService };

  afterEach(() => {
    // Restore original service functions
    Object.assign(authService, originalService);
  });

  describe('register()', () => {
    it('should return 201 and user data on successful registration', async () => {
      const mockUser = { id: 1, fullName: 'John Doe', email: 'john@example.com' };
      authService.register = async () => mockUser;

      const { req, res, next } = createMockReqRes({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      await register(req, res, next);

      expect(res.statusCode).to.equal(201);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Account created successfully.',
        data: { user: mockUser },
      });
    });

    it('should call next(error) when authService.register fails', async () => {
      const mockError = new Error('Email already exists');
      authService.register = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({});

      await register(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('login()', () => {
    it('should return 200 and auth payload on successful login', async () => {
      const mockResult = {
        user: { id: 1, email: 'john@example.com' },
        token: 'jwt-token-string',
      };
      authService.login = async () => mockResult;

      const { req, res, next } = createMockReqRes({
        email: 'john@example.com',
        password: 'password123',
      });

      await login(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Login successful.',
        data: mockResult,
      });
    });

    it('should call next(error) when authService.login fails', async () => {
      const mockError = new Error('Invalid credentials');
      authService.login = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({});

      await login(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('logout()', () => {
    it('should return 200 and success message on logout', async () => {
      authService.logout = async () => ({ message: 'Logged out successfully.' });

      const { req, res, next } = createMockReqRes();

      await logout(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Logged out successfully.',
      });
    });

    it('should call next(error) if authService.logout throws', async () => {
      const mockError = new Error('Logout failed');
      authService.logout = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes();

      await logout(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('forgotPassword()', () => {
    it('should return 200 and message when reset email link is dispatched', async () => {
      const message = 'Password reset link sent.';
      authService.forgotPassword = async () => ({ message });

      const { req, res, next } = createMockReqRes({ email: 'john@example.com' });

      await forgotPassword(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message,
      });
    });

    it('should call next(error) when authService.forgotPassword fails', async () => {
      const mockError = new Error('User not found');
      authService.forgotPassword = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({});

      await forgotPassword(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('resetPassword()', () => {
    it('should return 200 and message on password reset success', async () => {
      const message = 'Password reset successful.';
      authService.resetPassword = async () => ({ message });

      const { req, res, next } = createMockReqRes({
        token: 'valid-reset-token',
        newPassword: 'newPassword123',
      });

      await resetPassword(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message,
      });
    });

    it('should call next(error) when authService.resetPassword fails', async () => {
      const mockError = new Error('Invalid or expired token');
      authService.resetPassword = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({});

      await resetPassword(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });
});