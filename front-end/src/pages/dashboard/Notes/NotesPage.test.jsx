import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotesPage from './Notes';

vi.mock('../../../components/ui', () => ({
  Badge: ({ children }) => <span data-testid="badge">{children}</span>,
  Button: ({ children, onClick, disabled, type = 'button' }) => (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  IconBox: () => <div data-testid="icon-box" />,
  Input: ({ label, name, type, value, placeholder, onChange, error, 'aria-label': ariaLabel }) => (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={onChange}
      />
      {error && <small role="alert">{error}</small>}
    </div>
  ),
  SectionHeading: ({ eyebrow, title, description }) => (
    <div>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
}));

describe('NotesPage Component', () => {
  const mockNotes = [
    {
      id: '1',
      title: 'Alpha Note',
      content: 'This is the first comprehensive note content.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Beta Note',
      content: 'This is second note content for testing.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    global.fetch = vi.fn();
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and displays active notes along with statistics on mount', async () => {
    localStorage.setItem('token', 'auth-token-123');
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    render(<NotesPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/notes', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer auth-token-123',
        },
      });
    });

    expect(screen.getByText('Alpha Note')).toBeInTheDocument();
    expect(screen.getByText('Beta Note')).toBeInTheDocument();
    
    // Using getAllByText to avoid multiple element match errors
    expect(screen.getAllByText('2')[0]).toBeInTheDocument(); // Total notes stat
    expect(screen.getAllByText('1')[0]).toBeInTheDocument(); // Updated this week stat
  });

  it('filters and sorts notes according to search input and select values', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    render(<NotesPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByPlaceholderText('Search your notes...');
    fireEvent.change(searchInput, { target: { value: 'first' } });

    expect(screen.getByText('Alpha Note')).toBeInTheDocument();
    expect(screen.queryByText('Beta Note')).not.toBeInTheDocument();

    const clearBtn = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearBtn);

    expect(screen.getByText('Beta Note')).toBeInTheDocument();
  });

  it('switches to trash tab and loads trashed notes', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    render(<NotesPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const trashedNote = {
      id: '3',
      title: 'Trashed Note',
      content: 'Content of trashed note',
      updatedAt: new Date().toISOString(),
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [trashedNote] }),
    });

    // Select the first "Trash" button (the navigation tab)
    const trashTabBtn = screen.getAllByRole('button', { name: /^trash$/i })[0];
    fireEvent.click(trashTabBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/notes/trash', expect.any(Object));
    });

    expect(screen.getByText('Trashed Note')).toBeInTheDocument();
  });

  it('validates form inputs when creating a new note', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    render(<NotesPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const createBtn = screen.getByRole('button', { name: /create note/i });
    fireEvent.click(createBtn);

    const submitBtn = screen.getByRole('button', { name: /save note/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Content is required.')).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText('Enter note title');
    const contentInput = screen.getByPlaceholderText('Write your note here...');

    fireEvent.change(titleInput, { target: { value: 'Hi' } });
    fireEvent.change(contentInput, { target: { value: 'Short' } });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Title must be at least 3 characters.')).toBeInTheDocument();
    expect(screen.getByText('Content must be at least 10 characters.')).toBeInTheDocument();
  });

  it('successfully creates a new note and appends it to list', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    render(<NotesPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /create note/i }));

    const createdNote = {
      id: '10',
      title: 'New Valid Title',
      content: 'This is long enough content for validation',
      updatedAt: new Date().toISOString(),
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: createdNote }),
    });

    fireEvent.change(screen.getByPlaceholderText('Enter note title'), {
      target: { value: 'New Valid Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Write your note here...'), {
      target: { value: 'This is long enough content for validation' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save note/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/notes',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            title: 'New Valid Title',
            content: 'This is long enough content for validation',
          }),
        })
      );
    });

    expect(screen.getByText('New Valid Title')).toBeInTheDocument();
  });

  it('edits an existing note and updates the UI', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    render(<NotesPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    const updatedNote = {
      ...mockNotes[0],
      title: 'Updated Alpha Note Title',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: updatedNote }),
    });

    fireEvent.change(screen.getByPlaceholderText('Enter note title'), {
      target: { value: 'Updated Alpha Note Title' },
    });

    fireEvent.click(screen.getByRole('button', { name: /update note/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:5000/api/notes/${mockNotes[0].id}`,
        expect.objectContaining({ method: 'PUT' })
      );
    });

    expect(screen.getByText('Updated Alpha Note Title')).toBeInTheDocument();
  });

  it('moves note to trash when in active tab', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    render(<NotesPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Select the card-level action button (index 1) instead of the navigation tab (index 0)
    const trashButtons = screen.getAllByRole('button', { name: /trash/i });
    fireEvent.click(trashButtons[1]);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to move this note to trash?');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:5000/api/notes/${mockNotes[0].id}/trash`,
        expect.objectContaining({ method: 'PUT' })
      );
    });

    expect(screen.queryByText('Alpha Note')).not.toBeInTheDocument();
  });

  it('restores and permanently deletes notes when in trash tab', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    render(<NotesPage />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    // Select the navigation tab button (index 0)
    const trashTabBtn = screen.getAllByRole('button', { name: /^trash$/i })[0];
    fireEvent.click(trashTabBtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const restoreButton = screen.getAllByRole('button', { name: /restore/i })[0];
    fireEvent.click(restoreButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:5000/api/notes/${mockNotes[0].id}/restore`,
        expect.objectContaining({ method: 'PUT' })
      );
    });

    expect(screen.queryByText('Alpha Note')).not.toBeInTheDocument();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const deleteForeverBtn = screen.getByRole('button', { name: /delete forever/i });
    fireEvent.click(deleteForeverBtn);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to permanently delete this note? This action cannot be undone.'
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:5000/api/notes/${mockNotes[1].id}`,
        expect.objectContaining({ method: 'DELETE' })
      );
    });

    expect(screen.queryByText('Beta Note')).not.toBeInTheDocument();
  });

  it('displays API errors and allows retry', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Server error loading notes' }),
    });

    render(<NotesPage />);

    expect(await screen.findByText('Server error loading notes')).toBeInTheDocument();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    const tryAgainBtn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainBtn);

    expect(await screen.findByText('Alpha Note')).toBeInTheDocument();
  });
});