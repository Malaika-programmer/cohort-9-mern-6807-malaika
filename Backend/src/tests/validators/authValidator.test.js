import { expect } from 'chai';
import { validateRegister, validateLogin } from '../../validators/auth.validator.js';

describe('Auth Validators (tests/validators/authValidator.test.js)', () => {
  describe('validateRegister()', () => {
    it('should return no errors for valid registration data', () => {
      const input = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const errors = validateRegister(input);

      expect(errors).to.be.an('object').that.is.empty;
    });

    it('should return error if fullName is missing or only whitespace', () => {
      const input = {
        fullName: '   ',
        email: 'john@example.com',
        password: 'password123',
      };

      const errors = validateRegister(input);

      expect(errors).to.have.property('fullName', 'Full name is required.');
    });

    it('should return error if email is missing', () => {
      const input = {
        fullName: 'John Doe',
        password: 'password123',
      };

      const errors = validateRegister(input);

      expect(errors).to.have.property('email', 'Email address is required.');
    });

    it('should return error if email format is invalid', () => {
      const input = {
        fullName: 'John Doe',
        email: 'not-an-email',
        password: 'password123',
      };

      const errors = validateRegister(input);

      expect(errors).to.have.property('email', 'Enter a valid email address.');
    });

    it('should return error if password is missing', () => {
      const input = {
        fullName: 'John Doe',
        email: 'john@example.com',
      };

      const errors = validateRegister(input);

      expect(errors).to.have.property('password', 'Password is required.');
    });

    it('should return error if password is fewer than 8 characters', () => {
      const input = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'short',
      };

      const errors = validateRegister(input);

      expect(errors).to.have.property('password', 'Password must contain at least 8 characters.');
    });

    it('should collect multiple errors when all fields are invalid or missing', () => {
      const errors = validateRegister({});

      expect(errors).to.have.property('fullName', 'Full name is required.');
      expect(errors).to.have.property('email', 'Email address is required.');
      expect(errors).to.have.property('password', 'Password is required.');
    });
  });

  describe('validateLogin()', () => {
    it('should return no errors for valid login input', () => {
      const input = {
        email: 'john@example.com',
        password: 'password123',
      };

      const errors = validateLogin(input);

      expect(errors).to.be.an('object').that.is.empty;
    });

    it('should return error if email is missing', () => {
      const errors = validateLogin({ password: 'password123' });

      expect(errors).to.have.property('email', 'Email address is required.');
    });

    it('should return error if email format is invalid', () => {
      const errors = validateLogin({ email: 'bademail.com', password: 'password123' });

      expect(errors).to.have.property('email', 'Enter a valid email address.');
    });

    it('should return error if password is missing', () => {
      const errors = validateLogin({ email: 'john@example.com' });

      expect(errors).to.have.property('password', 'Password is required.');
    });
  });
});