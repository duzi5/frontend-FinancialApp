import React, { useState } from "react";
import { addPaymentMethod } from "../api/axios";
import { Modal, Form, Button } from "react-bootstrap";

const AddPaymentMethod = ({ show, onHide }) => {
  const [paymentMethodData, setPaymentMethodData] = useState({
    type: "",
    name: "",
    brand: "",
    bank: "",
    isDebit: false,
    best_purchase_day: "",
    due_date: "",
  });
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethodData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPaymentMethodData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    const bestPurchaseDay = parseInt(paymentMethodData.best_purchase_day);
    if (bestPurchaseDay < 1 || bestPurchaseDay > 31 || isNaN(bestPurchaseDay)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    try {
      const response = await addPaymentMethod(paymentMethodData);
      console.log(response.message);
      onHide();
    } catch (error) {
      console.error("Erro ao adicionar método de pagamento:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Adicione um método de pagamento</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backdropFilter: "blur(5px)" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formType">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={paymentMethodData.type}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={paymentMethodData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBrand">
            <Form.Label>Bandeira</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={paymentMethodData.brand}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBank">
            <Form.Label>Banco</Form.Label>
            <Form.Control
              type="text"
              name="bank"
              value={paymentMethodData.bank}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formIsDebit">
            <Form.Check
              type="checkbox"
              label="É um cartão de débito?"
              name="isDebit"
              checked={paymentMethodData.isDebit}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          {!paymentMethodData.isDebit && (
            <>
              <Form.Group controlId="formBestPurchaseDay">
                <Form.Label>Melhor dia de compra</Form.Label>
                <Form.Control
              type="number"
              name="best_purchase_day"
              value={paymentMethodData.best_purchase_day}
              onChange={handleChange}
              required
              isInvalid={!isValid}
            />
            <Form.Control.Feedback type="invalid">
              O melhor dia de compra deve ser um número entre 1 e 31.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDueDate">
            <Form.Label>Vencimento</Form.Label>
            <Form.Control
              type="number"
              name="due_date"
              value={paymentMethodData.due_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </>
      )}
      <Button type="submit" className="mt-3">Adicionar</Button>
    </Form>
  </Modal.Body>
</Modal>
);
};

export default AddPaymentMethod;








