import React, { useState } from 'react';
import axios from 'axios'

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    // Send loginData to backend for authentication
    
    // for both organizer and participant you need to do
    const response = await axios.post('/login/participant', loginData)

    if(!response.data.response.isValid){
      setError(true);
    }else{
      console.log("logged in successfully")      
    }

  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email or Username"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button onClick={handleLogin}>Login</button>
        {error ? <div>Enter valid Email or Password</div> : null}
      </div>
    </div>
  );
};

export default Login;
