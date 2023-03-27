import React from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUsers, FaArrowUp, FaPlus, FaMinus, FaTachometerAlt } from 'react-icons/fa';

const StyledNav = styled(Nav)`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1000;
  background-color: beige;
  width: 80px;
  padding: 10px;
`;

const StyledNavItem = styled(Nav.Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2d3e50;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    background-color: #2d3e50;
  }

  .icon {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }

  .text {
    display: none;
    margin-left: 10px;
  }

  &:hover .text {
    display: inline-block;
  }
`;

const MenuToggle = () => {
  return (
    <StyledNav>
      <StyledNavItem href="/">
        <FaHome className="icon" />
        <span className="text">Home</span>
      </StyledNavItem>
      <StyledNavItem href="/login">
        <FaUsers className="icon" />
        <span className="text">Login</span>
      </StyledNavItem>
      <StyledNavItem href="#">
        <FaArrowUp className="icon" />
        <span className="text">Adicionar</span>
      </StyledNavItem>
      <StyledNavItem href="#">
        <FaPlus className="icon" />
        <span className="text">Adicionar Objetivos</span>
      </StyledNavItem>
      <StyledNavItem href="#">
        <FaMinus className="icon" />
        <span className="text">Remover Move</span>
      </StyledNavItem>
      <StyledNavItem href="/dashboard">
        <FaTachometerAlt className="icon" />
        <span className="text">Dashboard</span>
      </StyledNavItem>
    </StyledNav>
  );
};

export default MenuToggle;