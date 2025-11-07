// src/utils/productId.js
// Frontend-only numeric ID generator for products
export const getNumericProductId = (() => {
  const map = {};
  let counter = 1000; // starting numeric ID

  return (slug) => {
    if (!map[slug]) map[slug] = counter++;
    return map[slug];
  };
})();
