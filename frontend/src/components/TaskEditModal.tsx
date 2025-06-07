import { useEffect, useState } from "react";

const API = 'http://localhost:3000';

type Todos = {
    id?: number;
    text: string | null;
    date: string;
    check: boolean;
    uid: string;
}

type TaskEditModalProps = {
    todos: Todos[];
    setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
    isOpen: any;
    setIsOpen: any;
    selectTodo: Todos | null;
}

const TaskEditModal = ({ todos, setTodos, isOpen, setIsOpen, selectTodo }: TaskEditModalProps) => {

    const [text, setText] = useState('');
    const [date, setDate] = useState('');

    //selectTodoが更新されたらアクション == モーダルボタン押したらそのtodoをsetSelectTodoに入れる
    useEffect(() => {
        if (selectTodo) {
            setText(selectTodo.text || "");
            setDate(selectTodo.date?.substring(0, 10) || "");
        }
    }, [selectTodo]);

    //モーダルでタスクを編集
    const handleClick = () => {
        if (selectTodo) {
            //タスクと日付のみ更新した{}を定義
            const updatedTodo = {...selectTodo, text, date};

            //id一致したものを丸ごと更新,updatedTodoを入れる
            fetch(`${API}/${selectTodo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTodo)
           })
           .then(res => res.json())
           .then(data => {
            const updateTodos = todos.map(todo => 
                todo.id === selectTodo.id? data :todo         
            );
            setTodos(updateTodos);
            setIsOpen(false);
            
           })
        }
    }



    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg relative">

                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                            onClick={() => setIsOpen(false)}>
                            ✕
                        </button>


                        <h2 className="text-xl font-bold mb-4 text-center">タスクを編集</h2>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="タスクを入力してください"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <button className="btn  w-full" onClick={() => handleClick()}>保存</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



export default TaskEditModal;




