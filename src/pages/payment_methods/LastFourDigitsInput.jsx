import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const DigitsContainer = styled.div`
  display: flex;
  margin: auto;
  width: 100%;

  justify-content: center;
  gap: 5px;
`;

const DigitInput = styled(Form.Control)`
  font-size: 20px;
  color: #e7e7e7;
  background-color: #a39d9d;
  width: 25px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #6c757d;
  padding: 0;
  margin: 0;
`;

const LastFourDigitsInput = ({ value, onChange }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const digit = e.target.value;
    if (/^\d*$/.test(digit) && digit.length <= 1) {
      const newValue = value.split("").map((d, i) => (i === index ? digit : d)).join("");
      onChange(newValue);

      // Passar para o próximo input
      if (digit.length === 1 && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && value[index] === "") {
      const newValue = value.split("").map((d, i) => (i === index - 1 ? "" : d)).join("");
      onChange(newValue);

      // Voltar para o input anterior
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <Form.Group controlId="formLastFourDigits">
      <Form.Label>Últimos 4 dígitos</Form.Label>
      <DigitsContainer>
        <span style={{fontSize:  "25px"}}>XXXX XXXX XXXX </span>
        {[0, 1, 2, 3].map((index) => (
          <DigitInput
            key={index}
            type="text"
            value={value[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
            pattern="[0-9]*"
            inputMode="numeric"
          />
        ))}
      </DigitsContainer>
    </Form.Group>
  );
};

export default LastFourDigitsInput;
