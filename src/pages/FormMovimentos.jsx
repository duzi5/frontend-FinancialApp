import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";


const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormStyled = styled(Form)`
  width: 50%;
  background-color: beige;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

const FormLabel = styled(Form.Label)`
  color: blue;
  font-weight: bold;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 20px;
`;

const FormControl = styled(Form.Control)`
  border-color: blue;
  border-radius: 5px;
`;

const SubmitButton = styled(Button)`
  background-color: blue;
  border-color: blue;
`;

const FormInput = ({ id, label, type, value, onChange }) => (
  <FormGroup controlId={id}>
    <FormLabel>{label}</FormLabel>
    <FormControl type={type} value={value} onChange={onChange} />
  </FormGroup>
);

const FormMovimentos = () => {
  const [movimento, setMovimento] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData) => {
      return fetch("/
      ", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("registros");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      movimento,
      valor,
      descricao,
    };
    mutate(formData);
    setMovimento("");
    setValor("");
    setDescricao("");
  };

  return (
    <FormWrapper>
      <FormStyled onSubmit={handleSubmit}>
        <FormInput
          id="movimento"
          label="Movimento (positivo ou negativo)"
          type="text"
          value={movimento}
          onChange={(e) => setMovimento(e.target.value)}
        />
        <FormInput
          id="valor"
          label="Valor (em reais)"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <FormInput
          id="descricao"
          label="Descrição"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <SubmitButton type="submit">Enviar</SubmitButton>
      </FormStyled>
    </FormWrapper>
  );
};

export default FormMovimentos
