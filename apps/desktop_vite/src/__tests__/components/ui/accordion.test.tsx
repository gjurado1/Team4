import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../app/components/ui/accordion';

describe('Accordion', () => {
  it('renders with single item and toggles content', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument();
    expect(document.querySelector('[data-slot="accordion-content"]')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="accordion"]')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Section 1' }));
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('AccordionItem has data-slot and className', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="x" className="custom">
          <AccordionTrigger>T</AccordionTrigger>
          <AccordionContent>C</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const item = document.querySelector('[data-slot="accordion-item"]');
    expect(item).toHaveClass('custom');
  });
});
