import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { api } from "../api/axios";

const StyledContainer = styled(Container)``;

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

const user = localStorage.getItem("user");

const EditPaymentMethodForm = ({ paymentMethodId }) => {
  console.log(user);
  const [paymentMethod, setPaymentMethod] = useState({
    type: "",
    brand: "",
    bank: "",
    user_id: user._id, 
    best_purchase_day: "",
    due_date: "",
    family: user.family, 
  });

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      const response = await api.get(`/payment_methods/${paymentMethodId}`);
      setPaymentMethod(response.data);
    };

    fetchPaymentMethod();
  }, [paymentMethodId]);

  const handleChange = (e) => {
    setPaymentMethod({ ...paymentMethod, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    try {
      await api.post("/payment_methods/payment_methods", paymentMethod);
      alert("Payment method updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating payment method.");
    }
  };

  // Restante do código do componente
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
            <option value="">Selecione tipo</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="brand">
          <Form.Label>Bandeira</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={paymentMethod.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="bank">
          <Form.Label>Banco</Form.Label>
          <Form.Control
            type="text"
            name="bank"
            value={paymentMethod.bank}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="best_purchase_day">
          <Form.Label>Melhor dia de compra</Form.Label>
          <Form.Control
            type="number"
            name="best_purchase_day"
            value={paymentMethod.best_purchase_day}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="due_date">
          <Form.Label>Vencimento</Form.Label>
          <Form.Control
            type="number"
            name="due_date"
            value={paymentMethod.due_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <StyledButton variant="primary" type="submit">
          Inserir
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default EditPaymentMethodForm;
