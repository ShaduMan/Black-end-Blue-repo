// ProductChecker.js
import all_product from "../Assets/all_product";

export function checkProductAvailability(userMessage) {
  const lowerMsg = userMessage.toLowerCase();

  for (let product of all_product) {
    const productName = product.name.toLowerCase();
    if (lowerMsg.includes(productName)) {
      return `✅ Yes, we have ${product.name} in stock!`;
    }
  }

  return "❌ Sorry, that product is not available at the moment.";
}
