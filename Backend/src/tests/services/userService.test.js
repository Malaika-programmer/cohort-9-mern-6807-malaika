import { expect } from 'chai';
import prisma from '../../config/database.js';
import userService from '../../services/profile.service.js'; 
import { hashPassword } from '../../utils/password.js'; 

describe('User Service (tests/services/userService.test.js)', () => {
  const mockUserId = 1;
  const mockUser = {
    id: mockUserId,
    fullName: 'Alex Smith',
    email: 'alex@example.com',
    role: 'user',
    createdAt: new Date('2026-01-01'),
    password: '$2b$10$mockHashedPassword',
    profile: null,
  };

  const mockProfile = {
    id: 10,
    userId: mockUserId,
    username: 'alexsmith',
    phone: '1234567890',
    occupation: 'Developer',
    location: 'NY',
    dateOfBirth: '1995-05-15',
    website: 'https://alex.dev',
    bio: 'Software engineer',
    avatar: 'https://avatar.url/1.png',
    skills: ['Node.js', 'JavaScript'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alex',
      github: 'https://github.com/alex',
      portfolio: 'https://alex.dev',
    },
  };

  beforeEach(() => {
    prisma.user = {
      findUnique: async () => mockUser,
      findFirst: async () => null,
      update: async () => mockUser,
      delete: async () => mockUser,
    };

    prisma.profile = {
      findFirst: async () => null,
      upsert: async () => mockProfile,
    };
  });

  describe('getProfile()', () => {
    it('should throw a 404 error if user does not exist', async () => {
      prisma.user.findUnique = async () => null;

      try {
        await userService.getProfile(999);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('User not found.');
        expect(error.statusCode).to.equal(404);
      }
    });

    it('should return profile with default fallback values when profile is null', async () => {
      prisma.user.findUnique = async () => ({ ...mockUser, profile: null });

      const profile = await userService.getProfile(mockUserId);

      expect(profile.fullName).to.equal(mockUser.fullName);
      expect(profile.email).to.equal(mockUser.email);
      expect(profile.username).to.equal('');
      expect(profile.skills).to.deep.equal([]);
      expect(profile.socialLinks).to.deep.equal({
        linkedin: '',
        github: '',
        portfolio: '',
      });
    });

    it('should return complete user profile data when profile exists', async () => {
      prisma.user.findUnique = async () => ({ ...mockUser, profile: mockProfile });

      const profile = await userService.getProfile(mockUserId);

      expect(profile.username).to.equal(mockProfile.username);
      expect(profile.occupation).to.equal(mockProfile.occupation);
      expect(profile.skills).to.deep.equal(mockProfile.skills);
    });
  });

  describe('updateProfile()', () => {
    it('should throw 409 error if username is already taken by another user', async () => {
      prisma.profile.findFirst = async () => ({ id: 2, userId: 99 });

      try {
        await userService.updateProfile(mockUserId, { username: 'takenUsername' });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Username is already taken.');
        expect(error.statusCode).to.equal(409);
      }
    });

    it('should throw 409 error if email is already taken by another user', async () => {
      prisma.user.findFirst = async () => ({ id: 99, email: 'taken@example.com' });

      try {
        await userService.updateProfile(mockUserId, { email: 'taken@example.com' });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Email is already taken.');
        expect(error.statusCode).to.equal(409);
      }
    });

    it('should update user and profile successfully when data is valid', async () => {
      let userUpdatePayload = null;
      let profileUpsertPayload = null;

      prisma.user.update = async (args) => {
        userUpdatePayload = args;
        return mockUser;
      };

      prisma.profile.upsert = async (args) => {
        profileUpsertPayload = args;
        return mockProfile;
      };

      await userService.updateProfile(mockUserId, {
        fullName: 'New Name',
        username: 'newusername',
        bio: 'Updated bio',
      });

      expect(userUpdatePayload.data).to.deep.equal({ fullName: 'New Name' });
      expect(profileUpsertPayload.create.username).to.equal('newusername');
      expect(profileUpsertPayload.update.bio).to.equal('Updated bio');
    });
  });

  describe('updateSkills()', () => {
    it('should upsert skills list and return updated profile', async () => {
      let upsertArgs = null;
      prisma.profile.upsert = async (args) => {
        upsertArgs = args;
        return mockProfile;
      };

      const newSkills = ['React', 'Node.js', 'TypeScript'];
      await userService.updateSkills(mockUserId, newSkills);

      expect(upsertArgs.create.skills).to.deep.equal(newSkills);
      expect(upsertArgs.update.skills).to.deep.equal(newSkills);
    });
  });

  describe('updateSocialLinks()', () => {
    it('should upsert social links object and return updated profile', async () => {
      let upsertArgs = null;
      prisma.profile.upsert = async (args) => {
        upsertArgs = args;
        return mockProfile;
      };

      const socialLinks = { github: 'https://github.com/test' };
      await userService.updateSocialLinks(mockUserId, socialLinks);

      expect(upsertArgs.create.socialLinks).to.deep.equal(socialLinks);
      expect(upsertArgs.update.socialLinks).to.deep.equal(socialLinks);
    });
  });

  describe('updateAvatar()', () => {
    it('should upsert avatar URL and return updated profile', async () => {
      let upsertArgs = null;
      prisma.profile.upsert = async (args) => {
        upsertArgs = args;
        return mockProfile;
      };

      const avatarUrl = 'https://example.com/avatar.jpg';
      await userService.updateAvatar(mockUserId, avatarUrl);

      expect(upsertArgs.create.avatar).to.equal(avatarUrl);
      expect(upsertArgs.update.avatar).to.equal(avatarUrl);
    });
  });

  describe('changePassword()', () => {
    it('should throw 404 error if user is not found', async () => {
      prisma.user.findUnique = async () => null;

      try {
        await userService.changePassword(999, 'currentPass', 'newPass123');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('User not found.');
        expect(error.statusCode).to.equal(404);
      }
    });

    it('should throw 400 error if current password does not match', async () => {
      const actualHash = await hashPassword('realCurrentPass');
      prisma.user.findUnique = async () => ({ ...mockUser, password: actualHash });

      try {
        await userService.changePassword(mockUserId, 'wrongCurrentPass', 'newPass123');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Current password is incorrect.');
        expect(error.statusCode).to.equal(400);
      }
    });

    it('should update password when current password matches', async () => {
      const currentPassword = 'realPassword123';
      const actualHash = await hashPassword(currentPassword);
      let updatedData = null;

      prisma.user.findUnique = async () => ({ ...mockUser, password: actualHash });
      prisma.user.update = async ({ data }) => {
        updatedData = data;
        return mockUser;
      };

      const result = await userService.changePassword(
        mockUserId,
        currentPassword,
        'newPassword456'
      );

      expect(result).to.deep.equal({ message: 'Password updated successfully.' });
      expect(updatedData.password).to.be.a('string');
      expect(updatedData.password).to.not.equal(actualHash);
    });
  });

  describe('deleteAccount()', () => {
    it('should delete user account by ID and return success message', async () => {
      let deletedWhere = null;
      prisma.user.delete = async ({ where }) => {
        deletedWhere = where;
        return mockUser;
      };

      const result = await userService.deleteAccount(mockUserId);

      expect(deletedWhere).to.deep.equal({ id: mockUserId });
      expect(result).to.deep.equal({ message: 'Account deleted successfully.' });
    });
  });
});