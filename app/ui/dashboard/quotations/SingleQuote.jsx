"use client"

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

// Define the handler function for the page
export default function SingleQuote({ fetchQuotationData, id }) {

  const [quotation, setQuotation] = useState(null);

  useEffect(() => {
    console.log("Inside useEffect");
  }, [id]); 

  console.log("Rendering");
  // Function to handle printing
  const handlePrint = () => {
    if (quotation) {
      const doc = new jsPDF();
      doc.text(`Quotation Details\n\nClient Name: ${quotation.clientName}\nCompany Name: ${quotation.companyName}\nEmail: ${quotation.email}\nPhone: ${quotation.phone}\n\nItems:`, 10, 10);
      let y = 30;
      quotation.items.forEach((item, index) => {
        doc.text(`Product: ${item.product.title}, Quantity: ${item.quantity}`, 10, y);
        y += 10;
      });
      doc.save("quotation.pdf");
    }
  };

  return (
    <div className="quotation-container">
      <h1 className="quotation-title">Quotation Details</h1>
      {quotation && (
        <div className="quotation-details">
          <p><strong>Client Name:</strong> {quotation.clientName}</p>
          <p><strong>Company Name:</strong> {quotation.companyName}</p>
          <p><strong>Email:</strong> {quotation.email}</p>
          <p><strong>Phone:</strong> {quotation.phone}</p>
          <h2>Items</h2>
          <ul className="quotation-items">
            {quotation.items.map((item, index) => (
              <li key={index}>
                <p><strong>Product:</strong> {item.product.title}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
              </li>
            ))}
          </ul>
          <button className="print-button" onClick={handlePrint}>Download PDF</button>
        </div>
      )}
    </div>
  );
}
