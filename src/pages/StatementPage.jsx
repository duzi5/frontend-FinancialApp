import React, { useState, useEffect } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import MoveList from "./MoveList";
import { api } from "../api/axios";

const StatementPage = () => {
  console.log("StatementPage está sendo renderizado");
  const [referenceMonth, setReferenceMonth] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthOptions, setMonthOptions] = useState([]);

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setReferenceMonth(currentMonth);
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
    setReferenceMonth(selectedMonth);
  };

  return (
    <Container>
      <h1>Extrato Mensal</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Row className="align-items-center">
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
        </Form.Row>
      </Form>
      {/* <MoveList referenceMonth={referenceMonth} /> */}
    </Container>
  );
};

export default StatementPage;
