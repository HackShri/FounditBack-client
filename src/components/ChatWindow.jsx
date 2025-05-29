import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ChatWindow = ({ isOpen, onClose, item, type }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && item?._id) {
      const initializeChat = async () => {
        try {
          const response = await axios.post('/api/chat/create', { itemId: item._id });
          setChatId(response.data.data._id);
          setMessages(response.data.data.messages || []);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to initialize chat');
        }
      };
      initializeChat();
    }
  }, [isOpen, item]);

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/api/chat/${chatId}`);
          setMessages(response.data.data.messages || []);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch messages');
        }
      };
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Poll every 5s
      return () => clearInterval(interval);
    }
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;

    try {
      const response = await axios.post(`/api/chat/${chatId}/message`, { text: newMessage });
      setMessages(response.data.data.messages);
      setNewMessage('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat about {item.title}</DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex-1 p-4 overflow-y-auto border rounded">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id} className={`flex ${message.sender._id === item.postedBy._id ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender._id === item.postedBy._id ? 'bg-gray-100 text-gray-900' : 'bg-blue-500 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 p-4 border-t">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatWindow;