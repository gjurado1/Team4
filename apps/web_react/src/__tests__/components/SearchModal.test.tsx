import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { SearchModal } from '../../app/components/SearchModal';

let mockNavigate: jest.Mock;
const mockOnClose = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

function renderModal(isOpen = true) {
  return render(<SearchModal isOpen={isOpen} onClose={mockOnClose} />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockOnClose.mockReset();
});

describe('SearchModal', () => {
  it('returns nothing when isOpen is false', () => {
    const { container } = renderModal(false);
    expect(container.firstChild).toBeNull();
  });

  it('renders when isOpen is true', () => {
    renderModal();
    expect(screen.getByRole('dialog', { name: /search/i })).toBeInTheDocument();
  });

  it('renders the search input', () => {
    renderModal();
    expect(screen.getByRole('textbox', { name: /search input/i })).toBeInTheDocument();
  });

  it('shows "Quick Access" section when query is empty', () => {
    renderModal();
    expect(screen.getByText(/quick access/i)).toBeInTheDocument();
  });

  it('shows matching results when typing a query', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByRole('textbox', { name: /search input/i }), 'health');
    expect(screen.getByText(/health records management/i)).toBeInTheDocument();
  });

  it('shows "No results found" for an unmatched query', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByRole('textbox', { name: /search input/i }), 'xyzxyzxyz');
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('close button calls onClose', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole('button', { name: /close search/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('pressing Escape calls onClose', () => {
    renderModal();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('clicking the backdrop calls onClose', async () => {
    const user = userEvent.setup();
    renderModal();
    // The backdrop is the outer dialog div; click it directly
    await user.click(screen.getByRole('dialog', { name: /search/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('clicking a result calls onClose', async () => {
    const user = userEvent.setup();
    renderModal();
    // Click a quick access item
    const firstResult = screen.getAllByRole('button').find(
      (btn) => btn.className.includes('search-modal__result')
    );
    expect(firstResult).toBeDefined();
    await user.click(firstResult!);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('ArrowDown key moves selection to next result', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByRole('textbox', { name: /search input/i }), 'plan');
    const results = screen.getAllByRole('button').filter((btn) =>
      btn.className.includes('search-modal__result')
    );
    // First result is selected initially
    expect(results[0]).toHaveAttribute('data-selected', 'true');
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    expect(results[1]).toHaveAttribute('data-selected', 'true');
  });

  it('ArrowUp key moves selection to previous result', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.type(screen.getByRole('textbox', { name: /search input/i }), 'plan');
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowUp' });
    const results = screen.getAllByRole('button').filter((btn) =>
      btn.className.includes('search-modal__result')
    );
    expect(results[0]).toHaveAttribute('data-selected', 'true');
  });
});
