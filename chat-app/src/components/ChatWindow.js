import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatWindow = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      content: 'I am a powerful chatbot, nice to chat with you!',
      role: 'assistant'
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      const username = localStorage.getItem('username');
      if (!token || !username) {
        navigate('/login');
        return;
      }
      try {
        await axios.get('http://localhost:5000/api/auth/validate', {
          headers: {
            'x-auth-token': token,
          },
        });
      } catch (error) {
        handleLogout();
      }
      setUsername(username);
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMsg = {
      content: e.target[0].value,
      role: 'user'
    };
    const newMsgs = [...messages, newMsg];
    setMessages(newMsgs);
    setIsTyping(true);
    e.target.reset();
    // call server to chat
    try {
      const response = await axios.post('http://localhost:5000/api/chat/getChatFromOpenAI', { messages: [...newMsgs] });
      setMessages([...newMsgs, response.data.completion.choices[0].message]);
      setIsTyping(false);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center pt-5">
  <div className="text-lg font-bold mr-4">
    Welcome, {username}!
  </div>
  <button
    onClick={handleLogout}
    className="text-sm font-bold bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow"
  >
    Sign off
  </button>
</div>


      <div className="flex-grow overflow-auto p-10 pb-20">
        {messages.length && messages.map((msg, idx) => (
          <div className={`chat ${msg.role === 'assistant' ? 'chat-start' : 'chat-end'}`} key={idx}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="chat bubble component" src="chatbot.svg" />
              </div>
            </div>
            <div className="chat-header">
              {msg.role === 'assistant' ? 'Chatbot' : username}
            </div>
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
        {/* Ref element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      <br></br>
      <form className="form-control fixed bottom-0 left-0 w-full pb-5 bg-white" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group w-3/5 mx-auto relative flex items-center">
          {isTyping && <small className="absolute -top-5 left-1 animate-pulse">Chatbot is typing...</small>}
          <input type="text" placeholder="Message Chatbot" className="input input-bordered flex-grow" required />
          <button className="btn btn-square">
            <img className="w-8 h-8" src="/arrow.svg" alt="logo" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
