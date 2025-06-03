import TaskHeader from '../components/Task Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskEditModal from '../components/TaskEditModal';
import Pagination from '../components/Pagination';
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
   const [isOpen,setIsOpen] = useState(false);



  return (
    <div>
      <TaskHeader user={user}/>
      <TaskForm setTodos={setTodos} todos={todos} user={user}/>
      <TaskList setTodos={setTodos} todos={todos} user={user} setIsOpen={setIsOpen}/>
      <TaskEditModal isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Pagination />
    </div>
  );
};

export default TaskPage;
