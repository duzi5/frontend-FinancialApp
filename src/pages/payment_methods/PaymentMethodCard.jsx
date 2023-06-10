import React, { useState } from "react";
import styled from "styled-components";

const PaymentMethodCardContainer = styled.div`
  display: block;
  width: 80vw;
  height: 40vh;
  background-color: black;
  color: white;
`;

const PaymentMethodCard = ({ method, onFetchMovements }) => {
  const [selected, setSelected] = useState(false);
  const [movements, setMovements] = useState([]);

  const handleCardClick = () => {
    setSelected(!selected);

    if (!selected) {
      onFetchMovements(method.referenceMonthYear);
    } else {
      setMovements([]);
    }
  };

  return (
    <PaymentMethodCardContainer onClick={handleCardClick}>

      <p>{method.name}</p>


      {selected && (
        <ul>
          {movements.map((movement) => (
            <li key={movement.id}>
              <p>{movement.transaction}</p>
              <p>{movement.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </PaymentMethodCardContainer>
  );
};

export default PaymentMethodCard;
