import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { api } from '../api/axios';

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

const UserForm = () => {
  const [families, setFamilies] = useState([]);
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    family: '',
    name: '',
    last_name: '',
    picture: null,
  });

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const { data } = await api.get('/api/families');
        setFamilies(data);
      } catch (error) {
        console.error('Error fetching families:', error);
      }
    };

    fetchFamilies();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'picture') {
      setUser({ ...user, [name]: event.target.files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await api.post('http://127.0.0.1:5000/create', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log('User created:', data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
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

        {/* Avatar */}
        <Form.Group controlId="picture">
          <FormLabel>Avatar</FormLabel>
          <Form.Control
      type="file"
      name="picture"
      onChange={handleChange}
      required
    />
  </Form.Group>

  {/* Data de nascimento */}
  <Form.Group controlId="birthdate">
    <FormLabel>Data de nascimento</FormLabel>
    <Form.Control
      type="date"
      name="birthdate"
      value={user.birthdate}
      onChange={handleChange}
      required
    />
  </Form.Group>

  {/* E-mail */}
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

  {/* Família */}
  <Form.Group controlId="family">
    <FormLabel>Família</FormLabel>
    <Form.Control
      as="select"
      name="family"
      value={user.family}
      onChange={handleChange}
    >
      <option value="">Selecione uma família</option>
      {families.map((family) => (
        <option key={family._id} value={family._id}>
          {family.name}
        </option>
      ))}
    </Form.Control>
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

  {/* Confirmação de senha */}
  <Form.Group controlId="confirmPassword">
    <FormLabel>Confirme a senha</FormLabel>
    <Form.Control
      type="password"
      name="confirmPassword"
      value={user.confirmPassword}
      onChange={handleChange}
      required
    />
  </Form.Group>

  {/* Botão de envio */}
  <Button variant="primary" type="submit">
    Cadastrar
  </Button>
</StyledForm>
</Container>
)};
export default UserForm;

