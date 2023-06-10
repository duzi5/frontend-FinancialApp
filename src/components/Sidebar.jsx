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
  FaUsers,
} from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import MovesForm from "../pages/MovesForm";
import FamilyForm from "../pages/families/FamilyForm";

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
  const [showFamilyForm, setShowFamilyForm] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("access_token", "");
    navigate("/login");
  };

  const handleShowMoveForm = () => {
    setShowMoveForm(true);
  };

  const handleCloseMoveForm = () => {
    setShowMoveForm(false);
  };

  const handleShowFamilyForm = () => {
    setShowFamilyForm(true);
  };

  const handleCloseFamilyForm = () => {
    setShowFamilyForm(false);
  };

  return (
    <StyledNav>
      <StyledLink to="/dashboard" activeClassName="active">
        <FaTachometerAlt />
      </StyledLink>
      <StyledLink to="/goals-page" activeClassName="active">
        <FaBullseye />
      </StyledLink>
      <StyledLink to="/payment-methods-page" activeClassName="active">
        <FaCreditCard />
      </StyledLink>
      <StyledButton onClick={handleShowMoveForm}>
        <FaExchangeAlt />
      </StyledButton>
      <StyledButton onClick={handleShowFamilyForm}>
        <FaUsers />
      </StyledButton>
      <StyledButton onClick={handleLogout}>
        <FaSignOutAlt />
      </StyledButton>

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

      <Modal show={showFamilyForm} onHide={handleCloseFamilyForm}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar nova família</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FamilyForm handleClose={handleCloseFamilyForm} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFamilyForm}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledNav>
  );
};

export default Sidebar;
