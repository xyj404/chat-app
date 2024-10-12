import React, { useState, useEffect } from 'react';
import './ChatContent.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const simulateStreamMessage = () => {
    setIsStreaming(true);
    let message = '';
    const interval = setInterval(() => {
      message += '新消息片段 ';
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && !lastMessage.isUser) {
          return [
            ...prevMessages.slice(0, -1),
            { id: Date.now(), text: message, isUser: false }
          ];
        } else {
          return [
            ...prevMessages,
            { id: Date.now(), text: message, isUser: false }
          ];
        }
      });
      if (message.length > 50) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: input, isUser: true }
      ]);
      setInput('');
      // 这里可以添加发送消息到服务器的逻辑
      simulateStreamMessage();
    }
  };

  return (
    <div className='chat-window'>
      <div className='chat-messages'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.isUser ? 'user-message' : 'server-message'
            }`}
          >
            {message.isUser ? (
              <>
                <div className='message-content'>{message.text}</div>
                <div className='avatar user-avatar'>👤</div>
              </>
            ) : (
              <>
                <div className='avatar'>🤖</div>
                <div className='message-content'>
                  {message.text}
                  {isStreaming &&
                    message.id === messages[messages.length - 1].id && (
                      <span className='streaming-dot'>•</span>
                    )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className='chat-input'>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          placeholder='输入消息...'
        />
        <button onClick={handleSendMessage}>发送</button>
      </div>
    </div>
  );
};

export default ChatContent;
