"use client"
import jsPDF from "jspdf";

const GeneratePdf = async ({ quotation }) => {
    const generatePDF = () => {
      console.log("QUOTATION DATA: " + quotation);
    const doc = new jsPDF();
    const margin = 20;

    // Document title
    doc.setFont("helvetica", "bold");
    doc.text("Quotation", margin, margin + 10);

    // Client Information
    doc.setFont("helvetica", "normal");
    doc.text("Client Name:", margin, margin + 20);
    doc.text(quotation.clientName, margin + 20, margin + 20);
    doc.text("Company Name:", margin, margin + 25);
    doc.text(quotation.companyName || "N/A", margin + 20, margin + 25);
    doc.text("Email:", margin, margin + 30);
    doc.text(quotation.email || "N/A", margin + 20, margin + 30);
    doc.text("Phone:", margin, margin + 35);
    doc.text(quotation.phone || "N/A", margin + 20, margin + 35);

    // Quotation Items Table Header
    const y = margin + 45;
  // Simplified autoTable call (replace with your actual data)
    doc.autoTable({
        startY: margin + 45,
        head: [["Product", "Description", "Price", "Quantity", "Total"]],
        body: [
        ["Product 1", "Description 1", 10.00, 2, 20.00],
        ["Product 2", "Description 2", 15.00, 1, 15.00],
        ],
        styles: {
        fontSize: 10,
        cellPadding: 5,
        head: {
            fillColor: "#f2f2f2",
            textColor: "#000",
            fontStyle: "bold",
        },
        },
    });

    // Download the PDF
    doc.save("quotation.pdf");
  };

  return (
    <button onClick={generatePDF}>Download PDF</button>
  );
};

export default GeneratePdf;