import axios from 'axios';

const API_URL = "http://127.0.0.1:5000/api/"; /// altere para o endereço correto da sua API
;

const authenticateWithEmail = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: email
    }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error during authentication: " + error.message);
  }
};

export default authenticateWithEmail;