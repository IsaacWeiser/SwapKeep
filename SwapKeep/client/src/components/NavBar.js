import { logout } from "../modules/authManager";
import { Link, useHistory } from "react-router-dom";
import { navbar } from "./style/navbar.css";
import {
  Navbar,
  NavItem,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

export const NavBar = () => {
  const history = useHistory();

  const logO = () => {
    logout();
    history.push(`/`);
  };

  return (
    <>
      <div id="nav-div">
        <div id="logo">
          <h1>
            <Link id="logoWord" to={`/`}>
              SwapKeep
            </Link>
          </h1>
        </div>
        <div id="nav-links">
          <div>
            <Link to={`/`}>
              <p className="linksNav">Listings </p>
            </Link>
          </div>
          <div>
            <Link to={`/item/myItems/`}>
              <p className="linksNav"> My Items </p>
            </Link>
          </div>
          <div>
            <Link to={`/item/new/`}>
              <p className="linksNav"> Create New Item </p>
            </Link>
          </div>
          <div>
            <Link to={`/offers/`}>
              <p className="linksNav"> My Offers </p>
            </Link>
          </div>
          <div>
            <button onClick={logO}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};
