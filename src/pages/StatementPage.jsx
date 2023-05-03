import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { MoveList } from "./MoveList";
import { api } from "../api/axios";

const StatementPage = () => {
  console.log("StatementPage está sendo renderizado");
  const [referenceMonth, setReferenceMonth] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthOptions, setMonthOptions] = useState([]);

  useEffect(() => {
    const currentMonth = new Date().toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
      }).replace("/", "-");
    setReferenceMonth(currentMonth.replace("/", "-"));
    setSelectedMonth(currentMonth);

    const fetchMonthOptions = async () => {
      try {
        const response = await api.get("/moves/month-options");
        setMonthOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMonthOptions();
  }, []);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReferenceMonth(selectedMonth.replace("/", "-"));
    console.log(referenceMonth)
  };

  const handleEdit = (move) => {
    // Lógica para editar a movimentação selecionada
  };

  const handleDelete = (move) => {
    // Lógica para deletar a movimentação selecionada
  };

  return (
    <Container>
      <h1>Extrato Mensal</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-end">
          <Col sm={3}>
            <Form.Label htmlFor="monthSelector" srOnly>
              Mês de Referência
            </Form.Label>
            <Form.Control
              id="monthSelector"
              as="select"
              custom
              value={selectedMonth}
              onChange={handleChange}
            >
              {monthOptions.map((monthOption) => (
                <option key={monthOption} value={monthOption}>
                  {monthOption}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col xs="auto">
            <Button type="submit">Selecionar Mês</Button>
          </Col>
        </Row>
      </Form>
      <MoveList referenceMonth={referenceMonth} handleEdit={handleEdit} handleDelete={handleDelete} />
    </Container>
  );
};

export default StatementPage;
