import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../providers/userContext";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Settings, UserCircle2 } from "lucide-react"; 
import BtnOut from "../ux/buttons/btn-out";

export default function Navbar() {
  const { user } = useContext(UserContext) || {}; // Évite l'erreur si userContext est null
  
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🔹 Logo */}
        <NavLink to="/" className="text-gray-400 font-bold text-xl">
          Foforum
        </NavLink>

        {/* 🔹 Menu principal */}
        <ul className="list-none flex space-x-6 items-center">
          <li>
            <NavLink to="/" className="flex text-gray-400 hover:text-white transition duration-300" aria-label="Accueil">
              <HomeIcon className="h-6 w-6" />
            </NavLink>
          </li>

          {/* 🔹 Connexion et Inscription */}
          {!user ? (
            <>
              <li>
                <NavLink to="/signin" className="text-gray-400 hover:text-white transition duration-300">
                  Se connecter
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="text-gray-400 hover:text-white transition duration-300">
                  S'inscrire
                </NavLink>
              </li>
            </>
          ) : (
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="flex items-center  bg-gray-800 px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition">
                  <UserCircleIcon className="h-8 w-8 text-blue-400" />
                  <span className="font-semibold px-2">{user.firstName}</span>
                </MenuButton>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <NavLink
                          to="/profile"
                          className={`flex items-center px-4 py-2 text-sm text-gray-300 ${focus ? "bg-gray-700 text-white" : ""}`}
                        >
                          <UserCircle2 className="h-5 w-5 mr-2 text-blue-400" />
                          Mon profil
                        </NavLink>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <NavLink
                          to="/settings"
                          className={`flex items-center px-4 py-2 text-sm text-gray-300 ${focus ? "bg-gray-700 text-white" : ""}`}
                        >
                          <Settings className="h-5 w-5 mr-2 text-blue-400" />
                          Paramètres
                        </NavLink>
                      )}
                    </MenuItem>
                    <MenuItem>
                          <BtnOut  />
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          )}
        </ul>
      </div>
    </nav>
  );
}
