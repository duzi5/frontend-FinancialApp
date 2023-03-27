import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import axios from 'axios';

const UserForm = ({ userId, onSuccess }) => {
  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [family, setFamily] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const saveUser = async (user) => {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => formData.append(key, value));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (userId) {
      const { data } = await axios.put(`/api/users/${userId}`, formData, config);
      return data;
    } else {
      const { data } = await axios.post('/api/users', formData, config);
      return data;
    }
  };

  const mutation = useMutation(saveUser, {
    onSuccess: () => {
      setErrorMessage('');
      onSuccess && onSuccess();
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Ocorreu um erro ao salvar o usuário.');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    mutation.mutate({ avatar, firstName, lastName, birthDate, family, password });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form.Group controlId="avatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="birthDate">
          <Form.Label>Data de nascimento</Form.Label>
          <Form.Control
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="family">
          <Form.Label>Família</Form.Label>
          <Form.Control
            type="text"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group controlId="passwordConfirmation">
      <Form.Label>Confirmação de senha</Form.Label>
      <Form.Control
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      {userId ? 'Atualizar usuário' : 'Criar usuário'}
    </Button>
  </Form>
</Container>
  )}
  

  export default UserForm