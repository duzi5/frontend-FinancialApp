import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import EditPaymentMethodForm from './EditPaymentMethodForm';
import {api} from '../api/axios';

const StyledContainer = styled(Container)`
  background-color: #424242;
  padding: 2rem;
  border-radius: 8px;
`;

const StyledTable = styled(Table)`
  background-color: #424242;
  color: #fff;
`;

const PaymentMethodsList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get('payment_methods/payment_methods_list');
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

  const handleCreateOrUpdatePaymentMethod = async (paymentMethod) => {
    if (selectedPaymentMethodId) {
      // Update existing payment method
      try {
        await api.put(`payment_methods/payment_methods/${selectedPaymentMethodId}`, paymentMethod);
        setPaymentMethods(
          paymentMethods.map((method) =>
            method._id === selectedPaymentMethodId ? { ...paymentMethod, _id: method._id } : method
          )
        );
        alert('Payment method updated successfully!');
      } catch (error) {
        console.error(error);
        alert('Error updating payment method.');
      }
    } else {
      // Create new payment method
      try {
        const response = await api.post('/payment_methods/payment_methods', paymentMethod);
        setPaymentMethods([...paymentMethods, response.data]);
        alert('Payment method created successfully!');
      } catch (error) {
        console.error(error);
        alert('Error creating payment method.');
      }
    }
    handleCloseModal();
  };

  return (
    <StyledContainer>
      <h2>Payment Methods</h2>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Bandeira</th>
            <th>Banco</th>
            <th>Melhor Dia de Compra</th>
            <th>Vencimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((method) => (
            <tr key={method._id}>
              <td>{method.type}</td>
              <td>{method.brand}</td>
              <td>{method.bank}</td>
              <td>{method.best_purchase_day}</td>
              <td>{method.due_date}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal(method._id)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Button variant="success" onClick={() => handleShowModal(null)}>
        Add Payment Method
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPaymentMethodId ? 'Edit Payment Method' : 'Add Payment Method'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPaymentMethodForm
            paymentMethodId={selectedPaymentMethodId}
            onSubmit={handleCreateOrUpdatePaymentMethod}
          />
        </Modal.Body>
      </Modal>
    </StyledContainer>
  );
};

export default PaymentMethodsList;
