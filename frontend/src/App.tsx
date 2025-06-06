import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';

const App = () => {
  const [user] = useAuthState(auth);


 

  return (
    <>
      {!user || !user.uid ? <LoginPage /> : <TaskPage user={user} />}
    </>
  );
  
};

export default App;
