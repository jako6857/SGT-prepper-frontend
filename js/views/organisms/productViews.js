import { Div, Fragment, Heading, Image, Input, Form, Button, Paragraph, Link } from "../atoms/index.js";
import { addToCart } from "../../models/cartModel.js";
import { price2Dkk } from "../../utils/index.js";

export const ProductListView = (products = [], category) => {
    const element = Fragment();

    products.forEach((product) => {
        if (!product) return;

        const { id, name, teaser, imageUrl, price } = product;

        const card = Div(
            "block hover:shadow-lg transition-shadow duration-300 p-4 bg-white rounded-lg border"
        );

        // Product link and content
        // Use numeric product id in the URL so the details view can look it up correctly
        const productLink = Link(
            `?category=${category}&product=${id}`,
            "",
            "block"
        );
        const contentDiv = Div("flex justify-between items-start gap-6");

        const img = Image(
            imageUrl ? `http://localhost:4000${imageUrl}` : "",
            name,
            "max-w-[200px] rounded-lg object-cover shadow-md"
        );
        contentDiv.append(img);

        const info = Div("flex-1");
        const h2 = Heading(
            name,
            2,
            "text-xl font-semibold text-gray-800 mb-2"
        );
        const teaserP = Paragraph("text-gray-600 line-clamp-2");
        teaserP.innerHTML = teaser || "";
        info.append(h2, teaserP);

        const cost = Div("text-right space-y-2 min-w-[120px]");
        const priceText = Div("text-lg font-bold text-gray-900");
        priceText.innerText = price2Dkk(price);
        cost.append(priceText);

        contentDiv.append(info, cost);
        productLink.append(contentDiv);
        card.append(productLink);

        // Add to cart form (list view)
        const form = Form("POST");
        form.className = "mt-4 flex items-center justify-end gap-2";

        const quantityInput = Input(
            "quantity",
            "Antal",
            "number",
            "1",
            "w-20 rounded border-gray-300"
        );
        quantityInput.min = "1";

        const button = Button(
            "Tilføj til kurv",
            "submit",
            "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        );

        form.append(quantityInput, button);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const quantity = parseInt(quantityInput.value, 10) || 1;

            if (!id || quantity < 1) {
                alert("Ugyldigt produkt eller antal");
                return;
            }

            try {
                await addToCart({
                    productId: id,
                    quantity,
                });
                alert("Produkt tilføjet til kurv!");
            } catch (error) {
                console.error("Add to cart error:", error);
                alert("Kunne ikke tilføje til kurv");
            }
        });

        card.append(form);
        element.append(card);
    });

    return element;
};

export const ProductsDetailsView = (product) => {
    if (!product) {
        const wrapper = Div("p-6");
        const msg = Paragraph("text-red-600");
        msg.innerText = "Produktet kunne ikke indlæses.";
        wrapper.append(msg);
        return wrapper;
    }

    const { id, name, imageUrl, description, price } = product;

    const element = Div(
        "flex flex-col md:flex-row gap-8 p-6 border rounded-xl bg-white shadow-sm max-w-6xl mx-auto"
    );

    const imageCol = Div("md:w-[400px] shrink-0");
    const img = Image(
        imageUrl ? `http://localhost:4000${imageUrl}` : "",
        name,
        "w-full rounded-lg shadow-lg object-cover"
    );
    imageCol.append(img);

    const infoCol = Div("flex-1 space-y-4");
    const h3 = Heading(name, 1, "text-2xl font-bold text-gray-900");
    const descP = Paragraph("text-gray-600");
    descP.innerHTML = description || "";

    // Price row
    const priceRow = Div("flex items-baseline justify-between mt-2");
    const priceLabel = Paragraph("text-lg font-semibold text-gray-800");
    priceLabel.innerText = "Pris";
    const priceValue = Paragraph("text-2xl font-bold text-gray-900");
    priceValue.innerText = price2Dkk(price);
    priceRow.append(priceLabel, priceValue);

    // Add to cart form (details view)
    const form = Form("POST");
    form.className = "mt-6 flex items-center gap-3";

    const quantityInput = Input(
        "quantity",
        "Antal",
        "number",
        "1",
        "w-24 rounded border-gray-300"
    );
    quantityInput.min = "1";

    const button = Button(
        "Tilføj til kurv",
        "submit",
        "mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
    );

    form.append(quantityInput, button);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const quantity = parseInt(quantityInput.value, 10) || 1;

        if (!id || quantity < 1) {
            alert("Ugyldigt produkt eller antal");
            return;
        }

        try {
            await addToCart({
                productId: id,
                quantity,
            });
            alert("Produkt tilføjet til kurv!");
        } catch (error) {
            console.error("Add to cart error:", error);
            alert("Kunne ikke tilføje til kurv");
        }
    });

    infoCol.append(h3, descP, priceRow, form);
    element.append(imageCol, infoCol);

    return element;
};
