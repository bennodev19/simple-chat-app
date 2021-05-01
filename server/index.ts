import express from 'express';

const PORT = process.env.PORT || 4000;

const app = express();

app.get('/_ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
