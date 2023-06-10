import React, { useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import banksList from "./banksList";

const BankInput = ({ value, onChange, onSelect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    setShowSuggestions(inputValue.length > 0);
  
    const filteredOptions = banksList.filter((bank) =>
      bank.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };
  

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion);
    setShowSuggestions(false);
  };

  const renderSuggestions = () => {
    if (showSuggestions) {
      return (
        <ListGroup className="suggestions-list">
          {filteredOptions.map((bank) => (
            <ListGroup.Item
              key={bank.name}
              action
              onClick={() => handleSuggestionClick(bank)}
            >
              {bank.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
    return null;
  };

  return (
    <div className="bank-input">
      <Form.Group controlId="bankInput">
        <Form.Label>Banco</Form.Label>
        <FormControl
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Digite o nome do banco"
        />
      </Form.Group>
      {renderSuggestions()}
    </div>
  );
};

export default BankInput;
