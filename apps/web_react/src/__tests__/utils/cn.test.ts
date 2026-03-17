import { cn } from '../../app/components/ui/utils';

describe('cn', () => {
  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('');
  });

  it('merges plain class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, null, 'baz')).toBe('foo baz');
  });

  it('handles conditional object syntax', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('resolves conflicting Tailwind classes (last one wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('merges Tailwind classes without conflict correctly', () => {
    expect(cn('p-2', 'mt-4')).toBe('p-2 mt-4');
  });

  it('handles array inputs', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });
});
