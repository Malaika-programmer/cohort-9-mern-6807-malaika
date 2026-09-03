import { expect } from 'chai';
import prisma from '../../config/database.js';
import {
  createNote,
  getNotes,
  getTrashedNotes,
  getNote,
  updateNote,
  deleteNote,
  trashNote,
  restoreNote,
} from '../../services/notes.services.js';

describe('Note Service (tests/services/note.service.test.js)', () => {
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
    prisma.note = {
      create: async () => mockNote,
      findMany: async () => [mockNote],
      findFirst: async () => mockNote,
      update: async () => mockNote,
      delete: async () => mockNote,
    };
  });

  describe('createNote()', () => {
    it('should create a note with trimmed title and content', async () => {
      let createdPayload = null;
      prisma.note.create = async ({ data }) => {
        createdPayload = data;
        return { id: mockNoteId, ...data };
      };

      const inputData = {
        title: '   Untrimmed Title   ',
        content: '   Untrimmed Content   ',
      };

      const result = await createNote(mockUserId, inputData);

      expect(createdPayload).to.deep.equal({
        title: 'Untrimmed Title',
        content: 'Untrimmed Content',
        userId: mockUserId,
      });
      expect(result.title).to.equal('Untrimmed Title');
      expect(result.content).to.equal('Untrimmed Content');
    });
  });

  describe('getNotes()', () => {
    it('should query active notes for the given user sorted by creation date', async () => {
      let queryOptions = null;
      prisma.note.findMany = async (options) => {
        queryOptions = options;
        return [mockNote];
      };

      const notes = await getNotes(mockUserId);

      expect(queryOptions).to.deep.equal({
        where: {
          userId: mockUserId,
          isTrashed: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(notes).to.be.an('array').with.lengthOf(1);
    });
  });

  describe('getTrashedNotes()', () => {
    it('should query trashed notes for the given user sorted by update date', async () => {
      let queryOptions = null;
      prisma.note.findMany = async (options) => {
        queryOptions = options;
        return [{ ...mockNote, isTrashed: true }];
      };

      const notes = await getTrashedNotes(mockUserId);

      expect(queryOptions).to.deep.equal({
        where: {
          userId: mockUserId,
          isTrashed: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      expect(notes[0].isTrashed).to.be.true;
    });
  });

  describe('getNote()', () => {
    it('should return a note matching id and userId', async () => {
      const note = await getNote(mockUserId, mockNoteId);

      expect(note).to.deep.equal(mockNote);
    });

    it('should return null if note is not found or owned by another user', async () => {
      prisma.note.findFirst = async () => null;

      const note = await getNote(mockUserId, 999);

      expect(note).to.be.null;
    });
  });

  describe('updateNote()', () => {
    it('should return null if note does not exist', async () => {
      prisma.note.findFirst = async () => null;

      const result = await updateNote(mockUserId, mockNoteId, {
        title: 'New',
        content: 'Content',
      });

      expect(result).to.be.null;
    });

    it('should update and return note with trimmed content when note exists', async () => {
      let updateArgs = null;
      prisma.note.findFirst = async () => mockNote;
      prisma.note.update = async (args) => {
        updateArgs = args;
        return { ...mockNote, ...args.data };
      };

      const result = await updateNote(mockUserId, mockNoteId, {
        title: '  Updated Title  ',
        content: '  Updated Content  ',
      });

      expect(updateArgs.where).to.deep.equal({ id: mockNoteId });
      expect(updateArgs.data).to.deep.equal({
        title: 'Updated Title',
        content: 'Updated Content',
      });
      expect(result.title).to.equal('Updated Title');
    });
  });

  describe('deleteNote()', () => {
    it('should return null if note does not exist', async () => {
      prisma.note.findFirst = async () => null;

      const result = await deleteNote(mockUserId, mockNoteId);

      expect(result).to.be.null;
    });

    it('should delete and return the deleted note if it exists', async () => {
      let deleteWhere = null;
      prisma.note.findFirst = async () => mockNote;
      prisma.note.delete = async ({ where }) => {
        deleteWhere = where;
        return mockNote;
      };

      const result = await deleteNote(mockUserId, mockNoteId);

      expect(deleteWhere).to.deep.equal({ id: mockNoteId });
      expect(result).to.deep.equal(mockNote);
    });
  });

  describe('trashNote()', () => {
    it('should return null if note does not exist', async () => {
      prisma.note.findFirst = async () => null;

      const result = await trashNote(mockUserId, mockNoteId);

      expect(result).to.be.null;
    });

    it('should mark isTrashed as true when note exists', async () => {
      let updatePayload = null;
      prisma.note.findFirst = async () => mockNote;
      prisma.note.update = async (args) => {
        updatePayload = args;
        return { ...mockNote, isTrashed: true };
      };

      const result = await trashNote(mockUserId, mockNoteId);

      expect(updatePayload.where).to.deep.equal({ id: mockNoteId });
      expect(updatePayload.data).to.deep.equal({ isTrashed: true });
      expect(result.isTrashed).to.be.true;
    });
  });

  describe('restoreNote()', () => {
    it('should return null if note does not exist', async () => {
      prisma.note.findFirst = async () => null;

      const result = await restoreNote(mockUserId, mockNoteId);

      expect(result).to.be.null;
    });

    it('should mark isTrashed as false when note exists', async () => {
      let updatePayload = null;
      prisma.note.findFirst = async () => ({ ...mockNote, isTrashed: true });
      prisma.note.update = async (args) => {
        updatePayload = args;
        return { ...mockNote, isTrashed: false };
      };

      const result = await restoreNote(mockUserId, mockNoteId);

      expect(updatePayload.where).to.deep.equal({ id: mockNoteId });
      expect(updatePayload.data).to.deep.equal({ isTrashed: false });
      expect(result.isTrashed).to.be.false;
    });
  });
});