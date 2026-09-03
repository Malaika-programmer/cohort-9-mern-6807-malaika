import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import authRouter from '../../routes/auth.routes.js'; 
import authService from '../../services/auth.service.js'; 
// Setup isolated Express test instance
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

// Global error-handling middleware for handling next(error) calls
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

describe('Auth Routes Integration (tests/routes/authRoutes.test.js)', () => {
  const secretKey = 'test-jwt-secret';
  const originalService = { ...authService };

  beforeEach(() => {
    process.env.JWT_SECRET = secretKey;
  });

  afterEach(() => {
    Object.assign(authService, originalService);
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user and return HTTP 201', async () => {
      const mockUser = { id: 1, fullName: 'John Doe', email: 'john@example.com', role: 'user' };
      authService.register = async () => mockUser;

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          fullName: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Account created successfully.',
        data: { user: mockUser },
      });
    });

    it('should return HTTP 409 if email already exists', async () => {
      const error = new Error('An account with this email already exists.');
      error.statusCode = 409;
      authService.register = async () => {
        throw error;
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          fullName: 'John Doe',
          email: 'existing@example.com',
          password: 'password123',
        });

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'An account with this email already exists.',
      });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should authenticate user and return HTTP 200 with token payload', async () => {
      const mockResult = {
        user: { id: 1, email: 'john@example.com', role: 'user' },
        token: 'mocked-jwt-token',
      };
      authService.login = async () => mockResult;

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123',
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Login successful.',
        data: mockResult,
      });
    });

    it('should return HTTP 401 on invalid credentials', async () => {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      authService.login = async () => {
        throw error;
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Invalid email or password.',
      });
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should reject request with HTTP 401 if Authorization header is missing', async () => {
      const response = await request(app).post('/api/auth/logout');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Authentication token is required.',
      });
    });

    it('should log out successfully and return HTTP 200 when given a valid Bearer token', async () => {
      const token = jwt.sign({ id: 1, email: 'john@example.com' }, secretKey);
      authService.logout = async () => ({ message: 'Logged out successfully.' });

      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Logged out successfully.',
      });
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    it('should send reset link and return HTTP 200', async () => {
      const message = 'Password reset link has been sent to your email address.';
      authService.forgotPassword = async () => ({ message });

      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'john@example.com' });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message,
      });
    });
  });

  describe('POST /api/auth/reset-password', () => {
    it('should reset password and return HTTP 200', async () => {
      const message = 'Your password has been reset successfully.';
      authService.resetPassword = async () => ({ message });

      const response = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: 'valid-reset-token',
          newPassword: 'newPassword123',
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message,
      });
    });
  });
});