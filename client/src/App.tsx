import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/pages/home";
import "./index.css";
import Authentification from "./components/pages/authentification";
import CreateAccount from "./components/pages/createAccount";
import Navbar from "./components/layout/navbar";

function App() {


  return (
    <>
    <BrowserRouter>
    
    <header>
      <Navbar />
      <h1 className="text-3xl font-bold underline text-gray-400">
      Hello  Forum !
      </h1>
    </header>
    <main>
      <Routes>
        <Route  path="/" element={< Home />}/>
        <Route  path="/signup" element={< CreateAccount />}/>
        <Route  path="/signin" element={< Authentification />}/>
      </Routes>
    </main>
    <footer className="bg-sky-950 shadow-md  bot-0 w-full z-50">
    </footer>

    </BrowserRouter>
    </>
  )
}

export default App
