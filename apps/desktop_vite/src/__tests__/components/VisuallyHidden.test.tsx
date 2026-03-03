import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from '../../app/components/VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders children in the document', () => {
    render(
      <VisuallyHidden>
        <span data-testid="hidden-content">Screen reader only text</span>
      </VisuallyHidden>,
    );
    expect(screen.getByTestId('hidden-content')).toBeInTheDocument();
    expect(screen.getByText('Screen reader only text')).toBeInTheDocument();
  });

  it('uses sr-only class for accessibility', () => {
    const { container } = render(
      <VisuallyHidden>
        <span>Hidden</span>
      </VisuallyHidden>,
    );
    const wrapper = container.querySelector('.sr-only');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies off-screen positioning styles', () => {
    const { container } = render(
      <VisuallyHidden>
        <span>Hidden</span>
      </VisuallyHidden>,
    );
    const span = container.querySelector('.sr-only');
    expect(span).toHaveStyle({ position: 'absolute' });
    expect(span).toHaveStyle({ left: '-10000px' });
  });

  it('renders multiple children', () => {
    render(
      <VisuallyHidden>
        <span>First</span>
        <span>Second</span>
      </VisuallyHidden>,
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
