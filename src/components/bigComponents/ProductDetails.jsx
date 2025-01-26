import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details based on id from the API
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]); // Re-fetch when the id changes

  if (loading) {
    return (<div className="grid place-items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>)
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { title, price, description, image, category } = product;

  return (
    <Layout>

    
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={image}
            alt={title}
            className="w-full h-96 object-cover"
          />
        </figure>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-lg font-bold">${price}</p>
          <p>{description}</p>
        </div>
          <p className="badge-primary p-2 rounded-full w-1/4">{category}</p>
      </div>
    </div>
    </Layout>
  );
};

export default ProductDetails;
