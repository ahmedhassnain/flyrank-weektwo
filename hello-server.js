import express from 'express'
const server = express();

server.get('/', (req, res) => {
    res.json({ 
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    })
})

server.get('/health', (req, res) => {
    res.json({ status: "ok" })
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});