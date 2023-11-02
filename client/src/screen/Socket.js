import React, { useState, useEffect } from 'react';
import {  useQuery, useSubscription, gql, useMutation } from '@apollo/client';
 
function generateMessageId() {
  return new Date().getTime().toString();
}
 
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

function ChatApp() {
  const { loading: messagesLoading, error: messagesError, data: messagesData } = useQuery(GET_MESSAGES);
  const { data: messageReceivedData } = useSubscription(MESSAGE_RECEIVED);

  const [content, setContent] = useState('');
  const [sender, setSender] = useState('User');
  const [messages, setMessages] = useState([]);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (!messagesLoading && messagesData) {
      setMessages(messagesData.messages);
    }
  }, [messagesData, messagesLoading]);

 
  useEffect(() => {
    if (messageReceivedData && messageReceivedData.messageReceived) {
      setMessages((prevMessages) => [...prevMessages, messageReceivedData.messageReceived]);

      // Yeni mesaj geldiğinde sayfanın en altına kaydırma
       
    }
  }, [messageReceivedData]);

  const handleSend = () => {
    if (content && sender) {
      const messageId = generateMessageId();
      sendMessage({ variables: { content, sender, messageId } });
      setContent('');
    }
  };

  return (
    <div   style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '80vh', marginBottom: '30px', marginTop: '100px' }}>
      <div   style={{ flex: 1, overflowY: 'auto', marginBottom: '80px' }} >
        {messages.map((message) => (
          <div  key={message.id}>
            <strong >{message.sender}:</strong> {message.content}
          </div>

        ))}
        <div stlye={{marginTop: "30px"}}></div>
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', backgroundColor: '#fff' }}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message"
        />
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Your Name"
        />
        <button style={{ marginBottom: "10px" }} onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

 

export default ChatApp;
