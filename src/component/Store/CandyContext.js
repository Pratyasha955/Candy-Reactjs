import React, { createContext, useContext, useEffect, useState } from 'react';

const CandyContext = createContext();

export const useCandyContext = () => useContext(CandyContext);

export const CandyProvider = ({ children }) => {
  const [candyData, setCandyData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCandyData();
    fetchCartData();
  }, []);

  const fetchCandyData = async () => {
    try {
      const response = await fetch('https://crudcrud.com/api/5d740f60aa03420fb42049b93b9f16f8/candies');
      if (!response.ok) {
        throw new Error('Failed to fetch candy data');
      }
      const data = await response.json();
      setCandyData(data);
    } catch (error) {
      console.error('Error fetching candy data:', error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await fetch('https://crudcrud.com/api/5d740f60aa03420fb42049b93b9f16f8/cart');
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const addCandy = async (data) => {
    try {
      const response = await fetch('https://crudcrud.com/api/5d740f60aa03420fb42049b93b9f16f8/candies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add candy');
      }
      const newData = await response.json();
      setCandyData([...candyData, newData]);
    } catch (error) {
      console.error('Error adding candy:', error);
    }
  };

  const addToCart = async (candy, quantity) => {
    try {
      const existingItemIndex = cartItems.findIndex((item) => item.name === candy.name);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedCartItems);
  
        // Update the cart item in the backend
        const response = await fetch(`https://crudcrud.com/api/5d740f60aa03420fb42049b93b9f16f8/cart/${updatedCartItems[existingItemIndex]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: updatedCartItems[existingItemIndex].quantity }),
        });
        if (!response.ok) {
          throw new Error('Failed to update cart item');
        }
      } else {
        // Add a new item to the cart and update it in the backend
        const response = await fetch('https://crudcrud.com/api/5d740f60aa03420fb42049b93b9f16f8/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: candy.name,
            description: candy.description,
            price: candy.price,
            quantity: quantity,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        const newItem = await response.json();
        setCartItems([...cartItems, newItem]);
      }
    } catch (error) {
      console.error('Error updating or adding to cart:', error);
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
