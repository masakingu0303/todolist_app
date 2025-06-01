import TaskHeader from '../components/Task Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Pagination from '../components/Pagination';

type TaskPageProps = {
  user: any; 
};

const TaskPage = ({ user }: TaskPageProps) => {
  //const API = 'http://localhost:3000/todos';

  //user={user} API={API}

  return (
    <div>
      <TaskHeader user={user}/>
      <TaskForm />
      <TaskList />
      <Pagination />
    </div>
  );
};

export default TaskPage;
