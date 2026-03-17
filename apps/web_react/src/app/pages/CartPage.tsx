import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, CheckCircle, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/cart' } } });
    return null;
  }

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsCheckoutComplete(true);

    setTimeout(() => {
      clearCart();
      setTimeout(() => {
        setIsCheckoutComplete(false);
        navigate('/');
      }, 2000);
    }, 3000);
  };

  if (isCheckoutComplete) {
    return (
      <div className="cc-page cart-page cart-state">
        <div className="cc-card cart-state__card">
          <div className="cart-state__icon cart-state__icon--success">
            <CheckCircle className="cc-icon cc-icon--xl" aria-hidden="true" />
          </div>
          <h1 className="cart-state__title">Purchase Successful!</h1>
          <p className="cart-state__text">
            Thank you for choosing CareConnect. You&apos;ll receive a confirmation email shortly
            with your subscription details.
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cc-page cart-page">
        <div className="cc-container cart-state">
          <div className="cart-state__card cart-state__card--empty">
            <div className="cart-state__icon">
              <ShoppingCart className="cart-state__icon-symbol" aria-hidden="true" />
            </div>
            <h1 className="cart-state__title">Your Cart is Empty</h1>
            <p className="cart-state__text">
              Add a subscription plan to get started with CareConnect.
            </p>
            <button
              type="button"
              className="cc-btn cc-btn--primary"
              onClick={() => navigate('/#pricing')}
            >
              View Pricing Plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="cc-page cart-page">
      <div className="cc-container">
        <header className="cart-page__header">
          <h1 className="cart-page__title">Shopping Cart</h1>
          <p className="cart-page__subtitle">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </header>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article key={item.id} className="cc-card cart-item">
                <div className="cart-item__layout">
                  <div className="cc-stack cc-stack--md">
                    <h2 className="cart-item__title">{item.planName} Plan</h2>
                    <p className="cart-item__description">{item.description}</p>

                    <div className="cart-item__price">
                      {item.price !== 'Custom' ? (
                        <span className="cart-item__price-value">${item.price}</span>
                      ) : null}
                      <span className="cart-item__price-period">{item.period}</span>
                    </div>
                  </div>

                  <div className="cart-item__footer">
                    <div className="cart-quantity">
                      <span className="cart-quantity__label">Quantity:</span>
                      <div className="cart-quantity__controls">
                        <button
                          type="button"
                          className="cc-btn cc-btn--ghost cc-btn--icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity for ${item.planName}`}
                        >
                          <Minus className="cc-icon cc-icon--sm" aria-hidden="true" />
                        </button>
                        <span className="cart-quantity__value">{item.quantity}</span>
                        <button
                          type="button"
                          className="cc-btn cc-btn--ghost cc-btn--icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.planName}`}
                        >
                          <Plus className="cc-icon cc-icon--sm" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="cc-btn cc-btn--danger-outline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="cc-icon cc-icon--sm" aria-hidden="true" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="cc-card cc-card--strong cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>

            <div className="cart-summary__totals">
              <div className="cart-summary__row">
                <span className="cart-summary__row-label">Subtotal</span>
                <span className="cart-summary__row-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span className="cart-summary__row-label">Tax</span>
                <span className="cart-summary__row-value">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-summary__total">
              <span className="cart-summary__total-label">Total</span>
              <span className="cart-summary__total-value">${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="cc-btn cc-btn--primary cc-btn--wide"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              <span>{isProcessing ? 'Processing...' : 'Proceed to Checkout'}</span>
              {!isProcessing ? <ArrowRight className="cc-icon cc-icon--md" aria-hidden="true" /> : null}
            </button>

            <p className="cart-summary__note">Secure checkout. Cancel anytime.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
