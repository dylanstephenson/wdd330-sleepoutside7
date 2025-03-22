// Base URL is imported from the environment variables.
const baseURL = import.meta.env.VITE_SERVER_URL

//Grabs the Product Info from json
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// Exporting ProductData class
export default class ProductData {
  // Fetches and returns all products in a given category.
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Fetches and returns details for a specific product by its ID.
  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(products);
    return data.Result;
  }
}
