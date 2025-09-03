import { useAuthStore } from "../../stores/auth";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-570 via-indigo-570 to-emerald-500 to-80%">
        <div className="flex justify-between p-[15px]">
          <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-530 via-30% to-emerald-500 to-90%">
            Flashcard
          </h2>

          <div className="flex items-center space-x-10 text-white">
            <button onClick={()=>navigate('/')}>Home</button>
            <div>Collection</div>
            <button onClick={() => navigate("/user")}>{user?.username}</button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar