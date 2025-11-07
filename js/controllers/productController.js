// src/controllers/productController.js
import { getList, getDetails } from "../models/productModel.js";
import { ProductListView, ProductsDetailsView } from "../views/organisms/productViews.js";
import { Layout } from "./layoutController.js";

// Entry point
export const productPage = async () => {
  const url = new URL(window.location.href);
  const category = url.searchParams.get("category") || "vand-og-vandrensning";
  const productSlug = url.searchParams.get("product");

  console.log("Parsed params:", { category, productSlug });

  if (productSlug) return ProductDetails(productSlug);
  return ProductList(category);
};

// Load product list
export const ProductList = async (category = "vand-og-vandrensning") => {
  try {
    const products = await getList(category);
    const html = ProductListView(products, category);
    return Layout("Produkter", html);
  } catch (error) {
    console.error("Error loading product list:", error);
    const html = Div();
    html.innerText = "Kunne ikke indlæse produkter.";
    return Layout("Produkter", html);
  }
};

// Load product details
export const ProductDetails = async (slug) => {
  if (!slug) {
    alert("Ugyldigt produkt");
    return ProductList();
  }

  try {
    const product = await getDetails(slug);

    if (!product) {
      alert("Produktet blev ikke fundet");
      return ProductList();
    }

    const html = ProductsDetailsView(product);
    return Layout(product.name || "Produkt", html);
  } catch (error) {
    console.error("Error loading product details:", error);
    alert("Kunne ikke indlæse produktet. Viser produktliste.");
    const url = new URL(window.location.href);
    const category = url.searchParams.get("category") || "vand-og-vandrensning";
    return ProductList(category);
  }
};
