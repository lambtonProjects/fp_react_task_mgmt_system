import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  // React States
  let navigate = useNavigate(); 
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info


  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);
    
    axios.get('http://localhost:4000/users/?username='+uname.value)
            .then(res =>{
            const userData=res.data
            console.log(userData)
              if (userData) {
                if (userData.password !== pass.value) {
                  // Invalid password
                  setErrorMessages({ name: "pass", message: errors.pass });
                } else {
                  setIsSubmitted(true);
                  localStorage.setItem("isAdmin", userData.isAdmin);
                  localStorage.setItem("name", userData.username);
                  localStorage.setItem("id", userData._id);
                }
              } else {
                // Username not found
                setErrorMessages({ name: "uname", message: errors.uname });
              }
            } )
            .catch(err => console.log(err))
    // Compare user info
    
  };

  useEffect(() => {
    console.log('isSubmitted', isSubmitted);
    if(isSubmitted){
      localStorage.setItem("isAuthenticated", isSubmitted);
      navigate('/', { replace: true });
    }
  }, [isSubmitted, navigate])

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;



