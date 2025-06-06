import { auth } from '../firebase';
import { signOut } from 'firebase/auth';


const TaskHeader = ({ user }: { user: any }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('ログアウト成功');
      })
      .catch((error) => {
        console.error('ログアウトエラー:', error);
      });
  };

  return (
    <div className="flex items-center justify-between p-4">

      <div className="flex items-center gap-3">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt={`${user.displayName}のプロフィール画像`}
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-800">
          {user?.displayName} さんのタスク管理
        </h2>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-white hover:bg-red-600 text-slate-950 rounded-md transition duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>


      </button>
    </div>

  );
};

export default TaskHeader;
