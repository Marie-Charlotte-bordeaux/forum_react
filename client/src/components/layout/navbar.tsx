import { NavLink } from "react-router"
import BtnOut from "../ux/buttons/btn-out"

function Navbar() {



  return (
    <>
    <nav className="bg-background shadow">
      <ul>
        <li>
          ma tronche
        </li>  
        <li>
          <NavLink to="/" >home page</NavLink>
        </li>        
        <li>
          <NavLink to="/signin" >sign page</NavLink>
        </li>        
        <li>
          <NavLink to="/signup" >up page</NavLink>
        </li>     
        <li>
          <BtnOut/>
        </li>  
      </ul>
    </nav>
    </>
  )
}

export default Navbar
