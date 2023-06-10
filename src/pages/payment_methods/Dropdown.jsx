import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  justify-content: center;
`;

const DropdownButton = styled.button`
  background-color: #ffffff;
  color: #333333;
  padding: 80px 120px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 8px 0;
  margin: 4px 0;
  list-style-type: none;
  z-index: 1;
`;

const DropdownItem = styled.li`
  padding: 4px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Dropdown = ({ options, onSelect }) => {
  const handleSelect = (option) => {
    onSelect(option);
  };

  return (
    <DropdownContainer>
      <DropdownList>
        {Array.isArray(options) &&
          options.map((option) => (
              <DropdownItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
      </DropdownList>
          <DropdownButton>Select</DropdownButton>
    </DropdownContainer>
  );
};

export default Dropdown;
