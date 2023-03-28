import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Formulario = styled(Modal)`
  min-width: 500px`;

const CustomForm = () => {
  const [type, setType] = useState('POSITIVO');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/movimentos', { type, description, value }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Handle success: clear form, show message, etc.
    } catch (error) {
      // Handle error: show error message, etc.
    }
  };

  return (
   
  
          <Formulario onSubmit={handleSubmit}>
            <Formulario.Group controlId="type">
              <Formulario.Label>Type</Formulario.Label>
             
              <Formulario.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="POSITIVO">Positive</option>
            <option value="NEGATIVO">Negative</option>
          </Formulario.Control>
        </Formulario.Group>
        <Formulario.Group controlId="description">
          <Formulario.Label>Description</Formulario.Label>
          <Formulario.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </Formulario.Group>
        <Formulario.Group controlId="value">
          <Formulario.Label>Value</Formulario.Label>
          <Formulario.Control
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </Formulario.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Formulario>


);
};

export default CustomForm;