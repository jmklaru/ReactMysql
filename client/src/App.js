//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route,  Navigate } from 'react-router-dom';
//import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// App component with routing
const App = () => {
  // State to manage authentication status
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login">
          {!isAuthenticated ? (
            <Login setAuthenticated={setAuthenticated} />
          ) : (
            <Navigate to="/dashboard" />
          )}
        </Route>

        {/* Route for the dashboard */}
        <Route path="/dashboard">
          {isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        </Route>

        {/* Redirect to login page for any other route */}
        <Navigate to="/login" />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
