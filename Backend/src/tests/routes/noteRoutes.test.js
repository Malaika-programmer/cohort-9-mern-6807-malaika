import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import noteRouter from '../../routes/notes.routes.js';
import prisma from '../../config/database.js';
// Setup isolated Express test instance
const app = express();
app.use(express.json());
app.use('/api/notes', noteRouter);

// Global error-handling middleware for next(error)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

describe('Note Routes Integration (tests/routes/noteRoutes.test.js)', () => {
  const secretKey = 'test-jwt-secret';
  let validToken;

  const mockNote = {
    id: 1,
    title: 'Grocery List',
    content: 'Milk, Eggs, Bread',
    userId: 1,
    isTrashed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    process.env.JWT_SECRET = secretKey;
    validToken = jwt.sign({ id: 1, email: 'user@example.com' }, secretKey);

    // Mock Prisma database methods
    prisma.note = {
      create: async () => mockNote,
      findMany: async () => [mockNote],
      findFirst: async () => mockNote,
      update: async () => mockNote,
      delete: async () => mockNote,
    };
  });

  describe('Authentication Guard', () => {
    it('should block unauthorized requests with HTTP 401 when token is missing', async () => {
      const response = await request(app).get('/api/notes');

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Authentication token is required.',
      });
    });
  });

  describe('POST /api/notes', () => {
    it('should create a note and return HTTP 201', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          title: 'Grocery List',
          content: 'Milk, Eggs, Bread',
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Note created successfully.',
        data: mockNote,
      });
    });

    it('should return HTTP 400 when validation fails', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ title: '' });

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Title is required.',
      });
    });
  });

  describe('GET /api/notes', () => {
    it('should fetch active notes and return HTTP 200', async () => {
      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        data: [mockNote],
      });
    });
  });

  describe('GET /api/notes/trash & GET /api/notes/trashed', () => {
    it('should return trashed notes for /trash route with HTTP 200', async () => {
      const trashedNote = { ...mockNote, isTrashed: true };
      prisma.note.findMany = async () => [trashedNote];

      const response = await request(app)
        .get('/api/notes/trash')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        data: [trashedNote],
      });
    });

    it('should return trashed notes for /trashed alias route with HTTP 200', async () => {
      const trashedNote = { ...mockNote, isTrashed: true };
      prisma.note.findMany = async () => [trashedNote];

      const response = await request(app)
        .get('/api/notes/trashed')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        data: [trashedNote],
      });
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should fetch single note by ID and return HTTP 200', async () => {
      const response = await request(app)
        .get('/api/notes/1')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        data: mockNote,
      });
    });

    it('should return HTTP 400 for non-numeric note ID', async () => {
      const response = await request(app)
        .get('/api/notes/abc')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Invalid note ID.',
      });
    });

    it('should return HTTP 404 when note is not found', async () => {
      prisma.note.findFirst = async () => null;

      const response = await request(app)
        .get('/api/notes/999')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        success: false,
        message: 'Note not found.',
      });
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update note and return HTTP 200', async () => {
      const response = await request(app)
        .put('/api/notes/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          title: 'Updated Title',
          content: 'Updated Content',
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Note updated successfully.',
        data: mockNote,
      });
    });
  });

  describe('PATCH /api/notes/:id/trash', () => {
    it('should move note to trash and return HTTP 200', async () => {
      const trashedNote = { ...mockNote, isTrashed: true };
      prisma.note.update = async () => trashedNote;

      const response = await request(app)
        .patch('/api/notes/1/trash')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Note moved to trash.',
        data: trashedNote,
      });
    });
  });

  describe('PATCH /api/notes/:id/restore', () => {
    it('should restore note from trash and return HTTP 200', async () => {
      const restoredNote = { ...mockNote, isTrashed: false };
      prisma.note.update = async () => restoredNote;

      const response = await request(app)
        .patch('/api/notes/1/restore')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Note restored.',
        data: restoredNote,
      });
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should permanently delete note and return HTTP 200', async () => {
      const response = await request(app)
        .delete('/api/notes/1')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        success: true,
        message: 'Note deleted successfully.',
      });
    });
  });
});