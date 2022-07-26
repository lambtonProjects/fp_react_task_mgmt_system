import React from 'react';
import Login from './Login';

/** Private Route does have target component as child and
 * checks if user is in local storage */
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("PrivateRoute isAuthenticated?", isAuthenticated);
  console.log(children);
  //const user = localStorage.getItem('user');

  return isAuthenticated ? children : <Login />;
}

export default PrivateRoute;