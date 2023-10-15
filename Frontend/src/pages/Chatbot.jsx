import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';
import image from "../images/Eco-Mascot.gif";
import {collection, addDoc, getFirestore, doc, getDocs, setDoc} from "firebase/firestore";
import { db } from '../config/firebase';

export const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);



  const handleUserMessage = async (e) => {
    e.preventDefault();

    // Add the user's message to the chat history
    // setChatHistory([...chatHistory, { text: userMessage, isUser: true }]);
    setLoading(true);

    setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { text: userMessage, isUser: true },
      ]);


    try {
      // Send the user's message to the backend
      const response = await axios.post('http://127.0.0.1:5000/ask', {
        message: userMessage,
      });

      // Get the chatbot's response from the server
      const botResponse = response.data.answer;

      const messageData = {
        userMessage: userMessage,
        botResponse: botResponse,
      }


      // Add the chatbot's response to the chat history
      setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { text: botResponse, isUser: false },
          ]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
    setLoading(false);

    // Clear the input field
    setUserMessage('');
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

    return (
        <>
            <div>
                <h1 className="mt-10 flex items-center justify-center text-2xl">Chat with EcoGuide!</h1>
                <img className="ecoguide" src={image} width="80" height="80" alt="Logo" />
                <h1 className="mt-10 flex items-center justify-center text-xl">EcoGuide is your go-to companion for sustainable living, offering personalized advice and resources to help you reduce your carbon footprint and embrace an eco-friendly lifestyle.</h1>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={message.isUser ? 'user-text' : 'bot-text'}
                            >
                                <div className="message-content">
                                    <p>{message.text}</p>
                                </div>
                            </div>

                        ))}
                        {loading && (
                          <div className="loading-animation">
                            <div class="ml-2 flex flex-row gap-2">
                              <div class="w-4 h-4 rounded-full bg-house-green animate-bounce"></div>
                              <div class="w-4 h-4 rounded-full bg-house-green animate-bounce [animation-delay:-.3s]"></div>
                              <div class="w-4 h-4 rounded-full bg-house-green animate-bounce [animation-delay:-.5s]"></div>
                            </div>
                          </div>
                        )}
                    </ScrollToBottom>
                </div>
                <div className="mt-10 flex items-center justify-center">
                <form onSubmit={handleUserMessage} className="p-4 px-8">
                    <input
                            type="text"
                            placeholder="Type your message..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            className="border border-deco rounded-sm px-12 py-5"
                    />
                <button type="submit" className="ml-7 cursor-pointer transition-all bg-mountain-meadow text-white px-6 py-2 rounded-lg border-japanese-laurel border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    Send
                </button>
                </form>
             </div>
            </div>
        
        </>
    )

};