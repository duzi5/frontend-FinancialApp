import React, {useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaPlus, FaBullseye, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import styled from 'styled-components';


const StyledButton = styled.button`
  /* Add the same styles as StyledLink */
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
  background-color: #333;
  padding: 1rem;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  &.active {
    color: #f9b233;
  }

  svg {
    font-size: 2rem;
  }
`;

const Navigation = () => {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    




    if (['/', '/login', '/signin'].includes(location.pathname)) {
      return null;
    }
  
    return (
      <StyledNav>
        <StyledLink to="/" exact>
          <FaHome />
        </StyledLink>
        <StyledLink to="/dashboard">
          <FaTachometerAlt />
        
        </StyledLink>
        <StyledLink to="/add-move">
          <FaPlus />
        </StyledLink>
        <StyledLink to="/metas">
          <FaBullseye />
        </StyledLink>
        <StyledLink to="/add-payment-method">
          <FaCreditCard />
        </StyledLink>
        <StyledLink to="/logout">
          <FaSignOutAlt />
        </StyledLink>
      </StyledNav>
    );
  };
  
  export default Navigation;
  