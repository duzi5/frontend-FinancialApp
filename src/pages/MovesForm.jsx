import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col, Container, Modal } from "react-bootstrap";
import styled from "styled-components";
import { api } from "../api/axios";
import { json } from "react-router-dom";

const MoveForm = ({ show, handleClose }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [moveData, setMoveData] = useState({
    description: "",
    value: "",
    nature: "",
    category: "",
    paymentMethod: "",
    date: "",
    installments: 1,
    installment_number: 1,
    installment_value: "",
  });
  const initialState = {
    description: "",
    value: "",
    nature: "",
    category: "",
    paymentMethod: "",
    date: "",
    installments: 1,
    installment_number: 1,
    installment_value: "",
  };

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("access_token");
    return token && token.length > 0;
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get("payment_methods/payment_methods");
        console.log("Response data:", response.data);
        setPaymentMethods(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleChange = (e) => {
    setMoveData({ ...moveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const installments = parseInt(moveData.installments);

      for (let i = 0; i < installments; i++) {
        const installmentDate = new Date(moveData.date);
        installmentDate.setMonth(installmentDate.getMonth() + i);

        const installmentInfo = `Parcela ${i + 1} de ${installments}`;

        const installmentValue =
          moveData.nature === "negative"
            ? moveData.value / installments
            : moveData.value;

        const installmentData = {
          ...moveData,
          date: installmentDate.toISOString().split("T")[0],
          installment_number: i + 1,
          installmentInfo,
          value: installmentValue,
          installment_value: installmentValue,
        };

        await api.post("/moves/create", installmentData);
      }

      setMoveData(initialState);
      alert("Movimentação criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert(`Erro ao criar movimentação.${error.message}`);
    }
  };

  const categories = [
    "lazer",
    "alimentação",
    "transporte",
    "segurança",
    "saúde",
    "bem-estar",
    "estética",
    "educação",
    "serviços de internet e tv",
    "presentes",
    "mimos pessoais",
    "utilitários do lar",
    "equipamentos veiculares",
    "aposta em rifas ou loterias",
    "filhos",
    "outros",
  ];

  if (!isUserLoggedIn()) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Movimentação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="description">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={moveData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="value">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              name="value"
              value={moveData.value}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="nature">
            <Form.Label>Natureza</Form.Label>
            <Form.Control
              as="select"
              name="nature"
              value={moveData.nature}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a natureza</option>
              <option value="positive">Positiva</option>
              <option value="negative">Negativa</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              disabled={moveData.nature === "positive"}
              as="select"
              name="category"
              value={moveData.category}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a categoria</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="paymentMethod">
            <Form.Label>Método de Pagamento</Form.Label>
            <Form.Control
              disabled={moveData.nature === "positive"}
              as="select"
              name="paymentMethod"
              value={moveData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o método de pagamento</option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method._id}>
                  {method.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="installments">
            <Form.Label>Número de Parcelas</Form.Label>
            <Form.Control
              type="number"
              name="installments"
              value={moveData.installments}
              onChange={handleChange}
              min="1"
              required
              disabled={moveData.nature === "positive"}
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={moveData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Adicionar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MoveForm;
