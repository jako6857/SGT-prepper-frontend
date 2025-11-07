// src/models/productModel.js
import { request } from "../services/fetch.js";

// Fetch all products in a category
export const getList = async (category) => {
  const url = `http://localhost:4000/api/products/${encodeURIComponent(category)}`;
  return await request(url, "GET");
};

// Fetch product details by slug
export const getDetails = async (productSlug) => {
  const url = `http://localhost:4000/api/products/details/${encodeURIComponent(productSlug)}`;
  return await request(url, "GET");
};