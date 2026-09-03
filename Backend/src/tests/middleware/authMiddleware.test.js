import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import authMiddleware from '../../middleware/auth.middleware.js';

// Helper function to create mock req, res, next objects
const createMockReqRes = (headers = {}) => {
  const req = { headers };
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
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  return { req, res, next, wasNextCalled: () => nextCalled };
};

describe('Auth Middleware (tests/middleware/authMiddleware.test.js)', () => {
  const secretKey = 'test-secret-key';

  beforeEach(() => {
    process.env.JWT_SECRET = secretKey;
  });

  it('should return 401 if Authorization header is missing', () => {
    const { req, res, next, wasNextCalled } = createMockReqRes();

    authMiddleware(req, res, next);

    expect(wasNextCalled()).to.be.false;
    expect(res.statusCode).to.equal(401);
    expect(res.jsonBody).to.deep.equal({
      success: false,
      message: 'Authentication token is required.',
    });
  });

  it('should return 401 if authorization scheme is not Bearer', () => {
    const { req, res, next, wasNextCalled } = createMockReqRes({
      authorization: 'Basic some_token_here',
    });

    authMiddleware(req, res, next);

    expect(wasNextCalled()).to.be.false;
    expect(res.statusCode).to.equal(401);
    expect(res.jsonBody).to.deep.equal({
      success: false,
      message: 'Invalid authentication format.',
    });
  });

  it('should return 401 if Bearer token value is missing', () => {
    const { req, res, next, wasNextCalled } = createMockReqRes({
      authorization: 'Bearer ',
    });

    authMiddleware(req, res, next);

    expect(wasNextCalled()).to.be.false;
    expect(res.statusCode).to.equal(401);
    expect(res.jsonBody).to.deep.equal({
      success: false,
      message: 'Invalid authentication format.',
    });
  });

  it('should return 401 if token is invalid or corrupted', () => {
    const { req, res, next, wasNextCalled } = createMockReqRes({
      authorization: 'Bearer invalid.jwt.token',
    });

    authMiddleware(req, res, next);

    expect(wasNextCalled()).to.be.false;
    expect(res.statusCode).to.equal(401);
    expect(res.jsonBody).to.deep.equal({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
  });

  it('should return 401 if token is signed with a different secret', () => {
    const wrongToken = jwt.sign({ id: 1 }, 'wrong-secret');
    const { req, res, next, wasNextCalled } = createMockReqRes({
      authorization: `Bearer ${wrongToken}`,
    });

    authMiddleware(req, res, next);

    expect(wasNextCalled()).to.be.false;
    expect(res.statusCode).to.equal(401);
    expect(res.jsonBody).to.deep.equal({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
  });

  it('should set req.user and call next() when given a valid Bearer token', () => {
    const payload = { id: 10, email: 'user@example.com', role: 'admin' };
    const validToken = jwt.sign(payload, secretKey);

    const { req, res, next, wasNextCalled } = createMockReqRes({
      authorization: `Bearer ${validToken}`,
    });

    authMiddleware(req, res, next);

    expect(wasNextCalled()).to.be.true;
    expect(req.user).to.have.property('id', payload.id);
    expect(req.user).to.have.property('email', payload.email);
    expect(req.user).to.have.property('role', payload.role);
  });
});