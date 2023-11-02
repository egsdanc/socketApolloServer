import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const root = ReactDOM.createRoot(document.getElementById('root'));


const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true,
  },
});

 




const client = new ApolloClient({
  uri: 'ws://localhost:5000/graphql',
  link: wsLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',  
    },
    query: {
      errorPolicy: 'all',  
    },
  },
});

 

root.render(
  <ApolloProvider client={client}>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,

);

 
reportWebVitals();
