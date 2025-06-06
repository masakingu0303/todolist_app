const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let todos = [];
let idCounter = 1;

app.get('/todos', (req, res) => {
    const uid  = String(req.query.uid);
    //ユーザーのtodos確認ページ
    console.log(`http://localhost:3000/todos?uid=${uid}`);
  if (!uid) {
    return res.status(400).json({ error: 'uid is required' });
  }
  const userTodos = todos.filter(todo => String(todo.uid) === uid);
  res.json(userTodos);
});

//タスクを追加
app.post('/todos', (req, res) => {
  const { text, date, check = false, uid } = req.body;
  if (!text || !date || !uid) {
    return res.status(400).json({ error: 'text, date, and uid are required' });
  }

  const newTodo = {
    id: idCounter++,
    text,
    date,
    check,
    uid,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//モーダルでタスクを編集
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  const index = todos.findIndex(todo => todo.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index] = { ...todos[index], ...updatedTodo };
  res.json(todos[index]);
});

// checkの状態変更
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { check } = req.body;

  const index = todos.findIndex(todo => todo.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index].check = check;
  res.json(todos[index]);
});

//選択したタスク以外を表示
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== Number(id));
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
