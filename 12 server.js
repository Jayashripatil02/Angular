const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
 
const app = express();
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/try', {
  // Remove deprecated options
});
 
// Task Schema
const taskSchema = new mongoose.Schema({
  task: String,
  description: String,
  status: String,
});
 
const Task = mongoose.model('prac12', taskSchema); // Collection name is prac12
 
// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
 
app.post('/tasks', async (req, res) => {
  const newTask = new Task({
    task: req.body.task,
    description: req.body.description,
    status: req.body.status,
  });
  await newTask.save();
  res.json({ message: 'Task added!' });
});
 
app.put('/tasks/:id', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    task: req.body.task,
    description: req.body.description,
    status: req.body.status,
  });
  res.json({ message: 'Task updated!' });
});
 
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted!' });
});
 
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
 
 
 