import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../providers/userContext";
import BtnOut from "../ux/buttons/btn-out";
import { Search, UserCircle2 } from "lucide-react"; // Icônes modernes

export default function Navbar() {
  const { user } = useContext(UserContext) || {}; 
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-sky-950 shadow-md  top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* 🏠 Logo / Home */}
          <NavLink to="/" className="text-xl font-bold text-gray-300">
            Forum🔥
          </NavLink>

          {/* 🔍 Champ de recherche */}
          <div className="relative w-1/3 hidden sm:block">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-300" size={20} />
          </div>

          {/* 📌 Navigation Links */}
          <ul className="flex space-x-6 items-center">
            <li>
              <NavLink to="/" className="text-gray-300 hover:text-blue-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin" className="text-gray-300 hover:text-blue-600">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="text-gray-300 hover:text-blue-600">
                Sign Up
              </NavLink>
            </li>

            {/* Utilisateur connecté : Avatar + Logout */}
            {user ? (
              <>
                <li className="flex items-center space-x-2">
                  <UserCircle2 className="text-blue-500" size={28} />
                  <span className="font-semibold">{user.firstName}</span>
                </li>
                <li>
                  <BtnOut />
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
