import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js'; // Points to root Backend/app.js

describe('Application Root & Middleware (src/tests/app.test.js)', () => {
  describe('GET / (Health Check)', () => {
    it('should return 200 OK with health check payload', async () => {
      const response = await request(app).get('/');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Re-Notes API is running.',
      });
    });
  });

  describe('404 Route Handler', () => {
    it('should return 404 Not Found for non-existent routes', async () => {
      const response = await request(app).get('/api/non-existent-route');

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Route not found.',
      });
    });
  });

  describe('Versioned API Aliases (/api vs /api/v1)', () => {
    it('should correctly execute middleware on /api/v1/notes versioned route', async () => {
      const response = await request(app).get('/api/v1/notes');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Authentication token is required.',
      });
    });

    it('should correctly execute middleware on /api/notes base route', async () => {
      const response = await request(app).get('/api/notes');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Authentication token is required.',
      });
    });
  });
});