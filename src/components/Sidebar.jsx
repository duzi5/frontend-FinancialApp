import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaBullseye,
  FaCreditCard,
  FaSignOutAlt,
  FaFlag,
  FaExchangeAlt,
} from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import GoalForm from "../pages/GoalForm";
import MovesForm from "../pages/MovesForm";

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  svg {
    font-size: 2rem;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #38054c;
  padding: 1rem;
  height: 100vh;
  width: 60px;
  position: fixed;
  left: 0;
  top: 0;
`;

const StyledLink = styled(NavLink)`
  background: none;
  border: none;
  color: #fff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  &.active {
    color: #c8df17;
  }

  &:hover {
    color: #c8df17;
  }

  svg {
    font-size: 2rem;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showMoveForm, setShowMoveForm] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("access_token", "");
    navigate("/login");
  };

  const handleShowGoalForm = () => {
    setShowGoalForm(true);
  };

  const handleCloseGoalForm = () => {
    setShowGoalForm(false);
  };

  const handleShowMoveForm = () => {
    setShowMoveForm(true);
  };

  const handleCloseMoveForm = () => {
    setShowMoveForm(false);
  };

  return (
    <StyledNav>
      <StyledLink to="/dashboard" activeClassName="active">
        <FaTachometerAlt />
      </StyledLink>
      <StyledButton onClick={handleShowGoalForm}>
        <FaFlag />
      </StyledButton>
      <StyledLink to="/targets" activeClassName="active">
        <FaBullseye />
      </StyledLink>

      <StyledLink to="/payment-methods-list" activeClassName="active">
        <FaCreditCard />
      </StyledLink>
      <StyledButton onClick={handleShowMoveForm}>
        <FaExchangeAlt />
      </StyledButton>
      <StyledButton onClick={handleLogout}>
        <FaSignOutAlt />
      </StyledButton>

      <Modal show={showGoalForm} onHide={handleCloseGoalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo objetivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GoalForm handleClose={handleCloseGoalForm} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGoalForm}>
Fechar
</Button>
</Modal.Footer>
</Modal>
  <Modal show={showMoveForm} onHide={handleCloseMoveForm}>
    <Modal.Header closeButton>
      <Modal.Title>Cadastrar nova movimentação</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <MovesForm handleClose={handleCloseMoveForm} />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseMoveForm}>
        Fechar
      </Button>
    </Modal.Footer>
  </Modal>
</StyledNav>
);
};

export default Sidebar;