import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dados = {
    email,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:5000/login", dados)
      .then(function (response) {
        localStorage.setItem("access_token", JSON.stringify(response));
        const data = JSON.parse(localStorage.getItem("access_token"));
        console.log(data);
      })
      .catch(function (error) {
        console.error(error);
      });

    const options = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("acess_token"),
      },
    };
    const authorization = axios.get("http://127.0.0.1:5000/protegida", options);
    if (authorization) {
      window.location("http://127.0.0.1:3000/home");
    } else {
      console.error("Chegou sem autorização");
    }
  };
  return (
    <Container>
      <Row>
        <Col md="8" lg="6" xl="4">
          <Form id="form_login" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Salvar" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
