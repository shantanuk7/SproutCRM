"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { Quotation } from "./models";
import { Client } from "./models";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};


export const addQuotation = async (formData) => {
  try {
    await connectToDB();
    console.log("\n=====Got request to create quote for this data: ====\n"+ formData);
    const newQuotation = new Quotation(formData);
    await newQuotation.save();
  } catch (error) {
    console.error("Error adding quotation:", error);
    throw new Error("Failed to create quotation!");
  }

  revalidatePath("/dashboard/quotations");
  redirect("/dashboard/quotations");
};

export const deleteQuote = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Quotation.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete quotation!");
  }

  revalidatePath("/dashboard/quotations");
};


export const addClient = async (formData) => {

  const { clientName, companyName, email, phone, address, notes } = Object.fromEntries(formData);
  console.log("\n\n\n\n========Got form data:============\n" + clientName, companyName, email, phone, address, notes );
  try {
    await connectToDB();

    const newClient = new Client({
      clientName,
      companyName,
      email,
      phone,
      address,
      notes,
    });

    await newClient.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add client!");
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
};


export const deleteClient = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Client.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete client!");
  }

  revalidatePath("/dashboard/clients");
};
