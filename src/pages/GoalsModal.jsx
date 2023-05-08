import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "react-query";
import { api } from "../api/axios";
import CurrencyFormat from 'react-currency-format';



const GoalsModal = () => {
  const [show, setShow] = useState(false);
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Baixa",
    status: "Não Iniciado",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addGoal = async (goal) => {
    const { data } = await api.post("/goals/goals", goal, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  };

  const mutation = useMutation(addGoal, {
    onSuccess: () => {
      handleClose();
    },
    onError: (error) => {
      console.error("Erro ao adicionar objetivo:", error);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGoal({ ...goal, [name]: value });
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <FaPlus /> Adicionar Objetivo
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar novo objetivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Título</Form.Label>{" "}
              <Form.Control
                type="text"
                name="title"
                value={goal.title}
                onChange={handleChange}
                placeholder="Insira o título do objetivo"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={goal.description}
                onChange={handleChange}
                placeholder="Insira a descrição do objetivo"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data de Vencimento</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={goal.dueDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prioridade</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={goal.priority}
                onChange={handleChange}
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </Form.Control>
            </Form.Group>
         <Form.Group>
          <Form.Label>Total almejado</Form.Label>
          <Form.Control
              name="targetValue"
              value={goal.targetValue}
              onChange={handleChange}
              placeholder="Insira o valor"
            >
           
            </Form.Control>
         </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="success" onClick={() => mutation.mutate(goal)}>
            Salvar Objetivo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoalsModal;
