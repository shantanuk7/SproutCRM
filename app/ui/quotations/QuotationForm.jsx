// components/QuotationForm.jsx
"use client"
import { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/quotation/addQuotation.module.css";
import { redirect } from "next/navigation";

const QuotationForm = ({ addQuotation, fetchProducts, fetchClients }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    email: "",
    phone: "",
    items: [],
  });
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        console.log("Now trying to fetch products...");
        const fetchedProducts = await fetchProducts(search);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
        console.log(products);
      }
    };
    fetchProductsData();
  }, [search]);

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        setLoading(true);
        console.log("Now trying to fetch clients...");
        const fetchedClients = await fetchClients("");
        setClients(fetchedClients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
        console.log(clients);
      }
    };
    fetchClientsData();
  }, []);

  const handleSelectClient = (e) => {
    const selectedClientName = e.target.value;
    console.log("Selected client Name:", selectedClientName);
    setFormData({
      ...formData,
      clientName: selectedClientName,
    });
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (product) => {
    const newItem = {
      product: product._id, // Assuming product._id contains the ObjectId
      quantity: 1,
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };  

  const handleQuantityChange = (index, increment) => {
    const updatedItems = [...formData.items];
    if (updatedItems[index] && updatedItems[index].quantity !== undefined) {
      if (increment) {
        updatedItems[index].quantity++;
      } else {
        updatedItems[index].quantity = Math.max(updatedItems[index].quantity - 1, 0);
      }
      setFormData({
        ...formData,
        items: updatedItems,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (!formData.clientName || !formData.companyName || !formData.email || !formData.phone || formData.items.length === 0) {
        throw new Error("Please fill in all required fields and add at least one product.");
      }
      await addQuotation(formData);
      redirect("/dashboard/quotations");
    } catch (error) {
      console.error("Error adding quotation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="non-product">
        <div className="client-section">
          <h2>Client Details</h2>
          <select
            name="client"
            id="client"
            value={formData.clientName}
            onChange={handleSelectClient}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.clientName}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="products-section">
        <h2>Add Products</h2>
        <input
          type="text"
          placeholder="Search for a product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.tablecontainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product Title</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={formData.items[index]?.quantity || 0}
                        onChange={(e) => {
                          const updatedItems = [...formData.items];
                          updatedItems[index].quantity = parseInt(e.target.value);
                          setFormData({ ...formData, items: updatedItems });
                        }}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleAddProduct(product)}
                        className="add-product-btn"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(index, true)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(index, false)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default QuotationForm;
