import { Route, Navigate } from 'react-router-dom';



export const ManagerRoute = (props) => { 
  const isLoggedIn = !!localStorage.getItem('access_token');
  const isManager = localStorage.user['is_manager'] === true?  true:false

  return isLoggedIn && isManager ? (props.element) : (<Navigate to="/families-control" />)

}







export const PrivateRoute = (props) => {
  const isLoggedIn = !!localStorage.getItem('access_token');

  return isLoggedIn ? (
    
    props.element
  
    ) : (
    <Navigate to="/login" />
  );
};




