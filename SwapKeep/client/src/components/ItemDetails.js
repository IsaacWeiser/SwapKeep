import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../modules/itemManager";
import { itemConditioner } from "../modules/itemManager";
import { getCategoryById } from "../modules/categoryManager";
import { Link } from "react-router-dom";

export const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  const getItem = (id) => {
    return getItemById(id).then((res) => setItem(res));
  };

  useEffect(() => {
    getItem(id);
  }, []);

  const condition = () => {
    return itemConditioner(item?.condition);
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
      <Link to={`/item/myItems/`}>back</Link>
    </>
  );
};
