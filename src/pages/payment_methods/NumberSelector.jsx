import React, { useState } from "react";
import styled from "styled-components";

const NumberSelector = ({ onChange }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
    onChange(number);
  };

  return (
    <NumberSelectorContainer>
      {Array.from({ length: 30 }, (_, index) => index + 1).map((number) => (
        <NumberCircle
          key={number}
          selected={selectedNumber === number}
          onClick={() => handleNumberSelect(number)}
        >
          {number}
        </NumberCircle>
      ))}
    </NumberSelectorContainer>
  );
};

const NumberSelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 12px;
`;

const NumberCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ selected }) => (selected ? "#2380f9" : "#b5b2b2")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#000000")};

  font-weight: bold;
  cursor: pointer;
  margin: 5px;
`;

export default NumberSelector;
