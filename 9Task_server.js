const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/try')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));
const taskSchema = new mongoose.Schema({
task: String,
description: String,
status: String
}, { collection: 'prac9' }); // Use the collection name `prac12`
const Task = mongoose.model('Task', taskSchema);
// Get all tasks
app.get('/tasks', async (req, res) => {
try {
const tasks = await Task.find();
res.json(tasks);
} catch (error) {
res.status(500).json({ error: 'Failed to fetch tasks' });
}
});
// Add a new task
app.post('/tasks', async (req, res) => {
    try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
    } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
    }
    });
    // Update an existing task
    app.put('/tasks/:id', async (req, res) => {
    try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
    } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
    }
    });
    // Delete a task
    app.delete('/tasks/:id', async (req, res) => {
    try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
    } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
    }
    });
    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });