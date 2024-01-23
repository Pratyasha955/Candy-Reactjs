import React from 'react';
import { useCandyContext  } from '../Store/CandyContext';
import './CandyList.css';

const CandyList = () => {
  const { candyData, addToCart } = useCandyContext();

  const addToCartHandler = (candy, quantity) => {
    addToCart(candy, quantity);
  };

  return (
    <div className='table-container'>
      {candyData.length > 0 ? (
        <table className='product-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity (1)</th>
              <th>Quantity (2)</th>
              <th>Quantity (3)</th>
            </tr>
          </thead>
          <tbody>
            {candyData.map((candy, index) => (
              <tr key={index}>
                <td>{candy.name}</td>
                <td>{candy.description}</td>
                <td className='td-price'>${candy.price}</td>
                <td><button className='button' onClick={() => addToCartHandler(candy, 1)}>Buy 1</button></td>
                <td><button className='button' onClick={() => addToCartHandler(candy, 2)}>Buy 2</button></td>
                <td><button className='button' onClick={() => addToCartHandler(candy, 3)}>Buy 3</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-products">No candies available.</p>
      )}
    </div>
  );
};

export default CandyList;