import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: #38054c;
  padding: 2rem;
  border-radius: 8px;
  color:#c8df17;
  max-width: 400px;
  margin-top: 50px;
  
`;

const StyledForm = styled(Form)`
  margin-top: 1rem;
  margin: auto;
`;

const StyledButton = styled(Button)`
  background-color: #c8df17;
  border-color: #c8df17;

  &:hover,
  &:active,
  &:focus {
    background-color: #b3c60d;
    border-color: #b3c60d;
  }
`;

const EditPaymentMethodForm = ({ paymentMethodId }) => {
  const [paymentMethod, setPaymentMethod] = useState({
    type: '',
    brand: '',
    bank: '',
    user_id: '',
    best_purchase_day: '',
    due_date: '',
    family_id: '',
  });

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      const response = await axios.get(`/api/payment_methods/${paymentMethodId}`);
      setPaymentMethod(response.data);
    };

    fetchPaymentMethod();
  }, [paymentMethodId]);

  const handleChange = (e) => {
    setPaymentMethod({ ...paymentMethod, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/payment_methods/${paymentMethodId}`, paymentMethod);
      alert('Payment method updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating payment method.');
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={paymentMethod.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={paymentMethod.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="bank">
          <Form.Label>Bank</Form.Label>
          <Form.Control
            type="text"
            name="bank"
            value={paymentMethod.bank}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="user_id">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            name="user_id"
            value={paymentMethod.user_id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="best_purchase_day">
          <Form.Label>Best Purchase Day</Form.Label>
          <Form.Control
            type="number"
            name="best_purchase_day"
            value={paymentMethod.best_purchase_day}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="due_date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="number"
            name="due_date"
            value={paymentMethod.due_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
    
        <Form.Group controlId="family_id">
          <Form.Label>Family ID</Form.Label>
          <Form.Control
            type="text"
            name="family_id"
            value={paymentMethod.family_id}
            onChange={handleChange}
            required
          />
        </Form.Group>
    
        <StyledButton variant="primary" type="submit">
          Update
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  )}

  export default EditPaymentMethodForm