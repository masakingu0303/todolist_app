import { useEffect } from "react";

const API = 'http://localhost:3000/todos';

type TaskListProps = {
    setTodos: any;
    todos: any;
    user: any;
    setIsOpen: any;
    setSelectTodo: any;
};

type Todos = {
    id?: number;
    text: string | null;
    date: string;
    check: boolean;
    uid: string;  // ユーザーIDを追加
}


const TaskList = ({ setTodos, todos, user, setIsOpen, setSelectTodo }: TaskListProps) => {
    //const today = new Date();

    //ログインしたら(userの値が変化したら)todosを表示
    useEffect(() => {
        if (user) {
            fetch(`${API}?uid=${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    const updatedDate = data.map((todo: Todos) => ({
                        ...todo, check: todo.check ?? false
                    }));
                    setTodos(updatedDate)
                });
        }
    }, [user]);

    //削除イベント
    const handleDelete = (id?: number) => {
        fetch(`${API}/${id}`, { method: 'DELETE' })
            .then(() => setTodos(todos.filter((todo: Todos) => todo.id !== id)));
    };

    //checkで状態を更新
    const handleCheck = (id: number, checked: boolean) => {
        const updateTodos = todos.map((todo: Todos) => {
            if (todo.id === id) {
                return { ...todo, check: checked };
            } else {
                return todo;
            }
        });
        setTodos(updateTodos);

        fetch(`${API}/${id}`, {
            method: 'PATCH',
            // 更新するプロパティだけ送信
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ check: checked })
        });
    };

    return (
        <div className="mt-4">
            {!todos || todos.length === 0 ? (
                //todosがないときの表示
                <div>
                    <div className="text-center text-gray-500">タスクがありません。</div>
                    <div className="card shadow mt-4">
                        <div className="card-body">
                            <div className="card-actions justify-between">
                                <input type="checkbox" />
                                <h2 className="text-gray-500">ここにタスクが表示されます</h2>
                                <div>
                                    <button className="btn btn-square btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    <button className="btn btn-square btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>

                                </div>
                            </div>
                            <p>残り◯日</p>
                        </div>
                    </div>
                </div>) : (
                //todosがあるのきの表示
                <div>
                    <div className="bg-white p-6 text-center">
                        <button className="btn btn-soft">追加順</button>
                        <button className="btn btn-soft">日付順</button>
                    </div>
                    <ul className="mt-4 space-y-4">
                        {todos.map((todo: Todos) => {

                            let dateNum = Math.ceil(
                                (new Date(todo.date).getTime() - new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            );

                            let dateText: string;

                            if (todo.check) {
                                dateText = '完了';
                            } else if (dateNum < 0) {
                                dateText = '期限切れ';
                            } else {
                                dateText = `残り${dateNum}日`;  // ← ← ← ← ここがテンプレートリテラル
                            }



                            return (
                                <li key={todo.id}>
                                    <div className="card shadow-md border border-base-200">
                                        <div className="card-body p-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={todo.check}
                                                        onChange={(e) => handleCheck(todo.id!, e.target.checked)}
                                                    />
                                                    <span className="text-lg">{todo.text}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-square btn-sm"
                                                        onClick={() => {
                                                            setSelectTodo(todo);
                                                            setIsOpen(true);
                                                        }}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="btn btn-square btn-sm"
                                                        onClick={() => handleDelete(todo.id)}
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm mt-2">
                                                <span>
                                                    期限: {new Date(todo.date).getMonth() + 1}/{new Date(todo.date).getDate()}
                                                </span>
                                                <span className="badge badge-secondary badge-sm">
                                                    {dateText}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}

                    </ul>

                </div>
            )}
        </div>
    )
}

export default TaskList;