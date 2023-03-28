import React from 'react';
import styled from 'styled-components';


import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('/fundo2.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 48px;
  background-color: #0000004b;
  padding: 8px;
  border-radius: 50%;
`;

const Slogan = styled.p`
  color: #fafafa;
  font-size: 24px;
  margin-bottom: 50px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Button = styled.button`
  background-color: #444;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #555;
  }
`;
  
const HomePage = () => {
    const navigate = useNavigate()
    return (
        <Container>
          <Title>Akiva</Title>
          <Slogan>Conexões em finanças</Slogan>
          <ButtonContainer>
            <Button onClick={() => navigate('/signin') }>Sign In</Button>
            <Button onClick={ () => navigate('/login') }>Log In</Button>
          </ButtonContainer>
        </Container>
      );
  // Your component logic and rendering will go here
};

export default HomePage;
