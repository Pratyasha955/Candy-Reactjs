import React from 'react';
import "./Cartitem.css";

const Cartitem = ({ item }) => {
  return (
    <li>
    <div className="cart-item">
      <samp className="cart-item1">{item.name}</samp>
      <p className="cart-item3"><samp className="amount">x {item.quantity}</samp></p>
      <samp className="cart-item2">${item.price}</samp>
    </div>
  </li>
  );
};

export default Cartitem;