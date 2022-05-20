import { useState, useEffect } from "react";
import { getAllItemsOfUser } from "../modules/itemManager";
import { Link } from "react-router-dom";
import { userItems } from "./style/UserItems.css";

export const CurrentUserItems = () => {
  const [userItems, updateUserItems] = useState();

  useEffect(() => {
    getAllItemsOfUser().then((res) => updateUserItems(res));
  }, []);

  return (
    <>
      <h1>your items</h1>
      <section id="inventory">
        {userItems?.map((item) => (
          <div className="item-card" key={item.id}>
            <h4>{item?.name}</h4>
            <img src={item?.imageUrl}></img>
            <div className="button-section">
              <button>
                <Link to={`/item/details/${item.id}`}>View</Link>
              </button>
              {item.available == true ? (
                <button>
                  <Link to={`/item/deactivate/${item.id}`}>Deactivate</Link>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
