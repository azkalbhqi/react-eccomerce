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
      .then((data) => setProducts(data.slice(0, 5))) // Limit to 5 products
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

    <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          We are world’s potential market
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Here at MyStore we focus on markets where technology, innovation, and capital can unlock
          long-term value and drive economic growth.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="#product"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>

      <div className="container mx-auto p-4">

        <h2 id="product" className="text-2xl font-bold text-center mb-8">Featured Products</h2>

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
              <div className="card bg-base-100 max-h-max m-4 shadow-xl">
                <figure>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title h-10">{product.title}</h2>
                  <p>{product.description.substring(0, 50)}...</p>
                  <p className="text-lg font-bold">${product.price}</p>
                  
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
              <span style={{ "--value": counter }}></span>
            </span>
            sec
          </div>
        </div>
      </div>
      <div className="flex justify-center py-20">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomePage;
