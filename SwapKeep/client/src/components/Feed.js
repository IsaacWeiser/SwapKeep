import { useState, useEffect } from "react";
import { getAllItemsOfUserZip } from "../modules/itemManager";
import { getCurrentUserId } from "../modules/userProfileManager";

export const Feed = () => {
  const [items, setItems] = useState([]);
  const [currUserId, setCurrUserId] = useState(0);

  useEffect(() => {
    getAllItemsOfUserZip().then((res) => setItems(res));
  }, []);

  useEffect(() => {
    getCurrentUserId().then((res) => setCurrUserId(res));
  }, []);

  return (
    <>
      <h1>Items In your area</h1>
      {items.map((item) => {
        if (item.userId != currUserId) {
          return (
            <a href={`/item/details/${item.id}`}>
              <h2>{item?.name}</h2>
              <img src={item.imageUrl}></img>
            </a>
          );
        }
      })}
    </>
  );
};
