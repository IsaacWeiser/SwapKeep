import { logout } from "../modules/authManager";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const logO = () => {
    logout();
  };

  return (
    <>
      <div>
        <h1>
          <Link to={`/`}>SwapKeep</Link>
        </h1>
        <Link to={`/`}>
          <p>Listings </p>
        </Link>
        |<Link to={`/item/myItems/`}> My Items </Link>|
        <Link to={`/item/new/`}> Create New Item </Link>|
        <Link to={`/offers/`}> My Offers </Link>
        <button onClick={logO}>Logout</button>
      </div>
    </>
  );
};
