import { expect } from 'chai';
import prisma from '../../config/database.js';
import {
  createNoteController,
  getNotesController,
  getNoteController,
  updateNoteController,
  getTrashedNotesController,
  trashNoteController,
  restoreNoteController,
  deleteNoteController,
} from '../../controllers/notes.controller.js';
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

describe('Note Controller (src/tests/controllers/noteController.test.js)', () => {
  const mockUserId = 1;
  const mockNoteId = 10;
  const mockNote = {
    id: mockNoteId,
    title: 'Test Note',
    content: 'Test Content',
    userId: mockUserId,
    isTrashed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    // Mock Prisma note table operations
    prisma.note = {
      create: async () => mockNote,
      findMany: async () => [mockNote],
      findFirst: async () => mockNote,
      update: async () => mockNote,
      delete: async () => mockNote,
    };
  });

  describe('createNoteController()', () => {
    it('should return 400 if validation fails (e.g., missing title)', async () => {
      const { req, res, next } = createMockReqRes({ content: 'Only content provided' });

      await createNoteController(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Title is required.',
      });
    });

    it('should return 201 and created note when input is valid', async () => {
      const { req, res, next } = createMockReqRes({
        title: 'New Note',
        content: 'Note content',
      });

      await createNoteController(req, res, next);

      expect(res.statusCode).to.equal(201);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Note created successfully.',
        data: mockNote,
      });
    });

    it('should call next(error) when database creation fails', async () => {
      const mockError = new Error('Database insertion failed');
      prisma.note.create = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes({
        title: 'New Note',
        content: 'Note content',
      });

      await createNoteController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('getNotesController()', () => {
    it('should return 200 and list of active notes', async () => {
      const { req, res, next } = createMockReqRes();

      await getNotesController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        data: [mockNote],
      });
    });

    it('should call next(error) on service failure', async () => {
      const mockError = new Error('Database query failed');
      prisma.note.findMany = async () => {
        throw mockError;
      };

      const { req, res, next, getPassedError } = createMockReqRes();

      await getNotesController(req, res, next);

      expect(getPassedError()).to.equal(mockError);
    });
  });

  describe('getNoteController()', () => {
    it('should return 400 if note ID parameter is not a number', async () => {
      const { req, res, next } = createMockReqRes({}, { id: 'abc' });

      await getNoteController(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Invalid note ID.',
      });
    });

    it('should return 404 if note is not found', async () => {
      prisma.note.findFirst = async () => null;

      const { req, res, next } = createMockReqRes({}, { id: '999' });

      await getNoteController(req, res, next);

      expect(res.statusCode).to.equal(404);
      expect(res.jsonBody).to.deep.equal({
        success: false,
        message: 'Note not found.',
      });
    });

    it('should return 200 and single note data when found', async () => {
      const { req, res, next } = createMockReqRes({}, { id: String(mockNoteId) });

      await getNoteController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        data: mockNote,
      });
    });
  });

  describe('updateNoteController()', () => {
    it('should return 400 for an invalid note ID parameter', async () => {
      const { req, res, next } = createMockReqRes({}, { id: 'invalid' });

      await updateNoteController(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody.message).to.equal('Invalid note ID.');
    });

    it('should return 400 if validation fails on updated payload', async () => {
      const { req, res, next } = createMockReqRes(
        { title: '' },
        { id: String(mockNoteId) }
      );

      await updateNoteController(req, res, next);

      expect(res.statusCode).to.equal(400);
      expect(res.jsonBody.message).to.equal('Title is required.');
    });

    it('should return 404 if target note does not exist', async () => {
      prisma.note.findFirst = async () => null;

      const { req, res, next } = createMockReqRes(
        { title: 'Updated Title', content: 'Updated Content' },
        { id: '999' }
      );

      await updateNoteController(req, res, next);

      expect(res.statusCode).to.equal(404);
      expect(res.jsonBody.message).to.equal('Note not found.');
    });

    it('should return 200 and updated note data when successful', async () => {
      const updatedNote = { ...mockNote, title: 'Updated Title' };
      prisma.note.update = async () => updatedNote;

      const { req, res, next } = createMockReqRes(
        { title: 'Updated Title', content: 'Updated Content' },
        { id: String(mockNoteId) }
      );

      await updateNoteController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Note updated successfully.',
        data: updatedNote,
      });
    });
  });

  describe('getTrashedNotesController()', () => {
    it('should return 200 and list of trashed notes', async () => {
      const trashedNote = { ...mockNote, isTrashed: true };
      prisma.note.findMany = async () => [trashedNote];

      const { req, res, next } = createMockReqRes();

      await getTrashedNotesController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        data: [trashedNote],
      });
    });
  });

  describe('trashNoteController()', () => {
    it('should return 400 if note ID parameter is non-numeric', async () => {
      const { req, res, next } = createMockReqRes({}, { id: 'abc' });

      await trashNoteController(req, res, next);

      expect(res.statusCode).to.equal(400);
    });

    it('should return 404 if note to trash is not found', async () => {
      prisma.note.findFirst = async () => null;

      const { req, res, next } = createMockReqRes({}, { id: '999' });

      await trashNoteController(req, res, next);

      expect(res.statusCode).to.equal(404);
    });

    it('should return 200 and moved-to-trash message when successful', async () => {
      const trashedNote = { ...mockNote, isTrashed: true };
      prisma.note.update = async () => trashedNote;

      const { req, res, next } = createMockReqRes({}, { id: String(mockNoteId) });

      await trashNoteController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Note moved to trash.',
        data: trashedNote,
      });
    });
  });

  describe('restoreNoteController()', () => {
    it('should return 400 if note ID parameter is invalid', async () => {
      const { req, res, next } = createMockReqRes({}, { id: 'invalid' });

      await restoreNoteController(req, res, next);

      expect(res.statusCode).to.equal(400);
    });

    it('should return 404 if note to restore is not found', async () => {
      prisma.note.findFirst = async () => null;

      const { req, res, next } = createMockReqRes({}, { id: '999' });

      await restoreNoteController(req, res, next);

      expect(res.statusCode).to.equal(404);
    });

    it('should return 200 and restored note message when successful', async () => {
      const restoredNote = { ...mockNote, isTrashed: false };
      prisma.note.update = async () => restoredNote;

      const { req, res, next } = createMockReqRes({}, { id: String(mockNoteId) });

      await restoreNoteController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Note restored.',
        data: restoredNote,
      });
    });
  });

  describe('deleteNoteController()', () => {
    it('should return 400 if note ID parameter is invalid', async () => {
      const { req, res, next } = createMockReqRes({}, { id: 'xyz' });

      await deleteNoteController(req, res, next);

      expect(res.statusCode).to.equal(400);
    });

    it('should return 404 if note to delete is not found', async () => {
      prisma.note.findFirst = async () => null;

      const { req, res, next } = createMockReqRes({}, { id: '999' });

      await deleteNoteController(req, res, next);

      expect(res.statusCode).to.equal(404);
    });

    it('should return 200 and deletion confirmation message', async () => {
      const { req, res, next } = createMockReqRes({}, { id: String(mockNoteId) });

      await deleteNoteController(req, res, next);

      expect(res.statusCode).to.equal(200);
      expect(res.jsonBody).to.deep.equal({
        success: true,
        message: 'Note deleted successfully.',
      });
    });
  });
});