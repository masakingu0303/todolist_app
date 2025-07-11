const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const mysql = require('mysql2');
dotenv.config();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'todo_app'
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Successfully connected to MySQL! ');
});


//let todos = [];
//let idCounter = 1;

// すべてのユーザーのtodosを取得（確認用）
app.get('/todos', (req, res) => {
    const selectQuery = `SELECT * FROM todos`;
    connection.query(selectQuery, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
})
// app.get('/todos', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify(todos, null, 2));
//   });




//ユーザーの一致するタスクのみ表示
app.get('/', (req, res) => {
    const uid = req.query.uid;
    const selectAllQuery = uid ? 'SELECT * FROM todos WHERE uid = ?' : 'SELECT * FROM todos';
    const params = uid ? [uid] : [];

    connection.query(selectAllQuery, params, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});


//タスクを追加
app.post('/', (req, res) => {
    const { text, date, check = false, uid } = req.body;
    if (!text || !date || !uid) {
        return res.status(400).json({ error: 'text, date, and uid are required' });
    }

    const insertQuery = 'INSERT INTO todos (text, date, `check`, uid) VALUES (?, ?, ?, ?)';
    const params = [text, date, check, uid];

    connection.query(insertQuery, params, (error, result) => {
        if (error) throw error;

        const newTodo = { id: result.insertId, text, date, check, uid };
        res.status(201).json(newTodo);
    });
});





//モーダルでタスクを編集
app.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, date } = req.body;

    const updateQuery = `UPDATE todos SET text = ?, date = ? WHERE id = ?`;
    const params = [text, date, id];

    connection.query(updateQuery, params, (error, result) => {
        if (error) throw error;

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todoが見つかりません' });
        }

        res.status(200).json({ id: Number(id), text, date });
    })

})

// checkの状態変更
app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { check } = req.body;

    const checkQuery = 'UPDATE todos SET `check` = ? WHERE id = ?';
    const params = [true, 2];

    connection.query(checkQuery, params, (error, result) => {
        if (error) throw error;
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todoが見つかりません' });
        }
        res.status(200).json({id: Number(id), check});


    })
})


//選択したタスク以外を表示
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM todos WHERE id = ?`;
    const params = [ id ];
    connection.query(deleteQuery, params, (error, result) => {
        if (error) throw error;
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'イベントが見つかりません' });
        }
        res.status(200).json({id: Number(id)});    
    })
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
