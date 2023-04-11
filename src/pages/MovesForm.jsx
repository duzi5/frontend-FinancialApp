import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import {api } from '../api/axios'
const StyledForm = styled(Form)`
  margin-top: 1rem;
  max-width: 400px;
    margin: auto;
    background-color: black;
    color: #ccc;
    padding: 50px;
    box-shadow: 2px 2px 1px;
`;

const MoveForm = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [moveData, setMoveData] = useState({
    description: '',
    value: '',
    nature: '',
    category: '',
    paymentMethod: '',
    family_id: '',
    date: '',
    installments: 1,
    installment_number: 1,
    installment_value: '',
  });

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const response = await api.get('/payment_methods/family_payment_methods' );
      setPaymentMethods(response.data);
    };

    fetchPaymentMethods();
  }, []);

  const handleChange = (e) => {
    setMoveData({ ...moveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/', moveData);
      alert('Move successfully created!');
    } catch (error) {
      console.error(error);
      alert('Error creating move.');
    }
  };

  const categories = [
    'lazer', 'alimentação', 'transporte', 'segurança', 'saúde', 'bem-estar', 'estética', 'educação', 'serviços de internet e tv', 'presentes', 'mimos pessoais', 'utilitários do lar', 'equipamentos veiculares', 'aposta em rifas ou loterias', 'filhos', 'outros'
  ];

  return (
   <Container>
     <StyledForm onSubmit={handleSubmit}>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={moveData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="value">
        <Form.Label>Value</Form.Label>
        <Form.Control
          type="number"
          name="value"
          value={moveData.value}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="nature">
        <Form.Label>Nature</Form.Label>
        <Form.Control as="select" name="nature" value={moveData.nature} onChange={handleChange} required>
          <option value="">Select nature</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control disabled={moveData.nature === 'positive'} as="select" name="category" value={moveData.category} onChange={handleChange} required>
          <option value="">Select category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="paymentMethod">
        <Form.Label>Payment Method</Form.Label>
        <Form.Control disabled={moveData.nature === 'positive'} as="select" name="paymentMethod" value={moveData.paymentMethod} onChange={handleChange} required>
          <option value="">Select payment method</option>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))}
        </Form.Control>
      </Form.Group>





      <Form.Group controlId="installments">
        <Form.Label>Number of Installments</Form.Label>
        <Form.Control
          type="number"
          name="installments"
          value={moveData.installments}
          onChange={handleChange}
          min="1"
          required
          disabled={moveData.nature === 'positive'}
        />
      </Form.Group>

      <Form.Group controlId="installment_value">
        <Form.Label>Installment Value</Form.Label>
        <Form.Control
          type="number"
          name="installment_value"
          value={moveData.installment_value}
          onChange={handleChange}
          disabled={moveData.nature === 'positive'}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Adicionar
      </Button>
    </StyledForm>
   </Container>
  );
};

export default MoveForm;
