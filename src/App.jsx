import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import Welcome from './components/bigComponents/Welcome';
import Store from './components/bigComponents/Stores';
import ProductDetails from './components/bigComponents/ProductDetails';
import About from './components/bigComponents/About';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes inside the Layout to apply Navbar and Footer to each */}
        <Route>
          <Route path="/" element={<Welcome />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
