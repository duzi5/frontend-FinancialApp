import { useState } from "react";

import { Button } from "react-bootstrap";
import { authenticateWithGoogle } from '../api/authenticateWithGoogle';

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Use a função `authenticateWithGoogle` para autenticar o usuário com o Google
      const user = await authenticateWithGoogle(user => user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      onClick={handleGoogleLogin}
      backgroundColor="#3f51b5"
      color="#fff"
    >
      {loading ? "Carregando..." : "Login com Google"}
    </Button>
  );
};
export default GoogleLoginButton
