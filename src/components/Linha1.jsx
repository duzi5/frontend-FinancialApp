import React from "react";
import CardDashboard from "./CardDashboard";
import { Row, Col } from "react-bootstrap";

export default (props) => {
  return (
    <Row>
      <Col xs="12" sm="6" md="6" lg="3">
        <CardDashboard title="Receitas" total="21324" subtotal="2031" />
      </Col>
      <Col xs="12" sm="6" md="6" lg="3">
        <CardDashboard title="Despesas" total="221324,50" subtotal="2201,00" />
      </Col>
      <Col xs="12" sm="6" md="6" lg="3">
        <CardDashboard title="Saldo Atual" total="16703" subtotal="3392" />
      </Col>
      <Col xs="12"sm="6" md="6" lg="3">
        <CardDashboard
          title="Orçamento Disponível"
          total="12.8%"
          subtotal="-1.22%"
        />
      </Col>
    </Row>
  );
};
