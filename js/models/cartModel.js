// src/models/cartModel.js
import { request } from "../services/fetch.js";

/**
 * Add product to cart
 * @param {number} productId Numeric product ID (from DB)
 * @param {number} quantity  Quantity to add
 */
export const addToCart = async ({ productId, quantity }) => {
  if (!productId || !quantity) {
    throw new Error("Product ID and quantity are required");
  }

  const body = {
    productId: Number(productId),
    quantity: parseInt(quantity, 10),
  };

  console.log("addToCart - Sending:", body);

  return await request("http://localhost:4000/api/cart", "POST", body);
};

export const getCartList = async () => {
  return await request("http://localhost:4000/api/cart", "GET");
};

export const removeFromCart = async (cartItemId) => {
  if (!cartItemId) throw new Error("Missing cart item ID");
  return await request(`http://localhost:4000/api/cart/${cartItemId}`, "DELETE");
};