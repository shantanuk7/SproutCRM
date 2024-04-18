// QuotationPage.jsx

import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchQuotations } from "@/app/lib/data";
import { deleteQuote } from "@/app/lib/actions";

const QuotationPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, quotations } = await fetchQuotations(q, page); // Assuming fetchQuotations is synchronous

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a quotation..." />
        <Link href="/dashboard/quotations/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Client Name</td>
            <td>Company Name</td>
            <td>Total Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation._id}>
              <td>{quotation.clientName}</td>
              <td>{quotation.companyName}</td>
              <td>{quotation.totalPrice}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/quotations/${quotation._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteQuote}>
                    <input type="hidden" name="id" value={JSON.stringify({ buffer: quotation._id })} />
                    <button
                      type="submit"
                      className={`${styles.button} ${styles.delete}`}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default QuotationPage;
