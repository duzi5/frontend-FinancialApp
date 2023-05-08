import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { api } from "../api/axios";
import AddPaymentMethodModal from "./AddPaymentMethodModal";
import DeletePaymentMethodModal from "./DeletePaymentMethodModal";


const StyledContainer = styled(Container)`
  padding: 2rem;
  border-radius: 8px;
`;

const StyledTablestriped = styled(Table)`
  background-color: #f3eded;
  color: #232323;
`;

const PaymentMethodsList = () => {
  const { currentUser } = JSON.parse(localStorage.getItem('user'))
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [family, setFamily] = useState(null);

  useEffect(() => {
    const fetchFamily = async () => {
      if (!currentUser.family) {
        return;
      }

      try {
        const response = await api.get(`/families?name=${currentUser.family}`);
        console.log("Response data:", response.data);
        setFamily(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFamily();
  }, [currentUser]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!family) {
        return;
      }

      try {
        const response = await api.get(`/payment_methods?f=${family._id}`);
        console.log("Response data:", response.data);
        setPaymentMethods(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaymentMethods();
  }, [family]);

  const handleShowAddModal = () => {
    setSelectedPaymentMethod(null);
    setShowAddModal(true);
  };

  const handleShowEditModal = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedPaymentMethod(null);
  };

  const handleShowDeleteModal = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setShowDeleteModal(true);
  };
    
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPaymentMethod(null);
  };
    
  const handleDeletePaymentMethod = async () => {
    console.log("selectedPaymentMethod:", selectedPaymentMethod);

    try {
      await api.delete(
        `payment_methods/payment_methods/${selectedPaymentMethod._id}`
      );
      setPaymentMethods(
        paymentMethods.filter(
          (method) => method._id !== selectedPaymentMethod._id
        )
      );
      alert("Payment method deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting payment method.");
    }
    handleCloseDeleteModal();
  };
    
  const handleCreateOrUpdatePaymentMethod = async (paymentMethod) => {
    if (selectedPaymentMethod) {
      // Update existing payment method
      try {
        await api.put(
          `payment_methods/payment_methods/${selectedPaymentMethod._id}`,
          paymentMethod
        );
        setPaymentMethods(
          paymentMethods.map((method) =>
            method._id === selectedPaymentMethod._id
            ? { ...paymentMethod, _id: method._id }
            : method
          )
        );
        alert("Payment method updated successfully!");
      } catch (error) {
        console.error(error);
        alert("Error updating payment method.");
      }
    }
      else {
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
        
        return (
        <StyledContainer>
        <h2>Métodos de Pagamento</h2>
        <StyledTablestriped hover>
        <thead>
        <tr>
        <th>Tipo</th>
        <th>Nome</th>
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
        <td>{method.type}</td>
        <td>{method.name}</td>
        <td>{method.brand}</td>
        <td>{method.bank}</td>
        <td>{method.mdc}</td>
        <td>{method.expiration_date}</td>
        <td>{method.balance}</td>
        <td>
        <Button
        variant="primary"
        onClick={() => handleShowEditModal(method)}
        >
        Editar
        </Button>{" "}
        <Button
        variant="danger"
        onClick={() => handleShowDeleteModal(method)}
        >
        Excluir
        </Button>
        </td>
        </tr>
        ))}
        </tbody>
        </StyledTablestriped>
        <Button variant="success" onClick={handleShowAddModal}>
        Adicionar Método de Pagamento
        </Button>
          <AddPaymentMethodModal
            show={showAddModal}
            handleCloseModal={handleCloseModal}
            handleCreateOrUpdatePaymentMethod={handleCreateOrUpdatePaymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        
          <DeletePaymentMethodModal
            show={showDeleteModal}
            handleCloseModal={handleCloseDeleteModal}
            handleDeletePaymentMethod={handleDeletePaymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        </StyledContainer>
        );
        };
        
        export default PaymentMethodsList;