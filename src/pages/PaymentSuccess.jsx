import  {  useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import UseAuth from '../Hooks/UseAuth';

const PaymentSuccess = () => {
  const { tran_id } = useParams();
  const {setTranID}=UseAuth()
  setTranID(tran_id)
   // Destructure tran_id directly
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getsuccess/${tran_id}`);
        setOrderData(res.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [tran_id]);

  const downloadPDF = async () => {
    const input = document.getElementById('congrats-content');
    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      if (orderData) {
        // Adding order data to the PDF
        pdf.setFontSize(12);
        let yOffset = pdfHeight + 10;
        const orderDetails = [
          `Order Details:`,
          `Name: ${orderData.name}`,
          `Phone: ${orderData.phone}`,
          `Address: ${orderData.address}`,
          `Date: ${new Date(orderData.date).toLocaleString()}`,
          `Postal Code: ${orderData.postalCode}`,
          `Email: ${orderData.email}`,
          `Items: ${orderData.itemNames}`,
          `Status: ${orderData.status}`,
          `Price: $${orderData.price.toFixed(2)}`,
          `Transaction ID: ${orderData.transactionID}`
        ];

        orderDetails.forEach(detail => {
          pdf.text(10, yOffset, detail);
          yOffset += 10;
        });
      }

      pdf.save('congratulations.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="flex mt-10 md:mt-0 flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6 text-center">
      <div>
        <header className="md:mb-5 mb-2">
          <h1 className="md:text-4xl text-2xl font-bold text-gray-800">Congratulations!</h1>
        </header>
        <main id="congrats-content" className="flex flex-col flex-1 items-center justify-center">
          <div className="md:mb-8 mb-3">
            <h2 className="md:text-3xl text-xl font-semibold text-green-600">Payment Successful</h2>
            <p className="mt-4 md:text-lg text-sm text-gray-700">Thank you for your payment. Your transaction has been completed successfully.</p>
            <p className="mt-2 md:text-lg text-sm text-gray-700">We appreciate your business and hope you enjoy our services.</p>
          </div>
          <div className=" md:flex-row flex flex-col space-y-3 md:space-x-4">
            <button
              className="px-6 py-2 bg-green-600 text-white  font-semibold rounded hover:bg-green-700 transition duration-300"
              onClick={() => window.location.href = '/'}
            >
              Go to Home
            </button>
           
            <Link to={'/profile'}>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition duration-300">
                View Profile
              </button>
            </Link>
          
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
              onClick={downloadPDF}
            >
              Download PDF
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentSuccess;
