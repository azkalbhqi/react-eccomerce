import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import Welcome from './components/bigComponents/Welcome'
import "swiper/css";


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Welcome from './components/bigComponents/Welcome';
import Store from './components/bigComponents/Stores';
import ProductDetails from './components/bigComponents/ProductDetails';
import About from './components/bigComponents/About';

import './css/App.css'

const App = () =>{
  return(
    <>
      <Router>
      {/* Navbar remains consistent across all pages */}
      
      {/* Define routes for each page */}
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </>
  )
}

export default App