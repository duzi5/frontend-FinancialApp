import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { api } from "../api/axios";
import PaymentMethodsListComponent from "./PaymentMethodsListComponent";
import CategoriesInput from "./CategoriesInput";

export const MovesForm = ({ onSubmit, moveToEdit }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [nature, setNature] = useState("negative");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");
  const [installmentInfo, setInstallmentInfo] = useState("");
  const [reserve, setReserve] = useState(false);
  const [balanceGoals, setBalanceGoals] = useState([]);

  useEffect(() => {
    const fetchBalanceGoals = async () => {
      try {
        const response = await api.get("/balance-goals");
        setBalanceGoals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBalanceGoals();
  }, []);

  useEffect(() => {
    if (moveToEdit) {
      setDescription(moveToEdit.description);
      setValue(moveToEdit.value);
      setNature(moveToEdit.nature);
      setCategory(moveToEdit.category);
      setPaymentMethod(moveToEdit.paymentMethod);
      setDate(moveToEdit.date.slice(0, 10));
      setInstallmentInfo(moveToEdit.installmentInfo);
      setReserve(moveToEdit.reserve);
    }
  }, [moveToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const move = {
      description,
      value,
      nature,
      category,
      paymentMethod,
      date,
      installmentInfo,
      reserve,
    };

    
    try {
      const response = await api.post("/moves/add_move", move);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  
  
      setDescription("");
      setValue("");
      setNature("expense");
      setCategory("");
      setPaymentMethod("");
      setDate("");
      setInstallmentInfo("");
      setReserve(false);
      
    
  };
  

  const handleNatureChange = (event) => {
    setNature(event.target.value);
    if (event.target.value === "income") {
      setReserve(false);
    }
  };

  const handleReserveChange = (event) => {
    setReserve(event.target.checked);
    if (event.target.checked) {
      setNature("negative");
      setPaymentMethod("");
    }
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    if (reserve) {
      const remainingValue = parseFloat(newValue) - parseFloat(value);
      setBalanceGoals(
        balanceGoals.map((goal) => {
          if (goal._id === paymentMethod) {
            return {
              ...goal,
              remainingValue: remainingValue.toFixed(2),
            };
          } else {
            return goal;
          }
        })
      );
      setValue(newValue);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={reserve ? 12 : 6}>
          <Form.Group
            controlId="description"
            style={{ display: reserve ? "none" : "block" }}
          >
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite uma descrição para a movimentação"
              required={!reserve}
            />
          </Form.Group>
        </Col>
        {reserve ? null : (
          <Col sm={6}>
            <Form.Group controlId="nature">
              <Form.Label>Natureza</Form.Label>
              <Form.Control
                as="select"
                value={nature}
                onChange={handleNatureChange}
                required
              >
                <option value="negative">Despesa</option>
                <option value="positive">Receita</option>
              </Form.Control>
            </Form.Group>
          </Col>
        )}
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group controlId="value">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              value={value}
              onChange={handleValueChange}
              step="0.01"
              placeholder="R$ 0,00"
              required
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group controlId="reserve">
            <Form.Check
              type="checkbox"
              label="É uma reserva?"
              checked={reserve}
              onChange={handleReserveChange}
              className="mt-4"
            />
          </Form.Group>
        </Col>
      </Row>
      {reserve ? (
        <Row>
          <Col sm={6}>
            <Form.Group controlId="paymentMethod">
              <Form.Label>Objetivo de Destino</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Selecione um objetivo</option>
                {balanceGoals.map((goal) => (
                  <option key={goal._id} value={goal._id}>
                    {goal.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col sm={6}>
              <CategoriesInput />
            </Col>
            <Col sm={6}>
              <Form.Group controlId="paymentMethod">
                <PaymentMethodsListComponent />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Form.Group controlId="date">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="installmentInfo">
                <Form.Label>Parcela</Form.Label>
                <Form.Control
                  type="number"
                  value={installmentInfo}
                  onChange={(e) => setInstallmentInfo(e.target.value)}
                  placeholder="Digite informações da parcela"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col sm={12} className="text-right mt-3">
          <Button variant="primary" type="submit">
            {moveToEdit ? "Editar" : "Adicionar"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MovesForm;
