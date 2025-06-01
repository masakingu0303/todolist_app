
// type TaskFormProps {
//     user: any;
//     API: string;
//{user, API}: TaskFormProps
// }


const TaskForm = () => {
    return (
        <div className="text-center mt-4">
            <div className="join">
                <div>
                    <input type="text" className="input join-item w-60" placeholder="タスクを入力してください" />
                </div>
                <div>
                    <input type="date" className="input join-item w-40"/>
                </div>
                <div className="indicator">
                    <button className="btn join-item">追加</button>
                </div>
            </div>
        </div>
    )
}

export default TaskForm;