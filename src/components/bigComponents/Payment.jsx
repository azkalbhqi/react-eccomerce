import { Navigate, useLocation } from 'react-router-dom';
import Layout from "../Layout";

const Payment = () => {
  const location = useLocation();
  const { total } = location.state || { total: 0 };

  const handlePayment = () => {
    // Create the pop-up container
    const popup = document.createElement('div');
    popup.setAttribute('role', 'alert');
    popup.classList.add('popup', 'alert', 'alert-success');
  
    // Add content to the pop-up
    popup.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Your purchase of $${total.toFixed(2)} has been confirmed!</span>
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
        popup.remove(),
        navigate('/store');
    }, 2000); // Pop-up disappears after 5 seconds
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <div className="card card-compact bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-xl font-semibold mb-4">Total Amount: ${total.toFixed(2)}</h2>
            <button
              className="btn btn-success"
              onClick={handlePayment}
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
