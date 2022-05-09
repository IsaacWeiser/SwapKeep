import { useState, useEffect } from "react";
import { getAllItemsOfUser } from "../modules/itemManager";
import { Link } from "react-router-dom";

export const CurrentUserItems = () => {
  const [userItems, updateUserItems] = useState();

  useEffect(() => {
    getAllItemsOfUser().then((res) => updateUserItems(res));
  }, []);

  return (
    <>
      <h1>your items</h1>
      <div>
        {userItems?.map((item) => (
          <div>
            <img src={item?.imageUrl}></img>
            <h4>{item?.name}</h4>
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
        ))}
      </div>
    </>
  );
};
