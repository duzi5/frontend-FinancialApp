import React, { useState } from "react";
import styled from "styled-components";


const DebitCardContainer = styled.div`
  min-width: 300px;
  min-height: 180px;
  border-radius: 8px;
  padding: 16px;
  margin: 20px;
  color: white;
  background-color: #3a2559;
  box-shadow: 3px 5px 15px 0px rgba(0, 0, 0, 0.28);

;
  background-size: cover;
  cursor: pointer;
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

const DebitCard = ({
  brand,
  name,
  bank,
  saldo,
  paymentMethodId,
  referenceMonthYear,
  movements
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
      <DebitCardContainer
        isSelected={selectedCardId === paymentMethodId}
        onClick={() => handleCardClick(paymentMethodId)}
      >
        <CardInfo>Bandeira: {brand}</CardInfo>
        <CardInfo>***{name}</CardInfo>
        <CardInfo>Banco: {bank}</CardInfo>
        <CardInfo>Saldo: {saldo}</CardInfo>
      </DebitCardContainer>
      {renderCardDetails()}
    </>
  );
};

export default DebitCard;
