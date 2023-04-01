import { Route, Navigate } from 'react-router-dom';




const PrivateRoute = (props) => {
  const isLoggedIn = !!localStorage.getItem('access_token');

  return isLoggedIn ? (
    
    props.element
  
    ) : (
    <Navigate to="/login" />
  );
};


export default PrivateRoute