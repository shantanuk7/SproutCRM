// "use server"
import { Client, Quotation, Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q, page = 1) => {
  console.log("Got request to fetch products...");
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

export const fetchQuotations = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10; // Adjust as needed

  try {
    connectToDB();
    const count = await Quotation.find({ clientName: { $regex: regex } }).countDocuments();

    // Fetch quotations
    const quotations = await Quotation.find({ clientName: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    // Populate total price for each quotation
    const populatedQuotations = await Promise.all(quotations.map(async (quotation) => {
      // Fetch products for the quotation
      const products = await Product.find({ _id: { $in: quotation.items.map(item => item.product) } });

      // Calculate total price by summing up prices of all products considering quantity
      const totalPrice = quotation.items.reduce((total, item) => {
        const product = products.find(p => p._id.toString() === item.product.toString());
        if (product) {
          total += product.price * item.quantity;
        }
        return total;
      }, 0);

      // Return quotation object with populated total price
      return { ...quotation.toObject(), totalPrice };
    }));

    return { count, quotations: populatedQuotations };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch quotations!");
  }
};

export const fetchQuotation = async (id) => {
  try {
    connectToDB();
    const quotation = await Quotation.findById(id).populate('items.product'); // Populate product information for each item
    return quotation;
  } catch (error) {
    console.error("Failed to fetch quotation:", error);
    throw new Error("Failed to fetch quotation!");
  }
};

export const fetchClients = async (q, page = 1) => {
  console.log("Got request to fetch clients...");
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEMS_PER_PAGE = 10; // Adjust as needed

  try {
    connectToDB();
    const count = await Client.find({ clientName: { $regex: regex } }).count();
    const clients = await Client.find({ clientName: { $regex: regex } })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return { count, clients };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch clients!");
  }
};



//DASHBOARD Analytics


// Function to fetch count of clients
export const fetchClientsCount = async () => {
  "use server"
  try {
    connectToDB();
    const count = await Client.countDocuments();
    return count;
  } catch (err) {
    console.error("Failed to fetch clients count:", err);
    throw new Error("Failed to fetch clients count!");
  }
};

// Function to fetch count of products
export const fetchProductsCount = async () => {
  "use server"
  try {
    connectToDB();
    const count = await Product.countDocuments();
    return count;
  } catch (err) {
    console.error("Failed to fetch products count:", err);
    throw new Error("Failed to fetch products count!");
  }
};

// Function to fetch count of quotations
export const fetchQuotationsCount = async () => {
  "use server"
  try {
    connectToDB();
    const count = await Quotation.countDocuments();
    return count;
  } catch (err) {
    console.error("Failed to fetch quotations count:", err);
    throw new Error("Failed to fetch quotations count!");
  }
};

// Update cards object to use real data
export const cards = [
  {
    id: 1,
    title: "Clients",
    number: await fetchClientsCount(),
    change: 10,
  },
  {
    id: 2,
    title: "Products",
    number: await fetchProductsCount(),
    change: 10,
  },
  {
    id: 3,
    title: "Quotations",
    number: await fetchQuotationsCount(),
    change: 10,
  },
];