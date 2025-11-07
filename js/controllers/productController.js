import { addToCart } from "../models/cartModel.js";
import { getList } from "../models/productModel.js";
import { getDetails } from "../models/productModel.js";
import { ProductListView, ProductsDetailsView } from "../views/organisms/productViews.js";
import { Layout } from "./layoutController.js";
import { request } from "../services/fetch.js";




export const productPage = async () => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    
    // Check if we have both category and product
    if (params.category && params.product) {
        return ProductDetails(params.product);
    }
    
    return ProductList();
}

export const ProductList = async () => {
    const { category = 'vand-og-vandrensning' } = Object.fromEntries(new URLSearchParams(location.search));
    const data = await getList(category);
    const html = ProductListView(data, category);
    return Layout("Produkter", html);
}

export const ProductDetails = async (productId) => {
    if (!productId) {
        console.error('No product ID provided');
        return ProductList();
    }

    try {
        const product = await getDetails(productId);
        const html = ProductsDetailsView(product);
        return Layout(product.name, html);
    } catch (error) {
        console.error('Error loading product details:', error);
        return ProductList();
    }
}

export const handleAddToCart = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Get values and convert to integers
    const productId = parseInt(form.querySelector('[name="productId"]').value);
    const quantity = parseInt(form.querySelector('[name="quantity"]').value);

    if (!productId || !quantity || quantity < 1) {
        alert('Ugyldige værdier. Kontroller venligst antal.');
        return;
    }

    try {
        const result = await addToCart({
            productId,
            quantity
        });

        if (result) {
            alert('Produkt tilføjet til kurv!');
        }
    } catch (error) {
        console.error('Fejl ved tilføjelse til kurv:', error);
        alert('Kunne ikke tilføje til kurv. Prøv igen senere.');
    }
}
