import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { api } from "../api/axios";

const GoalForm = ({ handleClose }) => {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    const today = new Date().toISOString().split("T")[0];
    if (deadline < today) {
      setErrorMsg("O prazo não pode ser uma data anterior a hoje.");
      return;
    }
    if (totalValue < 0) {
      setErrorMsg("O valor total deve ser positivo.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await api.post(
        "/goals/goals",
        {
          description,
          deadline,
          total_value: totalValue,
          partial_value: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error(error.response.data);
      setErrorMsg("Ocorreu um erro ao cadastrar o objetivo. Tente novamente.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMsg && (
        <p style={{ color: "red", marginBottom: "0.5rem" }}>{errorMsg}</p>
      )}
      <Form.Group controlId="description">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Digite a descrição do objetivo"
          required
        />
      </Form.Group>

      <Form.Group controlId="deadline">
        <Form.Label>Prazo</Form.Label>
        <Form.Control
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="totalValue">
        <Form.Label>Valor Total</Form.Label>
        <Form.Control
          type="number"
          value={totalValue}
          onChange={(event) => setTotalValue(event.target.value)}
          placeholder="Digite o valor total do objetivo"
          step="0.01"
          min="0"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
        Cadastrar
      </Button>
    </Form>
  );
};

export default GoalForm;
