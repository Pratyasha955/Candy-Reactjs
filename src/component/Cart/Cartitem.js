import React from 'react';
import './Cartitem.css';

const CartItem = ({ item }) => {
  return (
    <li className="cart-item">
      <div className="cart-item-details">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-quantity">x {item.quantity}</span>
      </div>
      <span className="cart-item-price">${item.price}</span>
    </li>
  );
};

export default CartItem;
