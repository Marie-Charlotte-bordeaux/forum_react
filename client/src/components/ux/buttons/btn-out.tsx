import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/userContext";

const BtnOut: React.FC = () => {
  const { logout } = useContext(UserContext) || {};

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (logout) {
      logout();
      navigate("/signin");
    console.log('dans le logout!');

    }
    console.log('dans le oups!');
  };

  return (
    <button 
      onClick={handleLogout} 
      type="button" 
      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      Se déconnecter
    </button>
  );
};

export default BtnOut;
