// src/CongratulationsPage.js


const PaymentSuccess = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6 text-center">
     <div>
     <header className="">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">Congratulations!</h1>
      </header>
      <main className="flex flex-col flex-1 items-center justify-center">
        <div className="mt-5">
          <h2 className="text-3xl font-semibold text-green-600">Payment Successful</h2>
          <p className="mt-4 text-lg text-gray-700">Thank you for your payment. Your transaction has been completed successfully.</p>
          <p className="mt-2 text-lg text-gray-700">We appreciate your business and hope you enjoy our services.</p>
        </div>
        <div className="flex space-x-4 mt-5">
          <button
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
            onClick={() => window.location.href = '/dashboard'}
          >
            Go to Dashboard
          </button>
          <button
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition duration-300"
            onClick={() => window.location.href = '/orders'}
          >
            View Order Details
          </button>
        </div>
      </main>
     </div>
    </div>
  );
};

export default PaymentSuccess;
