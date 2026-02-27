import { describe, it, expect } from 'vitest';
import { cn } from '../../../app/components/ui/utils';

describe('cn (utils)', () => {
  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('');
  });

  it('merges single string', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('merges multiple strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional class with object', () => {
    expect(cn('base', { active: true })).toContain('base');
    expect(cn('base', { active: true })).toContain('active');
    expect(cn('base', { active: false })).toBe('base');
  });

  it('handles array of classes', () => {
    expect(cn(['a', 'b'])).toContain('a');
    expect(cn(['a', 'b'])).toContain('b');
  });

  it('uses tailwind-merge to resolve conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('handles undefined and null', () => {
    expect(cn('a', undefined, null, 'b')).toContain('a');
    expect(cn('a', undefined, null, 'b')).toContain('b');
  });
});
