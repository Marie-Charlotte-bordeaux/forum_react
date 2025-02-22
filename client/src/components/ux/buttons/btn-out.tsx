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
      console.log("dans le logout!");
    }
    console.log("dans le oups!");
  };

  return (
    <button 
      onClick={handleLogout} 
      type="button" 
      className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-red-700 focus:bg-red-600 focus:text-white rounded-lg transition"
    >
      Se déconnecter
    </button>
  );
};

export default BtnOut;
