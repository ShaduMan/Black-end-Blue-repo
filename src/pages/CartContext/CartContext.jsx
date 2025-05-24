import React, { createContext, useContext, useState } from "react";

// Create the context
const CartContext = createContext();

// CartProvider component to wrap around the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems; // prevent duplicates (or you could add quantity logic here)
      }
      return [...prevItems, product];
    });
  };

  // Remove a product from the cart by ID
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear the cart (optional utility)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing cart context easily
export const useCart = () => useContext(CartContext);
