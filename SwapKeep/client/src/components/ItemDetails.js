import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../modules/itemManager";
import { itemConditioner } from "../modules/itemManager";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCurrentUserId } from "../modules/userProfileManager";

export const ItemDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [item, setItem] = useState({});
  const [currentUserId, setCurrentUserId] = useState(0);

  const getItem = (id) => {
    return getItemById(id).then((res) => setItem(res));
  };

  useEffect(() => {
    //debugger;
    getItem(id);
  }, []);

  useEffect(() => {
    //debugger;
    getCurrentUserId().then((res) => setCurrentUserId(res));
  }, [item]);

  const condition = () => {
    return itemConditioner(item?.condition);
  };

  const back = () => {
    history.push(`/item/myItems`);
  };

  return (
    <>
      <h1>Item Details</h1>
      <h4>name:</h4>
      <p>{item?.name}</p>
      <img src={item?.imageUrl}></img>
      <h4>Description: </h4>
      <p>{item?.description}</p>
      <h4>condition: </h4>
      <p>{condition()}</p>
      <h4>Category: </h4>
      <p>{item.category?.name}</p>
      <h4>Available: </h4>
      <p>{`${item?.available}`}</p>
      <Link to={`/item/edit/${item.id}`}>edit</Link> |
      <Link to={`/item/deactivate/${item.id}`}> deactivate</Link> |
      <a onClick={back}>back</a>
      {currentUserId != item?.userId ? (
        <Link to={`/item/offer/create/${item.id}`}>| Trade for this</Link>
      ) : (
        <p>test</p>
      )}
    </>
  );
};
