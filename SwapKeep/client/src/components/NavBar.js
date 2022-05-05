import { logout } from "../modules/authManager";

export const NavBar = () => {
  const logO = () => {
    logout();
  };

  return (
    <>
      <div>
        <h1>SwapKeep</h1>
        <a>
          <p>Listings</p>
        </a>
        <select>
          <option>Items</option>
          <option>My Items</option>
          <option>Create Item</option>
        </select>
        <a>
          <p>Offers</p>
        </a>
        <button onClick={logO}>Logout</button>
      </div>
    </>
  );
};
