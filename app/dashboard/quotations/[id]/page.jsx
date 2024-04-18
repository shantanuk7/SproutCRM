import { Quotation } from "@/app/lib/models";
import styles from "@/app/ui/dashboard/quotations/SingleQuotation.module.css"
import { connectToDB } from "@/app/lib/utils";
// import { fetchQuotation } from "@/app/lib/data";
import GeneratePdf from "@/app/ui/dashboard/quotations/GeneratePdf";

export const fetchQuotation = async (id)=>{
  "use server"
  try {
    await connectToDB();
    const quotation = await Quotation.findById(id).populate('items.product'); // Populate product information for each item
    console.log("\n===GOT QUOTATION DATA:===\n" + quotation);
    return quotation;
  } catch (error) {
    console.error("Failed to fetch quotation:", error);
    throw new Error("Failed to fetch quotation!");
  }
}

const SingleQuotationPage = async ({ params }) => {
  const { id } = params;
  const quotation = await fetchQuotation(id);

  return (
    <div className={styles.container}>
      <h2>Quotation Details</h2>
      <table className={styles.quotationTable}>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quotation.clientName}</td>
            <td>{quotation.companyName}</td>
            <td>{quotation.email}</td>
            <td>{quotation.phone}</td>
          </tr>
        </tbody>
      </table>

      <h2>Quotation Items</h2>
      <table className={styles.quotationTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {quotation.items.map((item) => (
            <tr key={item._id}>
              <td>{item.product.title}</td> {/* Access product name from populated data */}
              <td>{item.product.desc}</td> {/* Access product description */}
              <td>{item.product.price}</td>
              <td>{item.quantity}</td>
              {/* Calculate and display total price per item (product price * quantity) */}
              <td>{item.product.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <GeneratePdf quotation={quotation} /> */}
    </div>
  );
};

export default SingleQuotationPage;
