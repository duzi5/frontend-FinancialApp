
import { atom, useRecoilState } from "recoil";


// Átomo para armazenar a lista de métodos de pagamento
export const paymentMethodsState = atom({
  key: "paymentMethodsState",
  default: [], // Valor inicial vazio
});

// Átomo para armazenar o método de pagamento selecionado
export const selectedPaymentMethodState = atom({
  key: "selectedPaymentMethodState",
  default: null, // Valor inicial nulo, indicando que nenhum método de pagamento está selecionado
});

// Átomo para armazenar o mês/ano de referência selecionado
export const selectedMonthYearState = atom({
  key: "selectedMonthYearState",
  default: "", // Valor inicial vazio
});

export const isAddPaymentMethodVisibleState = atom({
    key: "isAddPaymentMethodVisibleState",
    default: false,
  });


  export const bankInputState = atom({
    key: "bankInputState",
    default: null,
  });



export const selectedBankState = atom({
  key: "selectedBankState",
  default: null,
});
