import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CSSTransition } from "react-transition-group";
import {
  paymentMethodsState,
  selectedPaymentMethodState,
  selectedMonthYearState,
} from "../../atoms/paymentMethodsAtoms";
import { getPaymentMethods, getReferenceMonthYears } from "../../api/axios";
import PaymentMethodsList from "./PaymentMethodsList";
import MovesTab from "./MovesTab";
import AddPaymentMethod from "../AddPaymentMethod";
import { isAddPaymentMethodVisibleState } from "../../atoms/paymentMethodsAtoms";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAddPaymentMethod = styled.div`
  .add-payment-method-enter {
    opacity: 0;
    transform: translateY(-20px);
  }

  .add-payment-method-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }

  .add-payment-method-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .add-payment-method-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 300ms, transform 300ms;
  }
`;

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useRecoilState(paymentMethodsState);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useRecoilState(selectedPaymentMethodState);
  const selectedMonthYear = useRecoilValue(selectedMonthYearState);
  const isAddPaymentMethodVisible = useRecoilValue(isAddPaymentMethodVisibleState);
  const setIsAddPaymentMethodVisible = useSetRecoilState(isAddPaymentMethodVisibleState);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await getPaymentMethods();
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const handleAddPaymentMethodClick = () => {
    setShowAddPaymentMethod(true);
  };

  const handleAddPaymentMethodClose = () => {
    setShowAddPaymentMethod(false);
  };

  const handlePaymentMethodClick = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  return (
    <Container>
      <div>
        <h1>Payment Methods</h1>
        <button onClick={handleAddPaymentMethodClick}>Add Payment Method</button>
        <CSSTransition
          in={showAddPaymentMethod}
          classNames="add-payment-method"
          timeout={300}
          unmountOnExit
        >
          <StyledAddPaymentMethod>
            <AddPaymentMethod onHide={handleAddPaymentMethodClose} show={showAddPaymentMethod} />
          </StyledAddPaymentMethod>
        </CSSTransition>
      </div>
      <PaymentMethodsList
        paymentMethods={paymentMethods}
        selectedPaymentMethod={selectedPaymentMethod}
        onPaymentMethodClick={handlePaymentMethodClick}
      />
      {selectedPaymentMethod && (
        <MovesTab paymentMethod={selectedPaymentMethod} referenceMonthYear={selectedMonthYear} />
      )}
    </Container>
  );
};

export default PaymentMethodsPage;
