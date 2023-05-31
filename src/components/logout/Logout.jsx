import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload()
  };
  return (
    <button className="bg-red-500 hover:bg-red-800 text-white px-4 py-1 rounded-md ml-8 self-center" onClick={handleLogout}>
      <span className="text-white">Logout</span>
    </button>
  );
};

export default Logout;