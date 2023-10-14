import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';
import image from "../images/Eco-Mascot.gif";

export const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const handleUserMessage = async (e) => {
    e.preventDefault();

    // Add the user's message to the chat history
    // setChatHistory([...chatHistory, { text: userMessage, isUser: true }]);
    setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { text: userMessage, isUser: true },
      ]);


    // You can add a dummy bot response here for testing
    // const dummyBotResponse = "This is a dummy response from the bot.";
    // setChatHistory((prevChatHistory) => [
    //     ...prevChatHistory,
    //     { text: dummyBotResponse, isUser: false },
    //   ]);


    try {
      // Send the user's message to the backend
      const response = await axios.post('your-backend-api-endpoint', {
        message: userMessage,
      });

      // Get the chatbot's response from the server
      const botResponse = response.data.message;

      // Add the chatbot's response to the chat history
      setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { text: botResponse, isUser: false },
          ]);
    } catch (error) {
      console.error('An error occurred:', error);
    }

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
                <h1 className="mt-10 flex items-center justify-center">Chat with EcoGuide!</h1>
                <img className="ecoguide" src={image} width="80" height="80" alt="Logo" />
                <h1 className="mt-10 flex items-center justify-center">EcoGuide is your go-to companion for sustainable living, offering personalized advice and resources to help you reduce your carbon footprint and embrace an eco-friendly lifestyle.</h1>
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
                    </ScrollToBottom>
                </div>
                <div className="mt-10 flex items-center justify-center">
                <form onSubmit={handleUserMessage} className="p-4 px-8">
                    <input
                            type="text"
                            placeholder="Type your message..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            className="border border-deco rounded-sm p-4"
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