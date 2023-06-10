import axios from "axios";

const baseURL = "http://127.0.0.1:5000";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});


export const addPaymentMethod = async (paymentMethodData) => {
  const response = await api.post('/payment_methods/payment_methods', paymentMethodData);
  return response.data;
};

export const getPaymentMethods = async () => { 
  const response = await api.get('/payment_methods/payment_methods')
  return response.data;
}

export const getMovementsByMonth = async (reference_month_year, payment_method_id) => { 
  const response = await api.get(`moves/moves/month/${reference_month_year}/${payment_method_id}`)      
  return response.data
}

export const getFamilyMovements = async () => {
  try {
    // Faça uma chamada à sua API para obter os movimentos da família
    const response = await axios.get("/api/family/movements");
    return response.data; // Retorne os movimentos da família obtidos da API
  } catch (error) {
    console.error("Erro ao obter os movimentos da família:", error);
    throw error;
  }
};