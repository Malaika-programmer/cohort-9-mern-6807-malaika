import { expect } from 'chai';
import {
  validateTaskBody,
  validateTaskId,
  validateTaskStatus,
} from '../../validators/task.validation.js';

// Helper function to create mock req, res, next
const createMockReqRes = (body = {}, params = {}) => {
  const req = { body, params };
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

describe('Task Validators (tests/validators/taskValidator.test.js)', () => {
  describe('validateTaskBody()', () => {
    it('should call next() when given a valid complete payload', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({
        title: 'Complete unit tests',
        description: 'Write tests for validators',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2026-10-15',
      });

      validateTaskBody(req, res, next);

      expect(wasNextCalled()).to.be.true;
      expect(res.statusCode).to.be.null;
    });

    it('should call next() when given only a valid title', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({
        title: 'Minimal task',
      });

      validateTaskBody(req, res, next);

      expect(wasNextCalled()).to.be.true;
    });

    it('should return 400 if title is missing or empty', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({
        title: '   ',
      });

      validateTaskBody(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Task title is required.',
      });
    });

    it('should return 400 if title exceeds 150 characters', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({
        title: 'a'.repeat(151),
      });

      validateTaskBody(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Task title cannot exceed 150 characters.',
      });
    });

    it('should return 400 if status is invalid', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({
        title: 'Valid title',
        status: 'finished',
      });

      validateTaskBody(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Invalid task status.',
      });
    });

    it('should return 400 if priority is invalid', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({
        title: 'Valid title',
        priority: 'urgent',
      });

      validateTaskBody(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Invalid task priority.',
      });
    });

    it('should return 400 if dueDate format is invalid', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({
        title: 'Valid title',
        dueDate: 'invalid-date-string',
      });

      validateTaskBody(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Invalid due date.',
      });
    });
  });

  describe('validateTaskId()', () => {
    it('should call next() for a positive integer string ID', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({}, { taskId: '42' });

      validateTaskId(req, res, next);

      expect(wasNextCalled()).to.be.true;
    });

    it('should return 400 for a non-numeric string ID', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({}, { taskId: 'abc' });

      validateTaskId(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Invalid task id.',
      });
    });

    it('should return 400 for a zero or negative ID', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({}, { taskId: '0' });

      validateTaskId(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody.message).to.equal('Invalid task id.');
    });
  });

  describe('validateTaskStatus()', () => {
    it('should call next() when given an allowed status', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({ status: 'completed' });

      validateTaskStatus(req, res, next);

      expect(wasNextCalled()).to.be.true;
    });

    it('should return 400 when status is missing or invalid', () => {
      const { req, res, next, wasNextCalled } = createMockReqRes({ status: 'archived' });

      validateTaskStatus(req, res, next);

      expect(wasNextCalled()).to.be.false;
      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Invalid task status.',
      });
    });
  });
});