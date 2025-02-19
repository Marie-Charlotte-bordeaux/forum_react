import { NavLink } from "react-router"

function Navbar() {



  return (
    <>
    <nav className="bg-background shadow">
      <ul>
        <li>
          <NavLink to="/" >home page</NavLink>
        </li>        
        <li>
          <NavLink to="/signin" >sign page</NavLink>
        </li>        
        <li>
          <NavLink to="/signup" >up page</NavLink>
        </li>      
      </ul>
    </nav>
    </>
  )
}

export default Navbar
