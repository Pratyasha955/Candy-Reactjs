import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCandyContext  } from '../Store/CandyContext';
import "./CandyHeader.css";

const CandyHeader = (props) => {
  const { calculateTotalQuantity } = useCandyContext();
  return (
    <header className="header">
      <h1>ReactCandy</h1>
      <button className="cart-button" onClick={props.onShowCart}>
        <span className='cart-icon'><FontAwesomeIcon icon={faShoppingCart} /></span>
        <span className="cart-name">Your Cart</span>
        <span className="cart-count">{calculateTotalQuantity()}</span>
      </button>
    </header>
  );
};

export default CandyHeader;
