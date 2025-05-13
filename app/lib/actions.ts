"use server";
import { revalidatePath } from "next/cache";
import {
  addProduct,
  addUser,
  deleteProduct,
  deleteUser,
  updateProductDetails,
  updateUserDetails,
} from "./data";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

type NewProduct =
  | {
      id?: string;
      title?: string;
      desc?: string;
      price?: number;
      stock?: number;
      color?: string;
      size?: string;
      category?: string;
      error?: string;
    }
  | undefined;

type NewUser =
  | {
      username?: string;
      email?: string;
      password?: string;
      phone?: number;
      address?: number;
      isAdmin?: boolean;
      isActive?: boolean;
      error?: string;
    }
  | undefined;

export const addUserAction = async (
  state: NewUser,
  formData: FormData
): Promise<NewUser> => {
  const data = Object.fromEntries(formData) as Record<string, string>;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  const newUser = {
    username: data.username,
    email: data.email,
    password: hash,
    phone: data.phone,
    address: data.address,
    isAdmin: data.isAdmin === "true" || data.isAdmin === "on",
    isActive: data.isActive === "true" || data.isActive === "on",
  };

  try {
    await addUser(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message || "Unexpected error" };
    }
    return { error: "Unknown error" };
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProductAction = async (
  state: NewProduct,
  formData: FormData
): Promise<NewProduct> => {
  const data = Object.fromEntries(formData) as Record<string, string>;

  const newProduct = {
    title: data.title,
    desc: data.desc,
    price: +data.price,
    stock: +data.stock,
    color: data.color,
    size: data.size,
    category: data.category,
  };

  try {
    await addProduct(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message || "Unexpected error" };
    }
    return { error: "Unknown error" };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteUserAction = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData) as Record<string, string>;

  await deleteUser(id);

  revalidatePath("/dashboard/users");
};

export const deleteProductAction = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData) as Record<string, string>;

  await deleteProduct(id);

  revalidatePath("/dashboard/products");
};

export const updateUserDetailsAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData) as Record<string, string>;

  const newUser = {
    id: data.id,
    username: data.username,
    email: data.email,
    phone: data.phone,
    address: data.address,
    isAdmin: data.isAdmin === "true" || data.isAdmin === "on",
    isActive: data.isActive === "true" || data.isActive === "on",
  };

  await updateUserDetails(newUser);

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateProductDetailsAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData) as Record<string, string>;

  const newProduct = {
    id: data.id,
    title: data.title,
    desc: data.desc,
    price: +data.price,
    stock: +data.stock,
    color: data.color,
    size: data.size,
    category: data.category,
  };

  await updateProductDetails(newProduct);

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const authenticate = async (
  // when used in server didit redirect auto becuse not used redirect: true
  prevState: string | undefined,
  formData: FormData
) => {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      redirect: true,
      username,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.name) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Some thing wrong";
      }
    }
    throw error;
  }
};

export const logout = async () => {
  //when used in client its redirect auto with out redirect: true
  await signOut({ redirect: true });
};
