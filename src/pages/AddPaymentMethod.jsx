import React, { useState } from 'react';
import { addPaymentMethod } from './api';

const AddPaymentMethod = () => {
  const [paymentMethodData, setPaymentMethodData] = useState({
    type: '',
    brand: '',
    bank: '',
    best_purchase_day: '',
    due_date: '',
  });

  const handleChange = (e) => {
    setPaymentMethodData({ ...paymentMethodData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addPaymentMethod(paymentMethodData);
      console.log(response.message);
    } catch (error) {
      console.error('Erro ao adicionar método de pagamento:', error);
    }
  };

  return (
    <div>
      <h1>Add Payment Method</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={paymentMethodData.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={paymentMethodData.brand}
            onChange={handleChange}
          />
        </label>
        <label>
          Bank:
          <input
            type="text"
            name="bank"
            value={paymentMethodData.bank}
            onChange={handleChange}
          />
        </label>
        <label>
          Best Purchase Day:
          <input
            type="text"
            name="best_purchase_day"
            value={paymentMethodData.best_purchase_day}
            onChange={handleChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="text"
            name="due_date"
            value={paymentMethodData.due_date}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Payment Method</button>
      </form>
    </div>
  );
};

export default AddPaymentMethod;
