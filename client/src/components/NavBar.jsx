import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="w-100 d-flex py-1">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link text-uppercase">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/all-drink-types" className="nav-link text-uppercase">
            Drink Types
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/all-drinks" className="nav-link text-uppercase">Drinks</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;