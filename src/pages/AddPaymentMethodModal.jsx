import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddPaymentMethodModal = ({
  show,
  handleCloseModal,
  handleCreateOrUpdatePaymentMethod,
  selectedPaymentMethod,
}) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [methodType, setMethodType] = useState("");
  const [bank, setBank] = useState("");
  const [flag, setFlag] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [balance, setBalance] = useState("");
  const [mdc, setMdc] = useState("");

  useEffect(() => {
    if (selectedPaymentMethod) {
      setMethodType(selectedPaymentMethod.methodType);
      setBank(selectedPaymentMethod.bank);
      setFlag(selectedPaymentMethod.flag);
      setExpirationDate(selectedPaymentMethod.expirationDate);
      setBalance(selectedPaymentMethod.balance);
      setMdc(selectedPaymentMethod.mdc);
    }
  }, [selectedPaymentMethod]);

  const onSubmit = (data) => {
    handleCreateOrUpdatePaymentMethod({
      ...data,
      methodType,
      bank,
      flag,
      expirationDate,
      balance,
      mdc,
    });
    reset();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedPaymentMethod ? "Atualizar" : "Adicionar"} Método de
          Pagamento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="methodType">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="methodType"
              placeholder="Digite o tipo de pagamento"
              defaultValue={selectedPaymentMethod?.methodType}
              ref={register({ required: true })}
              onChange={(event) => setMethodType(event.target.value)}
            />
            {errors.methodType && (
              <Form.Text className="text-danger">Campo obrigatório.</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Digite o nome do titular"
              defaultValue={selectedPaymentMethod?.name}
              ref={register({ required: true })}
            />
            {errors.name && (
              <Form.Text className="text-danger">Campo obrigatório.</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="flag">
            <Form.Label>Bandeira</Form.Label>
            <Form.Control
              type="text"
              name="flag"
              placeholder="Digite a bandeira"
              defaultValue={selectedPaymentMethod?.flag}
              ref={register({ required: true })}
              onChange={(event) => setFlag(event.target.value)}
            />
            {errors.flag && (
              <Form.Text className="text-danger">Campo obrigatório.</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="bank">
            <Form.Label>Banco</Form.Label>
            <Form.Control
              type="text"
              name="bank"
              placeholder="Digite o banco"
              defaultValue={selectedPaymentMethod?.bank}
              ref={register({ required: true })}
              onChange={(event) => setBank(event.target.value)}
            />
            {errors.bank && (
              <Form.Text className="text-danger">Campo obrigatório.</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="expirationDate">
            <Form.Label>Data de Expiração</Form.Label>
            <Form.Control
              type="text"
              name="expirationDate"
              placeholder="Digite a data de expiração"
              defaultValue={selectedPaymentMethod?.expirationDate}
              ref={register({ required: true })}
              onChange={(event) => setExpirationDate(event.target.value)}
            />
            {errors.expirationDate && (
              <Form.Text className="text-danger">Campo obrigatório.</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="balance">
            <Form.Label>Saldo</Form.Label>
            <Form.Control
              type="number"
              name="balance"
              placeholder="Digite o saldo"
              defaultValue={selectedPaymentMethod?.balance}
              ref={register({ required: true })}
              onChange={(event) => setBalance(event.target.value)}
            />
            {errors.balance && (
              <Form.Text className="text-danger">Campo obrigatório.</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="mdc">
            <Form.Label>Código de Segurança</Form.Label>
            <Form.Control
              type="text"
              name="mdc"
              placeholder="Digite o código de segurança"
              defaultValue={selectedPaymentMethod?.mdc}
              ref={register({ required: true })}
              onChange={(event) => setMdc(event.target.value)}
            />
            {errors.mdc && (
              <Form.Text className="text-danger">Campo obrigatório.</Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            {selectedPaymentMethod ? "Atualizar" : "Adicionar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPaymentMethodModal;
