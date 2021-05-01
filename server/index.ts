import cors from 'cors';
import express from 'express';
import { chats } from './db';

const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(cors());

app.get('/_ping', (req, res) => {
  res.send('pong');
});

app.get('/chats', (req, res) => {
  res.json(chats);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
