import express from 'express'
import swaggerUi from 'swagger-ui-express';

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

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Task API",
        version: "1.0.0",
        description: "A simple To-Do List API built with Express"
    },
    paths: {
        "/": {
            "get": {
                "summary": "Get API Info",
                "responses": {
                    "200": { "description": "Success" }
                }
            }
        },
        "/health": {
            "get": {
                "summary": "Check API Health Status",
                "responses": {
                    "200": { "description": "Success" }
                }
            }
        },
        "/tasks": {
            "get": {
                "summary": "Get all tasks",
                "responses": {
                    "200": { "description": "Success" }
                }
            },
            "post": {
                "summary": "Create a new task",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["title"],
                                "properties": {
                                    "title": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": { "description": "Created" },
                    "400": { "description": "Missing title" }
                }
            }
        },
        "/tasks/{id}": {
            "get": {
                "summary": "Get a specific task by ID",
                "parameters": [
                    { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
                ],
                "responses": {
                    "200": { "description": "Success" },
                    "404": { "description": "Task not found" }
                }
            },
            "put": {
                "summary": "Update an existing task",
                "parameters": [
                    { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": { "type": "string" },
                                    "done": { "type": "boolean" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "Updated" },
                    "404": { "description": "Task not found" }
                }
            },
            "delete": {
                "summary": "Delete a task by ID",
                "parameters": [
                    { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
                ],
                "responses": {
                    "200": { "description": "Deleted" },
                    "404": { "description": "Task not found" }
                }
            }
        }
    }
};

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    res.status(200).json({ message: "Item updated."})
})

server.delete('/tasks/:id', (req, res) => {
    const chosenId = Number(req.params.id);
    const selectedItem = taskList.find((eachItem) => eachItem.id === chosenId);
    if (!selectedItem) {
        return res.status(404).json({ error: "The item does not exist."})
    }
    taskList = taskList.filter((eachItem) => eachItem.id !== chosenId);
    res.status(200).json({ message: "Item removed."})
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Currently listening on: ${PORT}`);
});