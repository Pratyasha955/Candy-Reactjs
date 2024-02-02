import React from 'react';
import CartItem from './Cartitem';
import Modal from '../Modal/Modal';
import { useCandyContext } from '../Store/CandyContext';
import './Cart.css';

const Cart = (props) => {
  const { cartItems, calculateTotalPrice } = useCandyContext();

  const totalPrice = calculateTotalPrice(); // Calculate total price only once

  return (
    <Modal onClose={props.onClose} className="cart">
      <div>
        <ul className='list-ul'>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </ul>
        <div className='price'>
          <span>Total Price: <span className='total-price'>${totalPrice.toFixed(2)}</span></span> {/* Use toFixed(2) to ensure two decimal places */}
        </div>
        <div className='button-price'>
          <button className='button-price1'>Place Order</button>
          <button className='button-price2' onClick={props.onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
