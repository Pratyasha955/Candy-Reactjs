import React, { createContext, useContext, useState } from 'react';

const CandyContext = createContext();

export const useCandyContext = () => useContext(CandyContext);

export const CandyProvider = ({ children }) => {
  const [candyData, setCandyData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addCandy = (data) => {
    setCandyData([...candyData, data]);
  };

  const addToCart = (candy, quantity) => {
    const existingItemIndex = cartItems.findIndex((item) => item.name === candy.name);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        {
          name: candy.name,
          description: candy.description,
          price: candy.price,
          quantity: quantity,
        },
      ]);
    }
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CandyContext.Provider
      value={{
        candyData,
        addCandy,
        cartItems,
        addToCart,
        calculateTotalQuantity,
        calculateTotalPrice,
      }}
    >
      {children}
    </CandyContext.Provider>
  );
};