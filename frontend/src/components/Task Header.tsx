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
    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
  >
    ログアウト
  </button>
</div>

  );
};

export default TaskHeader;
