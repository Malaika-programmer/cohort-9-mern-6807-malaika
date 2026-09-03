import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import profileService from '../../../services/profileService';
import { clearAuthData } from '../../../utils/auth';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async importActual => ({
  ...(await importActual('react-router-dom')),
  useNavigate: () => mockNavigate
}));

vi.mock('../../../services/profileService');
vi.mock('../../../utils/auth');

vi.mock('lucide-react', () => ({
  User: () => <div data-testid="user-icon" />,
  Camera: () => <div data-testid="camera-icon" />,
  Save: () => <div data-testid="save-icon" />,
  Lock: () => <div data-testid="lock-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  X: () => <div data-testid="x-icon" />,
  Link: () => <div data-testid="link-icon" />,
  Code: () => <div data-testid="code-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
}));

describe('ProfilePage Component', () => {
  const initialProfileData = {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    bio: 'Software Developer',
    avatar: 'https://example.com/avatar.png',
    skills: ['React', 'JavaScript'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/janedoe',
      github: 'https://github.com/janedoe',
      portfolio: 'https://janedoe.dev',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
  });

  it('renders loading state initially and then populates profile data', async () => {
    profileService.getProfile.mockResolvedValueOnce({ data: initialProfileData });

    render(<ProfilePage />);

    expect(screen.getByText('Loading your profile...')).toBeInTheDocument();

    await waitFor(() => {
      expect(profileService.getProfile).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('updates personal information when submitting profile form', async () => {
    profileService.getProfile.mockResolvedValueOnce({ data: initialProfileData });
    profileService.updateProfile.mockResolvedValueOnce({
      data: { fullName: 'Jane Smith', bio: 'Senior Engineer' },
    });

    render(<ProfilePage />);
    await waitFor(() => expect(profileService.getProfile).toHaveBeenCalled());

    const nameInput = screen.getByLabelText('Full name');
    const bioInput = screen.getByLabelText('Bio');

    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    fireEvent.change(bioInput, { target: { value: 'Senior Engineer' } });

    const saveBtn = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(profileService.updateProfile).toHaveBeenCalledWith({
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        bio: 'Senior Engineer',
      });
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('handles avatar URL updates', async () => {
    profileService.getProfile.mockResolvedValueOnce({ data: initialProfileData });
    profileService.updateAvatar.mockResolvedValueOnce({});

    render(<ProfilePage />);
    await waitFor(() => expect(profileService.getProfile).toHaveBeenCalled());

    const avatarInput = screen.getByLabelText('Avatar URL');
    fireEvent.change(avatarInput, { target: { value: 'https://example.com/new-avatar.png' } });

    await waitFor(() => {
      expect(profileService.updateAvatar).toHaveBeenCalledWith('https://example.com/new-avatar.png');
    });
  });

  it('adds a skill via button click and Enter key press, and allows removal', async () => {
    profileService.getProfile.mockResolvedValueOnce({ data: initialProfileData });
    profileService.updateSkills.mockResolvedValue({});

    render(<ProfilePage />);
    await waitFor(() => expect(profileService.getProfile).toHaveBeenCalled());

    const skillInput = screen.getByPlaceholderText('Add a skill');
    const addBtn = screen.getByRole('button', { name: 'Add skill' });

    // Add skill via button
    fireEvent.change(skillInput, { target: { value: 'TypeScript' } });
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(profileService.updateSkills).toHaveBeenCalledWith(['React', 'JavaScript', 'TypeScript']);
    });
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    // Remove skill
    const removeReactBtn = screen.getByRole('button', { name: 'Remove React' });
    fireEvent.click(removeReactBtn);

    await waitFor(() => {
      expect(profileService.updateSkills).toHaveBeenCalledWith(['JavaScript', 'TypeScript']);
    });
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('updates social media links', async () => {
    profileService.getProfile.mockResolvedValueOnce({ data: initialProfileData });
    profileService.updateSocialLinks.mockResolvedValue({});

    render(<ProfilePage />);
    await waitFor(() => expect(profileService.getProfile).toHaveBeenCalled());

    const githubInput = screen.getByLabelText('GitHub');
    fireEvent.change(githubInput, { target: { value: 'https://github.com/updated' } });

    const saveLinksBtn = screen.getByRole('button', { name: /save links/i });
    fireEvent.click(saveLinksBtn);

    await waitFor(() => {
      expect(profileService.updateSocialLinks).toHaveBeenCalledWith({
        linkedin: 'https://linkedin.com/in/janedoe',
        github: 'https://github.com/updated',
        portfolio: 'https://janedoe.dev',
      });
    });
  });

  it('prevents password submit on mismatch and succeeds when passwords match', async () => {
    profileService.getProfile.mockResolvedValueOnce({ data: initialProfileData });
    profileService.changePassword.mockResolvedValue({});

    render(<ProfilePage />);
    await waitFor(() => expect(profileService.getProfile).toHaveBeenCalled());

    const currentPwdInput = screen.getByLabelText('Current password');
    const newPwdInput = screen.getByLabelText('New password');
    const confirmPwdInput = screen.getByLabelText('Confirm password');
    const updatePwdBtn = screen.getByRole('button', { name: /update password/i });

    // Mismatched passwords
    fireEvent.change(currentPwdInput, { target: { value: 'oldpass123' } });
    fireEvent.change(newPwdInput, { target: { value: 'newpass123' } });
    fireEvent.change(confirmPwdInput, { target: { value: 'different123' } });
    fireEvent.click(updatePwdBtn);

    expect(profileService.changePassword).not.toHaveBeenCalled();

    // Matching passwords
    fireEvent.change(confirmPwdInput, { target: { value: 'newpass123' } });
    fireEvent.click(updatePwdBtn);

    await waitFor(() => {
      expect(profileService.changePassword).toHaveBeenCalledWith({
        currentPassword: 'oldpass123',
        newPassword: 'newpass123',
      });
    });
  });

  it('deletes user account after confirmation and navigates to login', async () => {
    profileService.getProfile.mockResolvedValueOnce({ data: initialProfileData });
    profileService.deleteAccount.mockResolvedValue({});

    render(<ProfilePage />);
    await waitFor(() => expect(profileService.getProfile).toHaveBeenCalled());

    const deleteBtn = screen.getByRole('button', { name: /delete account/i });
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to permanently delete your account?'
    );

    await waitFor(() => {
      expect(profileService.deleteAccount).toHaveBeenCalledTimes(1);
      expect(clearAuthData).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });
});