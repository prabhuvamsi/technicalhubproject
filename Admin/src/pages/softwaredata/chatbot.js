import React, { useState,useEffect } from "react"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap"

import axios from 'axios';

const AxiosAPI = axios.create();

const Chatbot= () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
  
    const handleMessageSend = async () => {
      if (!inputText.trim()) return;
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText('');
  
      try {
        const response = await AxiosAPI.post('/api/chatbot', { message: inputText });
        setMessages([...messages, { text: response.data, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  

  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />

          <Row>

          <div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
 
            </Row>
      </div>
    </>
  )
}

export default Chatbot
