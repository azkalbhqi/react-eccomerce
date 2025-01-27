import { useEffect, useState } from 'react';

const Cart = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('https://fakestoreapi.com/carts')
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId, action) => {
    const updatedCart = { ...cart };
    updatedCart.products = updatedCart.products.map((product) =>
      product.productId === productId
        ? {
            ...product,
            quantity: action === 'increment' ? product.quantity + 1 : product.quantity - 1,
          }
        : product
    );
    setCart(updatedCart);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching cart data.</div>;
  }

  if (!cart) {
    return <div>Cart is empty.</div>;
  }

  return (
    <div className={`drawer drawer-end ${isOpen ? 'drawer-open' : ''}`}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={() => {}} />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={onClose}></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
          {cart[0].products.map((product) => (
            <li key={product.productId} className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span>Product {product.productId}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleQuantityChange(product.productId, 'decrement')}
                    className="btn btn-sm btn-secondary"
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(product.productId, 'increment')}
                    className="btn btn-sm btn-secondary"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
