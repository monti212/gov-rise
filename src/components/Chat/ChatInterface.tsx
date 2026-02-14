import React, { useState } from 'react';
import { Send, PaperclipIcon, Bot } from 'lucide-react';

export const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m the GovRise Australian Visa Assistant. How can I help you with Australian family visas today?',
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: message }]);

    // Mock AI response for Australian visa queries
    setTimeout(() => {
      const responses = [
        "For Australian partner visas, you'll need to prepare several documents including identity proof (passport, birth certificate), relationship evidence (joint accounts, photos, lease agreements), character documents (police clearances), and health examinations. Would you like me to explain each requirement in detail?",
        
        "The average processing time for Australian partner visas is currently 12-24 months for offshore applications (309/100) and 18-30 months for onshore applications (820/801), though this can vary based on your specific circumstances.",
        
        "For legal assistance with Australian immigration, you can connect with legal aid organizations or migration agents registered with MARA (Migration Agents Registration Authority). Would you like me to show you how to find a registered migration agent?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { role: 'assistant', content: randomResponse }]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="h-[500px] flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                chat.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {chat.role === 'assistant' && (
                <div className="flex items-center mb-1">
                  <Bot size={16} className="text-blue-600 mr-1" />
                  <span className="text-xs font-medium text-blue-600">Australian Visa Assistant</span>
                </div>
              )}
              <p className="text-sm">{chat.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <button className="text-gray-500 hover:text-gray-700 mr-2">
            <PaperclipIcon size={18} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about Australian family visas..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`ml-2 p-1.5 rounded-full ${
              message.trim() ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            The AI assistant provides general guidance on Australian visas. For specific legal advice, please consult a migration agent.
          </p>
          <span className="text-xs text-gray-500 italic">Powered by GovRise</span>
        </div>
      </div>
    </div>
  );
};