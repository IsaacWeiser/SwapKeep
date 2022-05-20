import { useState, useEffect } from "react";
import { getItemById } from "../modules/itemManager";
import { useParams } from "react-router-dom";
import { itemConditioner } from "../modules/itemManager";
import { Link } from "react-router-dom";
import { getAllCategories } from "../modules/categoryManager";
import { updateItem } from "../modules/itemManager";
import { useHistory } from "react-router-dom";
import "./style/addEdit.css";

export const ItemEdit = () => {
  const history = useHistory();

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
  }, [categories]);

  const condition = () => {
    return itemConditioner(item?.condition);
  };

  const trackCondition = (evt) => {
    let state = { ...item };
    state.condition = evt.target.value;
    setItem(state);
  };

  const trackCategory = (evt) => {
    let state = { ...item };
    state.categoryId = evt.target.value;
    setItem(state);
  };

  const trackName = (evt) => {
    let state = { ...item };
    state.name = evt.target.value;
    setItem(state);
  };

  const trackImgUrl = (evt) => {
    let state = { ...item };
    state.imageUrl = evt.target.value;
    setItem(state);
  };

  const trackDescription = (evt) => {
    let state = { ...item };
    state.description = evt.target.value;
    setItem(state);
  };

  const trackAvailable = (evt) => {
    let state = { ...item };
    state.available = evt.target.checked;
    setItem(state);
  };

  const submitState = () => {
    let state = {
      id: item.id,
      name: item.name,
      categoryId: item.categoryId,
      imageUrl: item.imageUrl,
      userId: item.userId,
      description: item.description,
      condition: item.condition,
      available: item.available,
    };

    setItem(state);

    updateItem(item).then(() => history.push(`/item/details/${item.id}`));
  };

  let i = 1;

  return (
    <>
      <h1>Edit Item</h1>
      <section className="ItemForm">
        <h4>name:</h4>
        <input value={`${item?.name}`} onChange={trackName}></input>
        <h4>Image url</h4>
        <input value={`${item?.imageUrl}`} onChange={trackImgUrl}></input>
        <h4>Description: </h4>
        <input
          value={`${item?.description}`}
          onChange={trackDescription}
        ></input>
        <div className="selector">
          <h4>condition: </h4>
          <select
            className="formSelect"
            id="conditionSelect"
            onChange={trackCondition}
          >
            <option value="1">Broken</option>
            <option value="2">acceptable</option>
            <option value="3">good</option>
            <option value="4">Very good</option>
            <option value="5">New</option>
          </select>
        </div>
        <div className="selector">
          <h4>Category: </h4>
          <select
            className="formSelect"
            id="categorySelect"
            onChange={trackCategory}
          >
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{`${cat.name}`}</option>
            ))}
          </select>
        </div>
        <h4>Available: </h4>
        <input
          id="availableChx"
          type="checkbox"
          onChange={trackAvailable}
        ></input>
        <div>
          <button onClick={submitState}>submit</button>
        </div>
        <Link to={`/item/details/${item.id}`}>Back</Link>
      </section>
    </>
  );
};
