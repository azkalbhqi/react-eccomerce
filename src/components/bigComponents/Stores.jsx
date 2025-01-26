import { useState, useEffect } from 'react';
import Layout from '../Layout';
import Card from '../smallComponents/Card';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Debugging: Check fetched data
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (<div className="grid place-items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>)
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Store;
