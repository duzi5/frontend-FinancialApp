import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import CreditCard from "./CreditCard";
import DebitCard from "./DebitCard";
import { api } from "../../api/axios";
import MovesTab from "./MovesTab";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const SubContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: auto;
  position: relative;
`;

const NavigationButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #ccc;
  border: black;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 8px;
`;

const NavigationButtonsGroup = styled.div`
  display: flex;
  width: 120px;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: auto;
  border: black 4px solid;
`;

const PaymentMethodsList = ({ selectedMonthYear }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const subContainerRef = useRef(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get("/payment_methods/payment_methods");
      setPaymentMethods(response.data);
    } catch (error) {
      console.log("Error fetching payment methods:", error);
    }
  };

  const handleScroll = (scrollOffset) => {
    if (subContainerRef.current) {
      subContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  const handleCardClick = (paymentMethodId) => {
    setSelectedPaymentMethodId(paymentMethodId);
    fetchMoves(paymentMethodId, selectedMonthYear);
  };

  const fetchMoves = async (paymentMethodId, referenceMonthYear) => {
    try {
      const response = await api.get(
        `/moves/month/${referenceMonthYear}/payment_method?payment_method=${paymentMethodId}`
      );
      setMoves(response.data);
    } catch (error) {
      console.log("Error fetching moves:", error);
    }
  };

  return (
    <>
      <Container>
        <SubContainer ref={subContainerRef}>
          {paymentMethods.map((method) => {
            if (method.type === "credit") {
              return (
                <CreditCard
                  key={method.id}
                  type={method.type}
                  brand={method.brand}
                  name={method.name}
                  bank={method.bank}
                  bestPurchaseDay={method.bestPurchaseDay}
                  dueDate={method.dueDate}
                  saldo={method.saldo}
                  paymentMethodId={method.id}
                  referenceMonthYear={selectedMonthYear}
                  onClick={() => handleCardClick(method.id)}
                />
              );
            } else if (method.type === "debit") {
              return (
                <DebitCard
                  key={method.id}
                  brand={method.brand}
                  name={method.name}
                  bank={method.bank}
                  saldo={method.saldo}
                  paymentMethodId={method.id}
                  referenceMonthYear={selectedMonthYear}
                  onClick={() => handleCardClick(method.id)}
                />
              );
            } else {
              return null;
            }
          })}
        </SubContainer>
      </Container>
      <NavigationButtonsGroup>
        <NavigationButton onClick={() => handleScroll(-100)}>
          {"<"}
        </NavigationButton>
        <NavigationButton onClick={() => handleScroll(100)}>
          {">"}
        </NavigationButton>
      </NavigationButtonsGroup>
      {selectedPaymentMethodId && (
        <MovesTab
          paymentMethodId={selectedPaymentMethodId}
          referenceMonthYear={selectedMonthYear}
          moves={moves}
        />
      )}
    </>
  )}
export default PaymentMethodsList  