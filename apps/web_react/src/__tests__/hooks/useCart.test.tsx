import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart, CartItem } from '../../app/contexts/CartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockItemBase: Omit<CartItem, 'quantity' | 'addedAt'> = {
  id: 'plan-basic',
  planName: 'Basic Plan',
  price: '9.99',
  period: 'month',
  description: 'Entry-level plan',
  features: ['Feature A', 'Feature B'],
};

const anotherItemBase: Omit<CartItem, 'quantity' | 'addedAt'> = {
  id: 'plan-pro',
  planName: 'Pro Plan',
  price: '19.99',
  period: 'month',
  description: 'Professional plan',
  features: ['Feature X', 'Feature Y'],
};

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('throws when used outside of CartProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider'
    );
    consoleSpy.mockRestore();
  });

  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('restores cart from localStorage on mount', () => {
    const storedItem: CartItem = { ...mockItemBase, quantity: 2, addedAt: new Date().toISOString() };
    localStorage.setItem('careconnect_cart', JSON.stringify([storedItem]));
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  describe('addToCart', () => {
    it('adds a new item with quantity 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].planName).toBe('Basic Plan');
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('increments quantity when the same item is added again', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.addToCart(mockItemBase));
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('stores separate items for different plans', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.addToCart(anotherItemBase));
      expect(result.current.items).toHaveLength(2);
    });

    it('persists the cart to localStorage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      const stored = JSON.parse(localStorage.getItem('careconnect_cart') ?? '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].planName).toBe('Basic Plan');
    });
  });

  describe('removeFromCart', () => {
    it('removes the specified item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.removeFromCart('plan-basic'));
      expect(result.current.items).toHaveLength(0);
    });

    it('does nothing when the item id does not exist', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.removeFromCart('nonexistent'));
      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('updates the quantity of an existing item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.updateQuantity('plan-basic', 5));
      expect(result.current.items[0].quantity).toBe(5);
    });

    it('removes the item when quantity is set to 0', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.updateQuantity('plan-basic', 0));
      expect(result.current.items).toHaveLength(0);
    });

    it('removes the item when quantity is negative', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.updateQuantity('plan-basic', -1));
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('empties all items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.addToCart(anotherItemBase));
      act(() => result.current.clearCart());
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('getTotalItems', () => {
    it('sums quantities across all items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.addToCart(mockItemBase)); // qty = 2
      act(() => result.current.addToCart(anotherItemBase)); // qty = 1
      expect(result.current.getTotalItems()).toBe(3);
    });
  });

  describe('getTotalPrice', () => {
    it('calculates the total for a single item with quantity > 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase));
      act(() => result.current.addToCart(mockItemBase)); // qty = 2 → 2 * 9.99
      expect(result.current.getTotalPrice()).toBeCloseTo(19.98);
    });

    it('sums across multiple different items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      act(() => result.current.addToCart(mockItemBase)); // 9.99
      act(() => result.current.addToCart(anotherItemBase)); // 19.99
      expect(result.current.getTotalPrice()).toBeCloseTo(29.98);
    });

    it('skips items with price "Custom"', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      const customItem = { ...mockItemBase, id: 'plan-custom', price: 'Custom' };
      act(() => result.current.addToCart(customItem));
      expect(result.current.getTotalPrice()).toBe(0);
    });

    it('returns 0 for an empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      expect(result.current.getTotalPrice()).toBe(0);
    });
  });
});
