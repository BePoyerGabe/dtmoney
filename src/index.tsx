import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer } from 'miragejs';

createServer({
  routes() {
    this.namespace = 'api'

    this.get('/transaction', () => {
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 420,
          type: 'deposit',
          category: 'food',
          createdAt: '12/10/2019'
        }
      ]
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);