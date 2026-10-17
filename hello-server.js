import express from 'express'
const server = express();

server.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});