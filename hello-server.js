import express from 'express'
const server = express();

const taskList = [
    {id: 1, title: "Wake up in the morning", done: true},
    {id: 2, title: "Go to university", done: false},
    {id: 3, title: "Program in Node.JS", done: false},
]

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

server.get('/tasks', (req, res) => {
    res.json(taskList)
})

server.get('/tasks/:id', (req, res) => {
    const chosenId = Number(req.params.id);
    console.log(chosenId)
    const selectedItem = taskList.find((eachItem) => eachItem.id === chosenId);

    if (!selectedItem) {
        return res.status(404).json({ error: `Task ${chosenId} not found.`})
    }

    res.json(selectedItem)
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Currently listening on: ${PORT}`);
});