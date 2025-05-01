// arquivo: index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/criar-pagamento', async (req, res) => {
  try {
    const random_id = Math.random()

    const response = await axios.post(
      'https://api.mercadopago.com/v1/payments',
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Idempotency-Key': `${random_id}`
        },
      }
    );

    res.json(response.data);
  } catch (erro) {
    res.status(erro.response?.status || 500).json({
      erro: true,
      msg: erro.response?.data || erro.message,
    });
  }
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
