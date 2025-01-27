import Navbar from './smallComponents/Navbar';
import Footer from './smallComponents/Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow mt-16">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
