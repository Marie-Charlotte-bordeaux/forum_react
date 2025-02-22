import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/pages/home";
import "./index.css";
import Authentification from "./components/pages/authentification";
import CreateAccount from "./components/pages/createAccount";
import Navbar from "./components/layout/navbar";
import CreatePost from "./components/pages/createPost";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
      
        <header>
          <Navbar />
        </header>
  
        <main className="flex-grow p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/signin" element={<Authentification />} />
            <Route path="/formPost" element={<CreatePost />} />
          </Routes>
        </main>
  
        
        <footer className="bg-gray-900 shadow-md w-full">
        © 2025 - Foforum
        </footer>
      </BrowserRouter>
    </div>
  ); 
}

export default App
