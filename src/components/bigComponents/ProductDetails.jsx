import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';

const Rating = ({ rating }) => {
  const maxStars = 5;

  return (
    <div className="rating rating-sm">
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          className={`mask mask-star-2 ${
            index < Math.round(rating) ? 'bg-orange-400' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]); // Manage cart state

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
  
    // Prepare product data for the API
    const cartProduct = {
      productId: product.id,
      quantity: 1, // Assuming we're adding 1 product at a time
    };
  
    // Fetch the current cart data
    fetch('https://fakestoreapi.com/carts/1')
      .then((response) => response.json())
      .then((cartData) => {
        // Find if the product already exists in the cart
        const existingProduct = cartData.products.find(
          (item) => item.productId === product.id
        );
  
        // If product exists, update its quantity, otherwise add a new product
        const updatedProducts = existingProduct
          ? cartData.products.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...cartData.products, cartProduct];
  
        // Update the cart with the new product data
        fetch('https://fakestoreapi.com/carts/1', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...cartData,
            products: updatedProducts,
          }),
        })
          .then((response) => response.json())
          .then((updatedCart) => {
            // After the cart is updated, update the local cart state to trigger UI changes
            setCart(updatedCart.products);  // Update the local state with the updated cart products
            const popup = document.createElement('div');
    popup.setAttribute('role', 'alert');
    popup.classList.add('popup', 'alert', 'alert-success', 'w-1/3');
  
    // Add content to the pop-up
    popup.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${product.title} has been added to your cart!</span>
    `;
  
    // Style the pop-up to appear in the center of the screen
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#28a745';
    popup.style.color = 'white';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.zIndex = '1000';
  
    // Append pop-up to the body
    document.body.appendChild(popup);
  
    // Remove pop-up after a few seconds
    setTimeout(() => {
      popup.remove();
    }, 5000);

          })
          .catch((error) => {
            console.error('Error updating cart:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  };
  
  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="space-y-4">
          <div className="w-80 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-96 h-96 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-80 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-72 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">Failed to load product details. Please try again later.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="grid place-items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">Product not found</p>
      </div>
    );
  }

  const { title, price, description, image, category, rating } = product;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="card bg-base-100 shadow-xl lg:flex">
          <figure className="lg:w-1/2">
            <img
              src={image}
              alt={title}
              className="max-h-96 rounded-lg object-cover"
            />
          </figure>
          <div className="flex flex-col justify-between p-6 lg:w-1/2">
            <div>
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <p className="text-xl font-semibold  mb-4">${price}</p>
              <p className="">{description}</p>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <p className="px-2">{rating?.rate}</p>
                </div>
                <p className="badge badge-primary px-4 py-1 rounded-full capitalize">
                  {category}
                </p>
              </div>
              <p className="text-sm mt-2">{rating?.count || 0} reviews</p>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <div className="text-sm">
                  {cart.length} item(s) in cart
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
