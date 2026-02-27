import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../../app/components/ui/collapsible';

describe('Collapsible', () => {
  it('renders and toggles content', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );
    expect(document.querySelector('[data-slot="collapsible"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle' })).toHaveAttribute('data-slot', 'collapsible-trigger');
    expect(document.querySelector('[data-slot="collapsible-content"]')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Hidden content')).toBeInTheDocument();
  });
});
