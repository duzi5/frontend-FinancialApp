import React from "react";
import { Card, ListGroup, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  width: 400px;
  height: 250px;
  display: inline-flexbox;
`;

const StyledCardBody = styled(Card.Body)`
  padding: 1.5rem;
`;

const StyledTitle = styled(Card.Title)`
  margin-bottom: 0.5rem;
`;

const StyledSubtitle = styled(Card.Subtitle)`
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const StyledImage = styled.img`
  width: 60px;
  margin-right: 1rem;
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
`;

const StyledDebitCard = styled(StyledCard)`
  background-color: #b8e6b8;
`;

const StyledCreditCard = styled(StyledCard)`
  background-color: #b4aee8;
`;

const PaymentMethodCard = ({ paymentMethod }) => {
  const { type, name, brand, bank, isDebit, best_purchase_day, due_date } =
    paymentMethod;

  const cardImageSrc = "https://scontent.fssa15-1.fna.fbcdn.net/v/t39.30808-6/344810535_198899399654430_1100787038313677610_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEJN4Ke9nhpwXcnXDOUtCvIyEpgyYpfNnLISmDJil82cscN6jzdWHD-vPernYreCuQ7UqChfvFXBysUp_ZeynW2&_nc_ohc=dgA1Cj7oU_gAX_2onz6&_nc_ht=scontent.fssa15-1.fna&oh=00_AfDR9CuIZAsMI0Uh-8kwof0AOpo6FSPScnMOkGb5A1r2Kg&oe=645E8626";

  return (
    <>
      {type == "debit" ? (
        <StyledDebitCard>
          <StyledCardBody>
            <div className="d-flex align-items-center mb-3">
              <StyledImage src={cardImageSrc} alt="Credit card" />
              <div>
                <StyledTitle>{name}</StyledTitle>
                <StyledSubtitle>{brand}</StyledSubtitle>
              </div>
            </div>
            <ListGroup>
              {bank && <StyledListGroupItem>Banco: {bank}</StyledListGroupItem>}
            </ListGroup>
          </StyledCardBody>
        </StyledDebitCard>
      ) : (
        <StyledCreditCard>
          <StyledCardBody>
            <div className="d-flex align-items-center mb-3">
              <StyledImage src={cardImageSrc} alt="Credit card" />
              <div>
                <StyledTitle>{name}</StyledTitle>
                <StyledSubtitle>{brand}</StyledSubtitle>
              </div>
            </div>
            <ListGroup>
              {bank && <StyledListGroupItem>Banco: {bank}</StyledListGroupItem>}
              {best_purchase_day && (
                <StyledListGroupItem>
                  Melhor dia de compra: {best_purchase_day}
                </StyledListGroupItem>
              )}
              {due_date && (
                <StyledListGroupItem>
                  Dia de vencimento: {due_date}
                </StyledListGroupItem>
              )}
            </ListGroup>
          </StyledCardBody>
        </StyledCreditCard>
      )}
    </>
  );
};

export default PaymentMethodCard;
