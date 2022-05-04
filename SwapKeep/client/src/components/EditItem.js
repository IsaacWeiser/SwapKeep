import { useState, useEffect } from "react";
import { getItemById } from "../modules/itemManager";
import { useParams } from "react-router-dom";
import { itemConditioner } from "../modules/itemManager";
import { Link } from "react-router-dom";
import { getAllCategories } from "../modules/categoryManager";

export const ItemEdit = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getItemById(id).then((res) => setItem(res));
  }, []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res));
  }, []);

  useEffect(() => {
    document.querySelector("#conditionSelect").value = item?.condition;
    document.querySelector("#availableChx").checked = item?.available;
  }, [item]);

  useEffect(() => {
    document.querySelector("#categorySelect").value = item?.categoryId;
  }, [item, categories]);

  const condition = () => {
    return itemConditioner(item?.condition);
  };

  const trackCondition = (evt) => {
    setItem({
      name: item.name,
      imageUrl: item.imageUrl,
      description: item.description,
      condition: evt.target.value,
      category: item.categoryId,
      available: item.available,
    });
  };

  const trackCategory = (evt) => {
    setItem({
      name: item.name,
      imageUrl: item.imageUrl,
      description: item.description,
      condition: item.condition,
      category: evt.target.value,
      available: item.available,
    });
  };

  let i = 1;

  return (
    <>
      <h1>Edit Item</h1>
      <h4>name:</h4>
      <input value={`${item?.name}`}></input>
      <h4>Image url</h4>
      <input value={`${item?.imageUrl}`}></input>
      <h4>Description: </h4>
      <input value={`${item?.description}`}></input>
      <h4>condition: </h4>
      <select id="conditionSelect" onChange={trackCondition}>
        <option value="1">Broken</option>
        <option value="2">acceptable</option>
        <option value="3">good</option>
        <option value="4">Very good</option>
        <option value="5">New</option>
      </select>
      <h4>Category: </h4>
      <select id="categorySelect" onChange={trackCategory}>
        {categories?.map((cat) => (
          <option value={i++}>{`${cat}`}</option>
        ))}
      </select>
      <h4>Available: </h4>
      <input id="availableChx" type="checkbox"></input>
    </>
  );
};
