import { expect } from 'chai';
import { validateNote } from '../../validators/notes.validation.js';

describe('Note Validator (tests/validators/noteValidator.test.js)', () => {
  describe('validateNote()', () => {
    it('should return null when both title and content are valid', () => {
      const input = {
        title: 'Meeting Notes',
        content: 'Discussed project deadlines and deliverables.',
      };

      const result = validateNote(input);

      expect(result).to.be.null;
    });

    it('should return an error message if title is missing', () => {
      const input = { content: 'Some valid content here.' };

      const result = validateNote(input);

      expect(result).to.equal('Title is required.');
    });

    it('should return an error message if title is empty or only whitespace', () => {
      const input = {
        title: '   ',
        content: 'Some valid content here.',
      };

      const result = validateNote(input);

      expect(result).to.equal('Title is required.');
    });

    it('should return an error message if content is missing', () => {
      const input = { title: 'Valid Title' };

      const result = validateNote(input);

      expect(result).to.equal('Content is required.');
    });

    it('should return an error message if content is empty or only whitespace', () => {
      const input = {
        title: 'Valid Title',
        content: '      ',
      };

      const result = validateNote(input);

      expect(result).to.equal('Content is required.');
    });
  });
});