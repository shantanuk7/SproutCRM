"use server"
import QuotationForm from "@/app/ui/quotations/QuotationForm";
import { addQuotation } from "@/app/lib/actions";
import { connectToDB } from "@/app/lib/utils";
import { Product, Client } from "@/app/lib/models";
import styles from "@/app/ui/dashboard/quotation/addQuotation.module.css";

export const fetchClients = async (searchQuery) => {
  "use server";
  const regex = new RegExp(searchQuery, "i");
  try {
    await connectToDB();
    const clients = await Client.find({ clientName: { $regex: regex } }).limit(10);
    return clients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};


export const fetchQuotationProducts = async (searchQuery) => {
  "use server"
  const regex = new RegExp(searchQuery, "i");
  try {
    connectToDB();
    const products = await Product.find({ title: { $regex: regex } }).limit(10);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const AddQuotationPage = () => {
  return (
    <div className={styles.container}>
      <h1>Add Quotation</h1>
      <QuotationForm addQuotation={addQuotation} fetchProducts={fetchQuotationProducts} fetchClients={fetchClients}/>
    </div>
  );
};

export default AddQuotationPage;
