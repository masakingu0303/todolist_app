
type TaskEditModalProps = {
    isOpen: any;
    setIsOpen: any;
}

const TaskEditModal = ({ isOpen, setIsOpen }: TaskEditModalProps) => {



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
                            />
                            <input
                                type="date"
                                className="input input-bordered w-full"
                            />
                            <button className="btn  w-full">追加</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



export default TaskEditModal;




