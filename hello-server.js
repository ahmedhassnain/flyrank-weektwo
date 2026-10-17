import express from 'express'
const server = express();
server.use(express.json())

let taskList = [
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

server.post('/tasks', (req, res) => {
    const newTodoItem = {
        id: Math.max(...taskList.map((eachItem) => eachItem.id)) + 1,
        title: req.body.title,
        done: false
    }
    taskList.push(newTodoItem);
    res.status(200).json({ message: "New Item Added" })
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Currently listening on: ${PORT}`);
});