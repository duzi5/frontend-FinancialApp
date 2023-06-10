import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { api } from "../api/axios";
import { useRecoilState } from "recoil";
import { bankInputState } from "../atoms/paymentMethodsAtoms";
import NumberSelector from "./payment_methods/NumberSelector";
import banksList from "./payment_methods/banksList";
import Bandeira from "./payment_methods/Bandeira";
import PaymentTypeInput from "./payment_methods/PaymentTypeInput";
import LastFourDigitsInput from "./payment_methods/LastFourDigitsInput";
import Select from "react-select";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: #f8f9fa;
    opacity: 0;
    animation: ${fadeIn} 0.5s ease-in-out forwards;
  }
`;

const AddPaymentMethod = ({ show, onHide }) => {
  const [paymentMethodData, setPaymentMethodData] = useState({
    type: "",
    brand: "",
    bank: "",
    lastFourDigits: "",
    best_purchase_day: "",
    due_date: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [bankInput, setBankInput] = useRecoilState(bankInputState);
  const [selectedBank, setSelectedBank] = useState(null);

  const handleBankSelect = (bank) => {
    setPaymentMethodData((prevData) => ({
      ...prevData,
      bank: bank.name,
    }));
    setSelectedBank(bank);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentMethodData((prevData) => ({
      ...prevData,
      type: type,
    }));
  };

  const handleDebitCreditSelect = (checked) => {
    if (checked) {
      setPaymentMethodData((prevData) => ({
        ...prevData,
        type: "debit_credit",
      }));
    } else {
      setPaymentMethodData((prevData) => ({
        ...prevData,
        type: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (paymentMethodData.type === "debit_credit") {
        const debitPaymentMethodData = {
          ...paymentMethodData,
          type: "debit",
        };

        const creditPaymentMethodData = {
          ...paymentMethodData,
          type: "credit",
        };

        await Promise.all([
          api.post("/payment_methods/payment_methods", debitPaymentMethodData),
          api.post("/payment_methods/payment_methods", creditPaymentMethodData),
        ]);

        setAlertMessage("Métodos de pagamento adicionados com sucesso!");
      } else {
        await api.post("/payment_methods/payment_methods", paymentMethodData);
        setAlertMessage("Método de pagamento adicionado com sucesso!");
      }

      setAlertVariant("success");
      setPaymentMethodData({
        type: "",
        brand: "",
        bank: "",
        lastFourDigits: "",
        best_purchase_day: "",
        due_date: "",
      });
    } catch (error) {
      setAlertMessage("Erro ao adicionar método(s) de pagamento.");
      setAlertVariant("danger");
      console.error("Error adding payment method:", error);
    }
  };

  const validateForm = () => {
    if (
      paymentMethodData.lastFourDigits.length === 4 &&
      paymentMethodData.type !== "" &&
      paymentMethodData.bank !== "" &&
      ((paymentMethodData.type === "debit" &&
        paymentMethodData.best_purchase_day >= 1 &&
        paymentMethodData.best_purchase_day <= 30 &&
        paymentMethodData.due_date >= 1 &&
        paymentMethodData.due_date <= 30) ||
        paymentMethodData.type === "credit" ||
        paymentMethodData.type === "debit_credit")
    ) {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (bankInput) {
      setPaymentMethodData((prevData) => ({
        ...prevData,
        bank: bankInput.name,
      }));
      setSelectedBank(bankInput);
    }
  }, [bankInput]);

  return (

    <StyledModal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Método de Pagamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant={alertVariant} show={alertMessage !== ""}>
          {alertMessage}
        </Alert>
        <Form onSubmit={validateForm}>
          <LastFourDigitsInput
            value={paymentMethodData.lastFourDigits}
            onChange={(value) =>
              setPaymentMethodData((prevData) => ({
                ...prevData,
                lastFourDigits: value,
              }))
            }
          />

          
            <PaymentTypeInput
              value={paymentMethodData.type}
              onChange={handlePaymentTypeChange}
              onDebitCreditSelect={handleDebitCreditSelect}
            />
       

          {paymentMethodData.type === "debit" && (
            <Form.Group controlId="formBrand">
              <Form.Label>Bandeira</Form.Label>
              <Bandeira
                value={paymentMethodData.brand}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Form.Group controlId="formBank">
            <Form.Label>Banco</Form.Label>
            <Select
              options={banksList}
              value={selectedBank}
              onChange={handleBankSelect}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Selecione um banco"
              isClearable
            />
          </Form.Group>

          {(paymentMethodData.type === "credit" ||
            paymentMethodData.type === "debit_credit") && (
            <>
              <Form.Group className="mt-2" controlId="formBandeira">
                <Form.Label>Bandeira</Form.Label>
                <Bandeira
                  value={paymentMethodData.brand}
                  onChange={(value) =>
                    setPaymentMethodData((prevData) => ({
                      ...prevData,
                      brand: value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group controlId="formBestPurchaseDay">
                <Form.Label>Melhor dia de compra (1-30)</Form.Label>
                <NumberSelector
                  value={paymentMethodData.best_purchase_day}
                  onChange={(value) =>
                    setPaymentMethodData((prevData) => ({
                      ...prevData,
                      best_purchase_day: value,
                    }))
                  }
                  min={1}
                  max={30}
                />
              </Form.Group>

              <Form.Group controlId="formDueDate">
                <Form.Label>Vencimento (1-30)</Form.Label>
                <NumberSelector
                  value={paymentMethodData.due_date}
                  onChange={(value) =>
                    setPaymentMethodData((prevData) => ({
                      ...prevData,
                      due_date: value,
                    }))
                  }
                  min={1}
                  max={30}
                />
              </Form.Group>
            </>
          )}

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </StyledModal>
  );
};

export default AddPaymentMethod;
