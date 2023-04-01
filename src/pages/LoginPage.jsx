import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useMutation } from "react-query";
import { Form, Button } from "react-bootstrap";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

const urlUsers = "http://127.0.0.1:5000/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const authMutation = useMutation(async () => {
    try {
      const response = await api.post(urlUsers, {
        email,
        password,
      });
      setIsAuthenticated(true);
      // Get the access token from the response
      const accessToken = response.data.access_token;
      const user = response.data.user;
      // Store the access token and user info in localStorage
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
      
      return response.data;
    } catch (error) {
      setErrorMessage("Email ou senha incorretos.");
      throw new Error("Authentication failed");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    authMutation.mutate();
  };

  return (
    <StyledContainer>
      <WelcomeMessage show={showWelcomeAnimation}>
        Bem-vindo(a)!
      </WelcomeMessage>
      <h1>Akiva</h1>
      <p>Conexões em finanças</p>
      <LoginForm onSubmit={handleSubmit}>
        <AnimatedFormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <AnimatedFormInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <AnimatedSubmitButton type="submit" disabled={authMutation.isLoading}>
          {authMutation.isLoading ? "Entrando..." : "Entrar"}
        </AnimatedSubmitButton>
      </LoginForm>
      <BlinkingButton onClick={() => navigate("/signup")}>Cadastrar</BlinkingButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

const WelcomeMessage = styled.h2`
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) => props.show ? "translateY(0)" : "translateY(-20px)"};
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
`;

const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormInput = styled(Form.Control)`
  margin: 1rem;
  padding: 0.5rem;
  width: 300px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
`;const AnimatedFormInput = styled(FormInput)`
opacity: 0;
animation: ${keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`} 0.5s ease-in-out forwards;
`;

const SubmitButton = styled(Button)`
margin: 1rem;
padding: 0.5rem 1rem;
width: 200px;
`;

const AnimatedSubmitButton = styled(SubmitButton)`
opacity: 0;
animation: ${keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`} 0.5s ease-in-out forwards;
`;

const ErrorMessage = styled.p`
color: #ff5555;
font-size: 1rem;
margin-top: 0.5rem;
`;

const blinkingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;
const BlinkingButton = styled.button`
background-color: #FF8C00;
color: #fff;
border: none;
border-radius: 5px;
padding: 10px 20px;
cursor: pointer;
animation: ${blinkingAnimation} 2s linear infinite;

&:hover {
  opacity: 0.8;
}
`;



export default LoginPage;