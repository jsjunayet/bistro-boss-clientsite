import React from 'react';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-16 h-16 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Failed</h2>
        <p className="mb-4">We're sorry, but your payment could not be processed. Please try again.</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => window.location.href = '/card'}
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
