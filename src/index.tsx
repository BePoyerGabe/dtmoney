import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  //bd mirage
  models: {
    transaction: Model,

  },

  seeds(server) {
    server.db.loadData({
      //tabela - nome model no plural
      transactions: [
        {
          id: 1,
          title: 'Freelance website',
          type: 'deposit',
          category: 'Dev',
          amount: 3000,
          createdAt: new Date('2021/03/26 08:30:00')
        },
        {
          id: 2,
          title: 'Monitor 120Hz',
          type: 'withdraw',
          category: 'Setup',
          amount: 1400,
          createdAt: new Date('2021/02/10 15:40:00')
        },
      ]
    })
  },

  routes() {
    //localhost:3000/api/
    this.namespace = 'api'

    this.get('/transaction', () => {
      return this.schema.all('transaction')
    })

    this.post('/transaction', (schema, req) => {
      const data = JSON.parse(req.requestBody)

      //schema bd transaction
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);