import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import GoalsModal from './GoalsModel';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await axios.get('/api/goals'); // replace with your API endpoint
      setGoals(response.data.goals);
    };
    fetchGoals();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <StyledContainer>
      <Row>
        <Col>
          <h1>Objetivos da Família</h1>
        </Col>
       
      </Row>
      <ListGroup>
        {goals.map(goal => (
          <ListGroup.Item key={goal.id}>
            <h5>{goal.description}</h5>
            <p>Prazo: {goal.deadline}</p>
            <p>Valor total: R${goal.totalValue}</p>
            <p>Valor coletado: R${goal.collectedValue}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <GoalsModal show={showModal} handleClose={closeModal} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  float: right;
`;

export default GoalsPage;
