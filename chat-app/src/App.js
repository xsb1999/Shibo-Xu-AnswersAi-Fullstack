import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={
            <>
              <ChatWindow />
            </>
          } />
          <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
