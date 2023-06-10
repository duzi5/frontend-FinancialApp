import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import CreditCard from "./CreditCard";
import PaymentMethodCard from "./PaymentMethodCard";

const PaymentMethodsSlider = ({ paymentMethods }) => {
  return (
        <>
      {paymentMethods.map((method) => (
        <CreditCard />    
            
      ))}
    </>
  );
};

export default PaymentMethodsSlider;
