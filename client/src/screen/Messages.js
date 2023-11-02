import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useSubscription, useMutation } from '@apollo/client';
import gql from 'graphql-tag';


function generateMessageId() {
    return new Date().getTime().toString();
  }


function Messages() {
  const GET_MESSAGES = gql`
    query GetMessages {
      messages {
        id
        sender
        content
      }
    }
  `;
  const MESSAGE_RECEIVED = gql`
    subscription MessageReceived {
      messageReceived {
        id
        content
        sender
      }
    }
  `;
  const SEND_MESSAGE = gql`
    mutation SendMessage($content: String!, $sender: String!, $messageId: String!) {
      sendMessage(content: $content, sender: $sender, messageId: $messageId) {
        id
        content
        sender
      }
    }
  `;

  const { loading: messagesLoading, error: messagesError, data: messagesData } = useQuery(GET_MESSAGES);
  const { data: messageReceivedData } = useSubscription(MESSAGE_RECEIVED);

  const [content, setContent] = useState('');
  const [sender, setSender] = useState('User');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (!messagesLoading && messagesData) {
      setMessages(messagesData.messages);
    }
  }, [messagesData, messagesLoading]);

  useEffect(() => {
    if (messageReceivedData && messageReceivedData.messageReceived) {
      setMessages((prevMessages) => [...prevMessages, messageReceivedData.messageReceived]);
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [messageReceivedData]);

  const handleSend = () => {
    if (content && sender) {
      const messageId = generateMessageId();
      sendMessage({ variables: { content, sender, messageId } });
      setContent('');
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh'  ,marginTop: '100px' }}>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '40px' }}>
        {messages.map((message) => (
          <div key={message.id}>{`${message.sender}: ${message.content}`}</div>
        ))}
        <div ref={messagesEndRef} style={{marginBottom: 40,}} />
      </div>
      <div style={{  position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', padding: '10px' }}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Mesajınızı girin"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <button style={{marginBottom: 10}} onClick={handleSend}>Gönder</button>
      </div>
    </div>
  );
}

export default Messages;
