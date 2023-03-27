import axios from 'axios';

const API_URL = "http://localhost:5000"; // altere para o endereço correto da sua API
;

const authenticateWithEmail = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: "92.netto@gmail.com",
      password: "123"
    }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error during authentication: " + error.message);
  }
};

export default authenticateWithEmail;