
import Navbar from './smallComponents/Navbar';
import Footer from './smallComponents/Footer';
import { Outlet } from 'react-router-dom';
import { Children } from 'react';

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
        <Outlet /> {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
