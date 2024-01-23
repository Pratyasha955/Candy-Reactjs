import React, { useState } from 'react';
import './CandyForm.css';
import { useCandyContext  } from '../Store/CandyContext';

const CandyForm = () => {
  const { addCandy } = useCandyContext();
  const [candyData, setCandyData] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandyData({
      ...candyData,
      [name]: value,
    });
  };

  const handleAddCandy = (e) => {
    e.preventDefault();
    addCandy(candyData);
    setCandyData({
      name: '',
      description: '',
      price: 0,
    });
  };


  return (
    <div className="product-form">
      <form onSubmit={handleAddCandy}>
        <div>
          <label>Candy Name:</label>
          <input
            type="text"
            name="name"
            value={candyData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={candyData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={candyData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Candy</button>
      </form>
    </div>
  );
};

export default CandyForm;
