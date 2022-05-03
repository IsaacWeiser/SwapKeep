import { useState, useEffect } from "react";
import { getByFireId } from "../modules/authManager";
import firebase from "firebase";
import "firebase/auth";
import { getAllItemsOfUser } from "../modules/itemManager";
import { Link } from "react-router-dom";

export const CurrentUserItems = () => {
  const [userProfile, setUserProfile] = useState({});
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
              <Link to={`/item/edit`}>View</Link>
            </button>
            <button>
              <Link to={`/item/deactivate`}>Deactivate</Link>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
