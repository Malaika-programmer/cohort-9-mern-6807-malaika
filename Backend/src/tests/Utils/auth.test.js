import { expect } from 'chai';
import {
  setAuthData,
  getToken,
  getUser,
  isAuthenticated,
  clearAuthData,
  logout,
} from '../../utils/auth.js';

// Mock Browser Storage for Node Environment
class StorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe('Auth Utility (tests/utils/auth.test.js)', () => {
  beforeEach(() => {
    global.localStorage = new StorageMock();
    global.sessionStorage = new StorageMock();
  });

  describe('setAuthData()', () => {
    it('should store token and stringified user in localStorage', () => {
      const mockToken = 'jwt-sample-token-123';
      const mockUser = { id: 1, email: 'user@example.com' };

      setAuthData(mockToken, mockUser);

      expect(localStorage.getItem('token')).to.equal(mockToken);
      expect(localStorage.getItem('user')).to.equal(JSON.stringify(mockUser));
    });
  });

  describe('getToken()', () => {
    it('should return token when stored', () => {
      localStorage.setItem('token', 'active-token-456');

      expect(getToken()).to.equal('active-token-456');
    });

    it('should return null when token is missing', () => {
      expect(getToken()).to.be.null;
    });
  });

  describe('getUser()', () => {
    it('should parse and return user object if valid JSON exists', () => {
      const userObj = { id: 42, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(userObj));

      expect(getUser()).to.deep.equal(userObj);
    });

    it('should return null if user key is missing', () => {
      expect(getUser()).to.be.null;
    });

    it('should return null safely if JSON parsing fails', () => {
      localStorage.setItem('user', 'invalid-json-{');

      expect(getUser()).to.be.null;
    });
  });

  describe('isAuthenticated()', () => {
    it('should return true if token is present', () => {
      localStorage.setItem('token', 'valid-token');

      expect(isAuthenticated()).to.be.true;
    });

    it('should return false if token is missing', () => {
      expect(isAuthenticated()).to.be.false;
    });
  });

  describe('clearAuthData()', () => {
    it('should remove token and user from localStorage', () => {
      localStorage.setItem('token', 'token-to-remove');
      localStorage.setItem('user', '{"id":1}');

      clearAuthData();

      expect(localStorage.getItem('token')).to.be.null;
      expect(localStorage.getItem('user')).to.be.null;
    });
  });

  describe('logout()', () => {
    it('should clear auth data from localStorage and clear sessionStorage', () => {
      localStorage.setItem('token', 'active-token');
      localStorage.setItem('user', '{"id":1}');
      sessionStorage.setItem('tempKey', 'tempValue');

      logout();

      expect(localStorage.getItem('token')).to.be.null;
      expect(localStorage.getItem('user')).to.be.null;
      expect(sessionStorage.getItem('tempKey')).to.be.null;
    });
  });
});