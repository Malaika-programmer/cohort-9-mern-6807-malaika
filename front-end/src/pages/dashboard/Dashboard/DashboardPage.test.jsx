import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './Dashboard';
import { getUser } from '../../../utils/auth';

vi.mock('../../../utils/auth', () => ({
  getUser: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async importActual => ({
  ...(await importActual('react-router-dom')),
  useNavigate: () => mockNavigate
}));

describe('DashboardPage Component', () => {
  const mockNotes = [
    {
      id: '1',
      title: 'First Note',
      content: 'Content of first note',
      createdAt: new Date().toISOString(),
      updatedAt: new Date(Date.now() - 10000).toISOString(),
    },
    {
      id: '2',
      title: 'Second Note',
      content: 'Content of second note',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Third Note',
      content: 'Content of third note',
      createdAt: new Date().toISOString(),
      updatedAt: new Date(Date.now() - 50000).toISOString(),
    },
    {
      id: '4',
      title: 'Fourth Note',
      content: 'Content of fourth note',
      createdAt: new Date().toISOString(),
      updatedAt: new Date(Date.now() - 60000).toISOString(),
    },
    {
      id: '5',
      title: 'Fifth Note',
      content: 'Content of fifth note',
      createdAt: new Date().toISOString(),
      updatedAt: new Date(Date.now() - 70000).toISOString(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    global.fetch = vi.fn();
    getUser.mockReturnValue({ fullName: 'Alex Morgan' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders welcome banner with user name and primary note creation action', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /welcome back Alex Morgan/i })).toBeInTheDocument();

    const createNoteBtns = screen.getAllByRole('button', { name: /^create note$/i });
    fireEvent.click(createNoteBtns[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/notes');
  });

  it('fetches and displays recent notes, calculates statistics, and caps displayed notes to 4', async () => {
    localStorage.setItem('token', 'valid-auth-token');
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/notes', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer valid-auth-token',
        },
      });
    });

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('4 created this week')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 3, name: 'Second Note' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'First Note' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: 'Fifth Note' })).not.toBeInTheDocument();

    const viewAllBtn = screen.getByRole('button', { name: /view all notes/i });
    fireEvent.click(viewAllBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/notes');
  });

  it('displays empty state card when no notes are returned', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    const emptyHeading = await screen.findByRole('heading', { level: 3, name: /no notes yet/i });
    expect(emptyHeading).toBeInTheDocument();

    const emptyCard = emptyHeading.closest('div');
    const emptyCreateNoteBtn = within(emptyCard).getByRole('button', { name: /^create note$/i });
    fireEvent.click(emptyCreateNoteBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/notes');
  });

  it('renders error state when fetch fails and allows retry', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Failed to fetch notes from server.' }),
    });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Failed to fetch notes from server.')).toBeInTheDocument();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });

    const tryAgainBtn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainBtn);

    expect(await screen.findByRole('heading', { level: 3, name: 'Second Note' })).toBeInTheDocument();
  });

  it('renders upcoming task items and navigates to task routes on click', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Complete dashboard frontend')).toBeInTheDocument();
    expect(screen.getByText('Review authentication validation')).toBeInTheDocument();
    expect(screen.getByText('Update project documentation')).toBeInTheDocument();

    const taskCard = screen.getByText('Complete dashboard frontend').closest('button');
    fireEvent.click(taskCard);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/tasks');
  });
});