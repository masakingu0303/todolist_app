import TaskHeader from '../components/Task Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskEditModal from '../components/TaskEditModal';
import { useState } from 'react';



type TaskPageProps = {
  user: any;
};

type Todos = {
  id?: number;
  text: string | null;
  date: string;
  check: boolean;
  uid: string;  // ユーザーIDを追加
}

const TaskPage = ({ user }: TaskPageProps) => {

  const [todos, setTodos] = useState<Todos[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todos | null>(null);


  return (
    <div>
      <TaskHeader user={user} />
      <TaskForm setTodos={setTodos} todos={todos} user={user} />
      <TaskList setTodos={setTodos} todos={todos} user={user} setIsOpen={setIsOpen} setSelectTodo={setSelectTodo} />
      <TaskEditModal todos={todos} setTodos={setTodos} isOpen={isOpen} setIsOpen={setIsOpen} selectTodo={selectTodo} />
    </div>
  );
};

export default TaskPage;
