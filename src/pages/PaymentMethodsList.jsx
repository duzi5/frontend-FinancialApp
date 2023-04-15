import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import EditPaymentMethodForm from "./EditPaymentMethodForm";
import { api } from "../api/axios";

const StyledContainer = styled(Container)`
  padding: 2rem;
  border-radius: 8px;
`;

const StyledTable = styled(Table)`
  background-color: #e7dede;
  color: #262424;
`;

const PaymentMethodsList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get("payment_methods/payment_methods");
        console.log("Response data:", response.data);
        setPaymentMethods(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleShowModal = (paymentMethodId) => {
    setSelectedPaymentMethodId(paymentMethodId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaymentMethodId(null);
  };

  const handleShowConfirmDeleteModal = (paymentMethodId) => {
    setSelectedPaymentMethodId(paymentMethodId);
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
    setSelectedPaymentMethodId(null);
  };

  const handleDeletePaymentMethod = async () => {
    console.log("selectedPaymentMethodId:", selectedPaymentMethodId);

    try {
      await api.delete(
        `payment_methods/payment_methods/${selectedPaymentMethodId}`
      );
      setPaymentMethods(
        paymentMethods.filter(
          (method) => method._id !== selectedPaymentMethodId
        )
      );
      alert("Payment method deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting payment method.");
    }
    handleCloseConfirmDeleteModal();
  };

  const handleCreateOrUpdatePaymentMethod = async (paymentMethod) => {
    if (selectedPaymentMethodId) {
      // Update existing payment method
      try {
        await api.put(
          `payment_methods/payment_methods/${selectedPaymentMethodId}`,
          paymentMethod
        );
        setPaymentMethods(
          paymentMethods.map((method) =>
            method._id === selectedPaymentMethodId
              ? { ...paymentMethod, _id: method._id }
              : method
          )
        );
        alert("Payment method updated successfully!");
      } catch (error) {
        console.error(error);
        alert("Error updating payment method.");
      }
    } else {
      try {
        const response = await api.post(
          "/payment_methods/payment_methods",
          paymentMethod
        );
        setPaymentMethods([...paymentMethods, response.data]);
        alert("Payment method created successfully!");
      } catch (error) {
        console.error(error);
        alert("Error creating payment method.");
      }
    }
    handleCloseModal();
  };
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method._id === selectedPaymentMethodId
  );
  return (
    <StyledContainer>
      <h2>Métodos de Pagamento</h2>
      <StyledTable striped hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Tipo</th>
            <th>Bandeira</th>
            <th>Banco</th>
            <th>MDC</th>
            <th>Vencimento</th>
            <th>Saldo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((method) => (
            <tr key={method._id}>
              <td>{method._id}</td>
              <td>{method.type}</td>
              <td>{method.brand}</td>
              <td>{method.bank}</td>
              <td>{method.best_purchase_day}</td>
              <td>{method.due_date}</td>
              <td>{method.saldo}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleShowModal(method._id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleShowConfirmDeleteModal(method._id)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Button variant="success" onClick={() => handleShowModal(null)}>
        Adicionar Método de Pagamento
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPaymentMethodId
              ? "Edit Payment Method"
              : "Add Payment Method"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPaymentMethodForm
            paymentMethod={selectedPaymentMethod} // Pass the selected payment method
            onSubmit={handleCreateOrUpdatePaymentMethod}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showConfirmDeleteModal}
        onHide={handleCloseConfirmDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar deleção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja apagar esse método de pagamento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDeleteModal}>
            {" "}
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeletePaymentMethod}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledContainer>
  );
};

export default PaymentMethodsList;
