import { useState } from "react";
type TaskFormProps = {
    user: any;
    setTodos: any;
    todos: any;
}

const API = 'http://localhost:3000';



const TaskForm = ({ user, setTodos, todos }: TaskFormProps) => {

    const [text, setText] = useState('');
    const [date, setDate] = useState('');


    //タスクを追加
    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
         //未ログインの場合、アラート表示して処理中断。
        if (!user) {
            console.error("ログインユーザー情報がありません");
            return;
        }
        if (text && date) {
            const newTodo = { text, date, check: false, uid: user.uid }
             //入力欄の内容をサーバー（API/JSON Server）に送信
            fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            })
            //新タスクを、画面のリスト（todos）に即追加
                .then(res => res.json())
                .then(data => setTodos([...todos, data]));
            setText('');
            setDate('');        
        } else {
            alert('テキストと日付を入力してください');
        } 
    }


    return (
        <div className="text-center mt-4">
            <div className="join">
                <div>
                    <input type="text" className="input join-item w-50" placeholder="タスクを入力" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div>
                    <input type="date" className="input join-item w-30" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="indicator">
                    <button className="btn join-item" onClick={handleClick}>追加</button>
                </div>
            </div>
        </div>
    )
}

export default TaskForm;