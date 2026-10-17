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

    if (!req.body.title) {
        return res.status(400).json({ error: "The title is missing."})
    }

    const newTodoItem = {
        id: Math.max(...taskList.map((eachItem) => eachItem.id)) + 1,
        title: req.body.title,
        done: false
    }
    taskList.push(newTodoItem);
    res.status(201).json({ message: "New Item Added" })
})

server.put('/tasks/:id', (req, res) => {
    const chosenId = Number(req.params.id);
    const selectedItem = taskList.find((eachItem) => eachItem.id === chosenId);
    if (!selectedItem) {
        return res.status(404).json({ error: "The item does not exist."})
    }
    taskList = taskList.map((eachItem) => {
       return eachItem.id === chosenId ? {...eachItem, title: req.body.title, done: req.body.done} : eachItem;
    })
    res.status(200).json({ message: "Item updated. "})
})

server.delete('/tasks/:id', (req, res) => {
    const chosenId = Number(req.params.id);
    const selectedItem = taskList.find((eachItem) => eachItem.id === chosenId);
    if (!selectedItem) {
        return res.status(404).json({ error: "The item does not exist."})
    }
    taskList = taskList.filter((eachItem) => eachItem.id !== chosenId);
    res.status(200).json({ message: "Item removed. "})
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Currently listening on: ${PORT}`);
});