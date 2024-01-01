// Login.js
import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import axios from 'axios';

const baseUrl = 'http://localhost:3000';
// Login component
const Login = ({ setAuthenticated }) => {
    // State to manage user credentials
    const [credentials, setCredentials] = useState({ username: '', password: '' });
  
    // State to manage error messages
    const [error, setError] = useState('');
  
    // Function to handle input changes
    const handleInputChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      });
    };
  
    // Function to handle form submission
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        // Make API call to authenticate user  http://localhost:3000/login
        const response = await axios.post(baseUrl+'/login', credentials);
  
        // Check if authentication is successful
        if (response.data.success) {
          // Update authentication status and clear any errors
          setAuthenticated(true);
          setError('');
        } else {
          // Update error message if authentication fails
          setError(response.data.message);
        }
      } catch (error) {
        // Handle API call error
        setError('An error occurred during login.');
      }
    };
  
    // JSX for the login form
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  };


export default Login;
