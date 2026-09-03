import { expect } from 'chai';
import { hashPassword, comparePassword } from '../../utils/password.js';

describe('Password Utility (tests/utils/password.test.js)', () => {
  const samplePassword = 'mySecurePassword123!';

  describe('hashPassword()', () => {
    it('should hash a plain text password and return a bcrypt string', async () => {
      const hashedPassword = await hashPassword(samplePassword);

      expect(hashedPassword).to.be.a('string');
      expect(hashedPassword).to.not.equal(samplePassword);
      // Verify bcrypt hash structure ($2a$, $2b$, or $2y$)
      expect(hashedPassword).to.match(/^\$2[ayb]\$/);
    });
  });

  describe('comparePassword()', () => {
    it('should return true when comparing a valid password with its hash', async () => {
      const hashedPassword = await hashPassword(samplePassword);
      const isMatch = await comparePassword(samplePassword, hashedPassword);

      expect(isMatch).to.be.true;
    });

    it('should return false when comparing an incorrect password with a hash', async () => {
      const hashedPassword = await hashPassword(samplePassword);
      const isMatch = await comparePassword('wrongPassword123!', hashedPassword);

      expect(isMatch).to.be.false;
    });
  });
});