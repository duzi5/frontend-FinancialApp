import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const PaymentTypeContainer = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid #c4c1c1;
  justify-content: center;
  overflow: hidden;
  width: fit-content;
`;

const DebitoDiv = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: ${(props) => (props.selected ? "#4181e7" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  padding: 10px;
  cursor: pointer;

`;

const CreditoDiv = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: ${(props) => (props.selected ? "#4181e7" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  padding: 10px;
  cursor: pointer;

`;

const DebitoCreditoDiv = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: ${(props) => (props.selected ? "#4181e7" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  padding: 10px;
  cursor: pointer;

`;

const PaymentTypeInput = ({ value, onChange }) => {
  const handlePaymentTypeChange = (type) => {
    onChange(type);
  };

  return (
    <Form.Group >
      <Form.Label >Tipo de Pagamento</Form.Label>
      <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
<PaymentTypeContainer>
        <DebitoDiv
          selected={value === "debit"}
          onClick={() => handlePaymentTypeChange("debit")}
        >
          Débito
        </DebitoDiv>
        <CreditoDiv
          selected={value === "credit"}
          onClick={() => handlePaymentTypeChange("credit")}
        >
          Crédito
        </CreditoDiv>
        <DebitoCreditoDiv
          selected={value === "debit_credit"}
          onClick={() => handlePaymentTypeChange("debit_credit")}
        >
          Débito e Crédito
        </DebitoCreditoDiv>
      </PaymentTypeContainer>
</div>
    </Form.Group>
  );
};

export default PaymentTypeInput;


