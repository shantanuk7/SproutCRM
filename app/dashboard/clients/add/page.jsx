import { addClient } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const AddClientPage = () => {
  return (
    <div className={styles.container}>
      <form action={addClient} className={styles.form}>
        <input type="text" placeholder="Client Name" name="clientName" required />
        <input type="text" placeholder="Company Name" name="companyName" />
        <input type="email" placeholder="Email" name="email" />
        <input type="tel" placeholder="Phone" name="phone" />
        <input type="text" placeholder="Address" name="address" />
        <textarea
          required
          name="notes"
          id="notes"
          rows="8"
          placeholder="Notes"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddClientPage;
