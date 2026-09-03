import { expect } from 'chai';
import { generateResetToken, calculateTokenExpiry } from '../../utils/resetToken.js';

describe('Reset Token Utility (tests/utils/resetToken.test.js)', () => {
  describe('generateResetToken()', () => {
    it('should return a 64-character hexadecimal string', () => {
      const token = generateResetToken();

      expect(token).to.be.a('string');
      expect(token).to.have.lengthOf(64);
      expect(token).to.match(/^[0-9a-f]{64}$/);
    });

    it('should generate unique tokens on consecutive calls', () => {
      const token1 = generateResetToken();
      const token2 = generateResetToken();

      expect(token1).to.not.equal(token2);
    });
  });

  describe('calculateTokenExpiry()', () => {
    it('should return a Date object 1 hour in the future by default', () => {
      const now = new Date();
      const expiry = calculateTokenExpiry();

      expect(expiry).to.be.an.instanceOf(Date);

      const diffInMs = expiry.getTime() - now.getTime();
      const oneHourInMs = 60 * 60 * 1000;

      // Allow up to 100ms tolerance for execution time
      expect(diffInMs).to.be.closeTo(oneHourInMs, 100);
    });

    it('should calculate expiry correctly when given a custom hour duration', () => {
      const hours = 5;
      const now = new Date();
      const expiry = calculateTokenExpiry(hours);

      const diffInMs = expiry.getTime() - now.getTime();
      const expectedMs = hours * 60 * 60 * 1000;

      expect(diffInMs).to.be.closeTo(expectedMs, 100);
    });
  });
});