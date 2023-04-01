import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Logout() {
    const navigate = useNavigate();
  
    useEffect(() => {
      // Remove o token do usuário do localStorage
      localStorage.removeItem('access_token');
      
      // Redireciona o usuário para a página de login
      navigate('/login');
    }, [navigate]);
  
    return null;
  }
  export default Logout;
  