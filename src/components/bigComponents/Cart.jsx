import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../Layout";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await fetch("https://fakestoreapi.com/carts/1");
        const productResponse = await fetch("https://fakestoreapi.com/products");

        if (!cartResponse.ok || !productResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const cartData = await cartResponse.json();
        const productData = await productResponse.json();

        setCart(cartData);
        setProducts(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cart && products.length > 0) {
      // Recalculate the total whenever the cart or products change
      const totalPrice = cart.products.reduce((acc, cartProduct) => {
        const productDetails = products.find(product => product.id === cartProduct.productId);
        return acc + (productDetails.price * cartProduct.quantity);
      }, 0);
      setTotal(totalPrice);
    }
  }, [cart, products]);

  const handleQuantityChange = (productId, delta) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.map((product) =>
        product.productId === productId
          ? { ...product, quantity: Math.max(product.quantity + delta, 0) }
          : product
      ),
    }));
  };

  const handleSave = () => {
    navigate('/payment', { state: { total } });
  };

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="grid gap-4">
          {cart.products.map((cartProduct) => {
            const productDetails = products.find((product) => product.id === cartProduct.productId);
            const subTotal = productDetails.price * cartProduct.quantity;

            return (
              <div
                key={cartProduct.productId}
                className="card card-compact bg-base-100 shadow-xl flex flex-row"
              >
                <figure className="w-1/3">
                  <img
                    src={productDetails.image}
                    alt={productDetails.title}
                    className="w-full object-cover"
                  />
                </figure>
                <div className="card-body w-2/3">
                  <h2 className="card-title">{productDetails.title || "Product"}</h2>
                  <p className="font-bold">Price: ${productDetails.price || 0}</p>
                  <p className="font-bold">Sub Total: ${subTotal.toFixed(2)}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleQuantityChange(cartProduct.productId, -1)}
                    >
                      -
                    </button>
                    <span className="font-bold">{cartProduct.quantity}</span>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleQuantityChange(cartProduct.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="font-bold">Total: ${total.toFixed(2)}</p>
          <button
            className="btn btn-primary"
            onClick={handleSave}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
