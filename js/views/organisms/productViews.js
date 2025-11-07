// src/views/organisms/productViews.js
import { Div, Fragment, Heading, Image, Input, Form, Button, Paragraph } from "../atoms/index.js";
import { addToCart } from "../../models/cartModel.js";
import { price2Dkk } from "../../utils/index.js";


// Resolve backend image URLs
const resolveImageUrl = (imageUrl) => {
  if (!imageUrl) return "";
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `http://localhost:4000${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
};

// ---------------- Product List View ----------------
export const ProductListView = (products = [], category = "") => {
  const element = Fragment();

  if (!Array.isArray(products)) return element;

  products.forEach((product) => {
    if (!product) return;

    const productId = product.id; // numeric ID for backend

    const card = Div("hover:shadow-lg transition-shadow duration-300 p-4 bg-white rounded-lg border");

    // Clickable product card
    const contentDiv = Div("flex justify-between items-start gap-6 cursor-pointer mb-4");
    contentDiv.addEventListener("click", () => {
    // Reuse the current page and only change the query params
    const url = new URL(window.location.href);
    url.searchParams.set("category", category);
    url.searchParams.set("product", product.slug);

    // Navigate to the updated URL (productController reads these params)
    window.location.href = url.toString();
    });

    const img = Image(resolveImageUrl(product.imageUrl), product.name || "Produktbillede", "max-w-[200px] rounded-lg object-cover shadow-md");
    contentDiv.append(img);

    const info = Div("flex-1");
    const h2 = Heading(product.name || "Uden navn", 2, "text-xl font-semibold text-gray-800 mb-2");
    const teaserP = Paragraph("text-gray-600 line-clamp-2");
    teaserP.innerHTML = product.teaser || "";
    info.append(h2, teaserP);

    const cost = Div("text-right space-y-2 min-w-[120px]");
    const priceText = Div("text-lg font-bold text-gray-900");
    priceText.innerText = typeof product.price !== "undefined" ? price2Dkk(product.price) : "N/A";
    cost.append(priceText);

    contentDiv.append(info, cost);
    card.append(contentDiv);

    // Add-to-cart form
    const form = Form("POST");
    form.className = "flex items-center justify-end gap-2";

    const quantityInput = Input("quantity", "Antal", "number", "1", "w-20 rounded border-gray-300");
    quantityInput.min = "1";

    const button = Button("Tilføj til kurv", "submit", "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700");
    form.append(quantityInput, button);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const quantity = parseInt(quantityInput.value, 10);
      if (!productId || !quantity || quantity < 1 || Number.isNaN(quantity)) {
        alert("Ugyldigt produkt eller antal");
        return;
      }

      try {
        const result = await addToCart({ productId, quantity });
        console.log("Cart result:", result);
        alert("Produkt tilføjet til kurv!");
      } catch (error) {
        console.error("Add to cart error:", error);
        alert("Kunne ikke tilføje til kurv: " + (error.message || error));
      }
    });

    card.append(form);
    element.append(card);
  });

  return element;
};

// ---------------- Product Details View ----------------
export const ProductsDetailsView = (product) => {
  const element = Div("flex flex-col md:flex-row gap-8 p-6 border rounded-xl bg-white shadow-sm max-w-6xl mx-auto");

  if (!product) {
    const msg = Paragraph("text-red-600");
    msg.innerText = "Produktet kunne ikke indlæses.";
    element.append(msg);
    return element;
  }

  const productId = product.id;

  const imageCol = Div("md:w-[400px] shrink-0");
  const img = Image(resolveImageUrl(product.imageUrl), product.name || "Produktbillede", "w-full rounded-lg shadow-lg object-cover");
  imageCol.append(img);

  const infoCol = Div("flex-1 space-y-4");
  const h3 = Heading(product.name || "Uden navn", 1, "text-2xl font-bold text-gray-900");
  const descP = Paragraph("text-gray-600");
  descP.innerHTML = product.description || "";

  const priceRow = Div("flex items-baseline justify-between mt-2");
  const priceLabel = Paragraph("text-lg font-semibold text-gray-800");
  priceLabel.innerText = "Pris";
  const priceValue = Paragraph("text-2xl font-bold text-gray-900");
  priceValue.innerText = typeof product.price !== "undefined" ? price2Dkk(product.price) : "N/A";
  priceRow.append(priceLabel, priceValue);

  const form = Form("POST");
  form.className = "mt-6 flex items-center gap-3";

  const quantityInput = Input("quantity", "Antal", "number", "1", "w-24 rounded border-gray-300");
  quantityInput.min = "1";

  const button = Button("Tilføj til kurv", "submit", "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700");
  form.append(quantityInput, button);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const quantity = parseInt(quantityInput.value, 10);
    if (!productId || !quantity || quantity < 1 || Number.isNaN(quantity)) {
      alert("Ugyldigt produkt eller antal");
      return;
    }

    try {
      const result = await addToCart({ productId, quantity });
      console.log("Cart result:", result);
      alert("Produkt tilføjet til kurv!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Kunne ikke tilføje til kurv: " + (error.message || error));
    }
  });

  infoCol.append(h3, descP, priceRow, form);
  element.append(imageCol, infoCol);

  return element;
};
