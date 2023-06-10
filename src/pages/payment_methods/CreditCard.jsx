import React, { useState } from "react";
import styled, {GlobalStyleComponent} from "styled-components";

 



const CreditCardContainer = styled.div`
  min-width: 300px;
  min-height: 180px;
  line-height: 13px;
  border-radius: 8px;
  padding: 16px;
  color: #f8dcdc;
  background-color: #6909a0;
  background-size: cover;
  margin: 20px;
  box-shadow: 3px 5px 15px 0px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  font-family: "Changa", monospace;
`;


const CardInfo = styled.div`
  margin-bottom: 8px;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #f1f1f1;
  margin-top: 20px;
`;

const CreditCard = ({
  type,
  brand,
  name,
  bank,
  bestPurchaseDay,
  dueDate,
  saldo,
  paymentMethodId,
  referenceMonthYear,
  movements,
}) => {
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
  };

  const renderCardDetails = () => {
    if (selectedCardId === paymentMethodId) {
      const filteredMovements = movements.filter(
        (movement) =>
          movement.paymentMethodId === paymentMethodId &&
          movement.referenceMonthYear === referenceMonthYear
      );

      return (
        <ContentContainer>
          {filteredMovements.map((movement) => (
            <div key={movement.id}>
              <p>Transaction: {movement.transaction}</p>
              <p>Amount: {movement.amount}</p>
              {/* Add more details here */}
            </div>
          ))}
        </ContentContainer>
      );
    }

    return null;
  };

  return (
    <>

      <CreditCardContainer
        isSelected={selectedCardId === paymentMethodId}
        onClick={() => handleCardClick(paymentMethodId)}
      >
        <CardInfo>Bandeira: {brand}</CardInfo>
        <CardInfo>Name: {name}</CardInfo>
        <CardInfo>Banco: {bank}</CardInfo>
        <CardInfo>MDC: {bestPurchaseDay}</CardInfo>
        <CardInfo>Vencimento: {dueDate}</CardInfo>
        <CardInfo>Saldo: {saldo}</CardInfo>
      </CreditCardContainer>
      {renderCardDetails()}
    </>
  );
};

export default CreditCard;

;
