import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaBullseye,
  FaCreditCard,
  FaSignOutAlt,
  FaFlag,
} from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

  const handleLogout = () => {
    localStorage.setItem("access_token", "");
    navigate("/login");
  };

  return (
    <StyledNav>
      <StyledLink to="/dashboard" activeClassName="active">
        <FaTachometerAlt />
      </StyledLink>
      <StyledLink to="/add-move" activeClassName="active">
        <FaPlus />
      </StyledLink>
      <StyledLink to="/targets" activeClassName="active">
        <FaBullseye />
      </StyledLink>
      <StyledLink to="/billing" activeClassName="active">
        <FaCreditCard />
      </StyledLink>
      <StyledLink to="/goals-page" activeClassName="active">
        <FaFlag />
      </StyledLink>
      <StyledButton onClick={handleLogout}>
        <FaSignOutAlt />
      </StyledButton>
    </StyledNav>
  );
};
export default Sidebar;
