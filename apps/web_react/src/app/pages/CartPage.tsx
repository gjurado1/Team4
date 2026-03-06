import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, CheckCircle } from 'lucide-react';

export function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = React.useState(false);

  if (!isAuthenticated) {
    navigate('/login', { state: { from: { pathname: '/cart' } } });
    return null;
  }

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsCheckoutComplete(true);
    
    // Clear cart after successful checkout
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
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg)',
          paddingTop: 'calc(var(--header-height) + var(--space-8))',
          paddingBottom: 'var(--space-10)',
          paddingLeft: 'var(--space-5)',
          paddingRight: 'var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            textAlign: 'center',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-10)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
            }}
          >
            <CheckCircle size={48} color="white" />
          </div>
          <h1
            style={{
              fontSize: 'var(--font-size-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Purchase Successful! 🎉
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--line-height-base)',
            }}
          >
            Thank you for choosing CareConnect. You'll receive a confirmation email shortly with your subscription details.
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg)',
          paddingTop: 'calc(var(--header-height) + var(--space-8))',
          paddingBottom: 'var(--space-10)',
          paddingLeft: 'var(--space-5)',
          paddingRight: 'var(--space-5)',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: 'var(--space-10)',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
            }}
          >
            <ShoppingCart size={60} color="var(--color-text-muted)" />
          </div>
          <h1
            style={{
              fontSize: 'var(--font-size-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Your Cart is Empty
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Add a subscription plan to get started with CareConnect
          </p>
          <button
            type="button"
            onClick={() => navigate('/#pricing')}
            style={{
              padding: 'var(--space-4) var(--space-6)',
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-fg)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-body)',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--duration-fast) var(--ease-standard)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--btn-primary-hover-bg)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--btn-primary-bg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Pricing Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        paddingTop: 'calc(var(--header-height) + var(--space-8))',
        paddingBottom: 'var(--space-10)',
        paddingLeft: 'var(--space-5)',
        paddingRight: 'var(--space-5)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 'var(--space-8)',
          }}
        >
          <h1
            style={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Shopping Cart
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-6)',
          }}
          className="cart-layout"
        >
          {/* Cart Items */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-5)',
                  }}
                  className="cart-item-layout"
                >
                  {/* Item Info */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: 'var(--font-size-h3)',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {item.planName} Plan
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text-muted)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {item.price !== 'Custom' && (
                        <span
                          style={{
                            fontSize: 'var(--font-size-h2)',
                            fontWeight: 900,
                            color: 'var(--color-text)',
                          }}
                        >
                          ${item.price}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 'var(--font-size-body)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 'var(--space-4)',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--font-size-body)',
                          fontWeight: 600,
                          color: 'var(--color-text)',
                        }}
                      >
                        Quantity:
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          background: 'var(--color-surface)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-1)',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '36px',
                            height: '36px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>
                        <span
                          style={{
                            minWidth: '40px',
                            textAlign: 'center',
                            fontSize: 'var(--font-size-body)',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '36px',
                            height: '36px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'transparent',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        fontSize: 'var(--font-size-body)',
                        fontWeight: 600,
                        transition: 'all var(--duration-fast) var(--ease-standard)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ef4444';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#ef4444';
                      }}
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div
            style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--color-brand-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-7)',
              boxShadow: 'var(--shadow-glow)',
              position: 'sticky',
              top: 'calc(var(--header-height) + var(--space-4))',
              alignSelf: 'flex-start',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--font-size-h3)',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                paddingBottom: 'var(--space-5)',
                marginBottom: 'var(--space-5)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-body)',
                }}
              >
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-body)',
                }}
              >
                <span style={{ color: 'var(--color-text-muted)' }}>Tax</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                  ${(getTotalPrice() * 0.1).toFixed(2)}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 'var(--space-6)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontSize: 'var(--font-size-h2)',
                  fontWeight: 900,
                  color: 'var(--color-text)',
                }}
              >
                ${(getTotalPrice() * 1.1).toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 700,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-3)',
                transition: 'all var(--duration-fast) var(--ease-standard)',
                opacity: isProcessing ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.background = 'var(--btn-primary-hover-bg)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow-hover)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--btn-primary-bg)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              {!isProcessing && <ArrowRight size={20} />}
            </button>

            <p
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
              }}
            >
              Secure checkout · Cancel anytime
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr 400px !important;
          }
          .cart-item-layout {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}
