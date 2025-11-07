import { request } from "../services/fetch.js";

const url = `http://localhost:4000/api/cart`;

/**
 * Funktion til at hente indkøbskurvens indhold
 * @returns Array
 */
export const getCartList = async () => {
    try {
        const data = await request(url);
        if (data) {
            return data;
        }
    } catch (error) {
        console.error(`Fejl i kald af indkøbskurv: ${error}`);
    }
};

/**
 * Tilføj linje til indkøbskurv
 * @param {Number} productId 
 * @param {Number} quantity 
 * @returns  Boolean
 */
export const addToCart = async ({ productId, quantity }) => {
    try {
        const validProductId = Number(productId);
        const validQuantity = Number(quantity);

        if (!Number.isInteger(validProductId) || !Number.isInteger(validQuantity) || validQuantity < 1) {
            throw new Error("Product ID and quantity are required");
        }

        const data = await request(url, "POST", {
            product_id: validProductId, // Match API expectation
            quantity: validQuantity,
        });

        return data;
    } catch (error) {
        console.error("Add to cart error:", error);
        throw error;
    }
};

/**
 * slet linje fra indkøbskurv
 * @param {Number} id 
 */
export const removeFromCart = async (id) => {
    try {
        const data = await request(`${url}/${id}`, "DELETE");
        if (data.message) {
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
};
