import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../utils/jwt.js';

describe('JWT Utility (tests/utils/token.test.js)', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Inject test environment variables before each test
    process.env.JWT_SECRET = 'test-secret-key-12345';
    process.env.JWT_EXPIRES_IN = '1h';
  });

  afterEach(() => {
    // Restore original environment
    process.env = { ...originalEnv };
  });

  describe('generateToken()', () => {
    it('should generate a valid JWT token string with encoded user payload', () => {
      const mockUser = { id: 'usr_100', email: 'dev@example.com', role: 'admin' };

      const token = generateToken(mockUser);

      expect(token).to.be.a('string');

      // Verify token payload matches user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      expect(decoded.id).to.equal(mockUser.id);
      expect(decoded.email).to.equal(mockUser.email);
      expect(decoded.role).to.equal(mockUser.role);
    });

    it('should throw an error if JWT_SECRET is missing', () => {
      delete process.env.JWT_SECRET;
      const mockUser = { id: 'usr_101', email: 'user@example.com', role: 'user' };

      expect(() => generateToken(mockUser)).to.throw(
        Error,
        'JWT_SECRET is not configured.'
      );
    });
  });

  describe('verifyToken()', () => {
    it('should return decoded payload when given a valid token', () => {
      const mockUser = { id: 'usr_200', email: 'alice@example.com', role: 'user' };
      const token = generateToken(mockUser);

      const decoded = verifyToken(token);

      expect(decoded).to.have.property('id', mockUser.id);
      expect(decoded).to.have.property('email', mockUser.email);
      expect(decoded).to.have.property('role', mockUser.role);
    });

    it('should throw an error when token signature is invalid', () => {
      const mockUser = { id: 'usr_201', email: 'bob@example.com', role: 'user' };
      const token = generateToken(mockUser);

      // Alter secret to trigger verification failure
      process.env.JWT_SECRET = 'wrong-secret';

      expect(() => verifyToken(token)).to.throw(jwt.JsonWebTokenError);
    });

    it('should throw an error if JWT_SECRET is missing during verification', () => {
      const mockUser = { id: 'usr_202', email: 'charlie@example.com', role: 'user' };
      const token = generateToken(mockUser);

      delete process.env.JWT_SECRET;

      expect(() => verifyToken(token)).to.throw(
        Error,
        'JWT_SECRET is not configured.'
      );
    });
  });
});