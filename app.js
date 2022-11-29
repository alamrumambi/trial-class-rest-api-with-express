const express = require('express')
const app = express()
const port = 3000

const Task = require('./models/index.js').Task;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// http request
app.get('/tasks', (req, res) => {
    Task.findAll()
    .then((data) => {
        res.status(200).json({ data })
    })
    .catch((err) => {
        res.status(500).json({ message: 'Internal Server Error' });
    })
})

app.post('/tasks', (req, res) => {
    Task.create( req.body )
    .then((data) => {
        res.status(201).json({ message: 'Task created' })
    })
    .catch((err) => {
        res.status(500).json({ message: 'Internal Server Error' });
    })
})

app.delete('/tasks/:id', (req, res) => {
    Task.destroy( { where: { id: req.params.id } } )
    .then((data) => {
        res.status(200).json({ message: 'Task deleted' })
    })
    .catch((err) => {
        res.status(500).json({ message: 'Internal Server Error' });
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})