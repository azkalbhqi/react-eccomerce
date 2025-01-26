import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import Layout from "../Layout";

const WelcomePage = () => {
  const [products, setProducts] = useState([]);
  const [counter, setCounter] = useState(60); // Example initial counter value (seconds)

  // Fetch products from API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1); // Decrease counter by 1 every second
      }
    }, 1000);

    return () => clearInterval(interval); // Clear interval when the component unmounts
  }, [counter]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={3} // Adjust how many slides are visible at once
          loop={true}
          autoplay={{
            delay: 3000, // Slide changes every 3 seconds
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1, // 1 slide on small screens
            },
            768: {
              slidesPerView: 2, // 2 slides on medium screens
            },
            1024: {
              slidesPerView: 3, // 3 slides on larger screens
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p>{product.description.substring(0, 100)}...</p>
                  <p className="text-lg font-bold">${product.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold">Flash sale in</h1>
        </div>
        <div className="flex justify-center">
        
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-8">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 15 }}></span>
            </span>
            days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 10 }}></span>
            </span>
            hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 24 }}></span>
            </span>
            min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
                <span style={{ "--value": counter }}></span> {/* Use the dynamic counter value */}
            </span>
            sec
            </div>
        </div>
        </div>
      
    </Layout>
  );
};

export default WelcomePage;
