import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #222;
`;

const StyledForm = styled(Form)`
  background-color: #333;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const FormLabel = styled(Form.Label)`
  color: #fff;
`;

const ErrorMessage = styled.p`
  color: #ff3333;
`;

const UserForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    family: "",
    name: "",
    last_name: "",
  });
  const [error, setError] = useState(null);

  const fetchFamilies = async () => {
    const { data } = await api.get("/families/families");
    return data;
  };

  const createUser = async (user) => {
    const { data } = await api.post("/create", user, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  };

  const { data: families, isLoading } = useQuery("families", fetchFamilies);
  const mutation = useMutation(createUser, {
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      setError(
        "Erro ao criar usuário. Verifique se o e-mail já foi cadastrado."
      );
    },
  });

  const validateForm = () => {
    if (user.password.length < 6) {
      return false;
    }
    if (user.password !== user.confirmPassword) {
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setError(
        "A senha deve ter pelo menos 6 dígitos e ser igual à confirmação de senha."
      );
      return;
    }

    const userToSend = { ...user };
    delete userToSend.confirmPassword;

    mutation.mutate(userToSend);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {/* Nome */}
        <Form.Group controlId="name">
          <FormLabel>Nome</FormLabel>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Sobrenome */}
        <Form.Group controlId="last_name">
          <FormLabel>Sobrenome</FormLabel>
          <Form.Control
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="email">
          <FormLabel>Email</FormLabel>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Senha */}
        <Form.Group controlId="password">
          <FormLabel>Senha</FormLabel>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Confirmar Senha */}
        <Form.Group controlId="confirmPassword">
          <FormLabel>Confirmar Senha</FormLabel>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Data de Nascimento */}
        <Form.Group controlId="birthdate">
          <FormLabel>Data de Nascimento</FormLabel>
          <Form.Control
            type="date"
            name="birthdate"
            value={user.birthdate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Família */}
        <Form.Group controlId="family">
          <FormLabel>Família</FormLabel>
          <Form.Control
            as="select"
            name="family"
            value={user.family}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma família</option>
            {families?.map((family) => (
              <option key={family.id} value={family.id}>
                {family.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit">Criar Conta</Button>
      </StyledForm>
    </Container>
  );
};

export default UserForm;
