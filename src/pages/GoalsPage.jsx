import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { api } from "../api/axios";
import GoalsModal from "./GoalsModal";
import { differenceInDays } from "date-fns"
const GoalsPage = () => {
  const { data: goals, isLoading } = useQuery("goals", async () => {
    const response = await api.get("/goals/goals");
    return response.data;
  });
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <StyledContainer>
      <Row>
        <Col>
          <h1>Objetivos da Família</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <StyledButton onClick={handleShowModal}>
            Adicionar Objetivo
          </StyledButton>
        </Col>
      </Row>
      {isLoading ? (
        <p>Carregando objetivos...</p>
      ) : (
        <StyledListGroup>
          {goals.map((goal, index) => (
            <StyledListGroupItem key={index}>
              <h5>{goal.title}</h5>
              <p>{goal.description}</p>
              <StyledProgressBar
                now={(goal.balance / goal.target_value) * 100}
                label={`${Math.round((goal.balance / goal.target_value) * 100)}%`}
              />
              <StyledInfoRow>
                <StyledInfoItem>
                  <StyledInfoLabel>Prazo:</StyledInfoLabel>
                  <StyledInfoValue>
                    {differenceInDays(new Date(goal.dueDate), new Date())} dias restantes
                  </StyledInfoValue>
                </StyledInfoItem>
                <StyledInfoItem>
                  <StyledInfoLabel>Valor total:</StyledInfoLabel>
                  <StyledInfoValue>R$ {goal.target_value}</StyledInfoValue>
                </StyledInfoItem>
                <StyledInfoItem>
                  <StyledInfoLabel>Valor coletado:</StyledInfoLabel>
                  <StyledInfoValue>R$ {goal.balance}</StyledInfoValue>
                </StyledInfoItem>
              </StyledInfoRow>
            </StyledListGroupItem>
          ))}
        </StyledListGroup>
      )}
      <GoalsModal show={showModal} handleClose={handleCloseModal} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 2rem;
`;

const StyledListGroup = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const StyledListGroupItem = styled.li`
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  padding: 1rem;
`;

const StyledProgressBar = styled.progress`
  width: 100%;
  height: 0.5rem;
  margin-top: 0.5rem;
`;

const StyledInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const StyledInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfoLabel = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

const StyledInfoValue = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
`;

export default GoalsPage;
