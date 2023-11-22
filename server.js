const express = require('express');
const db = require('./db'); 
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.post('/api/tasks', (req, res) => {
  const { name, status, dueDate } = req.body;
  const enterQry = `INSERT INTO tasks (name, status, dueDate) VALUES (?, ?, ?)`;
  db.query(enterQry, [name, status, dueDate], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Task is not created' });
    } else {
      const enteredTaskId = result.insertId;
      res.status(201).json({ id: enteredTaskId, name, status, dueDate });
    }
  });
});

app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, rows) => {
      if (err) {
        res.status(500).send('Error getting tasks');
      } else {
        res.json(rows);
      }
    });
  });

app.put('/api/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  const updateQuery = `UPDATE tasks SET status = ? WHERE id = ?`;
  db.query(updateQuery, [status, taskId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update task status' });
    } else {
      res.status(200).json({ message: 'Task status updated successfully' });
    }
  });
});
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const removeQuery = 'DELETE FROM tasks WHERE id = ?';
  db.query(removeQuery, [taskId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Task is not deleted' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  });
});


  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
