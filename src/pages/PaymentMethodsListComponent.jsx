import React, { useState, useEffect } from "react";
import { api } from "../api/axios";
import { Form } from "react-bootstrap";

const PaymentMethodsListComponent = ({ selectedMethod, onChange }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get("/payment_methods/payment_methods");
        setPaymentMethods(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <Form.Group controlId="paymentMethod">
      <Form.Label>Método de Pagamento</Form.Label>
      <Form.Control
        as="select"
        value={selectedMethod}
        onChange={onChange}
        required
      >
        <option value="">Selecione um método de pagamento</option>
        {paymentMethods.map((method) => (
          <option key={method._id} value={method._id}>
            {method.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default PaymentMethodsListComponent;
