
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function ContaBancaria() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Conta Bancária</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select aria-label="Banco">
            <option>Banco</option>
          </Form.Select>
          <div>
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="" id="descricao" />
          </div>
          <div>
            <Form.Label>Saldo Inicial</Form.Label>
            <Form.Control type="number" id="saldoInicial" />
          </div>
        <div>

        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
