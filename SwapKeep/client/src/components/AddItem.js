import { addItem } from "../modules/itemManager";
import { useState, useEffect } from "react";
import { getAllCategories } from "../modules/categoryManager";
import { useHistory } from "react-router-dom";

export const NewItemForm = () => {
  let history = useHistory();

  const [item, updateItem] = useState({
    name: "",
    imageUrl: "",
    categoryId: 0,
    description: "",
    condition: 0,
    Available: true,
  });

  const [submissionTracker, setSubmissionTracker] = useState(0);

  useEffect(() => {
    updateItem({
      name: "",
      imageUrl: "",
      categoryId: 0,
      description: "",
      condition: 0,
      Available: true,
    });

    document.querySelector("#newNameInp").value = "";
    document.querySelector("#newImgUrlInp").value = "";
    document.querySelector("#newCatIdInp").value = 0;
    document.querySelector("#newDescriptionInp").value = "";
    document.querySelector("#newConditionInp").selectedIndex = 0;
  }, [submissionTracker]);

  const [categories, updateCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((res) => updateCategories(res));
  }, []);

  const trackName = (evt) => {
    updateItem({
      name: evt.target.value,
      imageUrl: item.imageUrl,
      categoryId: item.categoryId,
      description: item.description,
      condition: item.condition,
      Available: item.Available,
    });
  };

  const trackImageUrl = (evt) => {
    updateItem({
      name: item.name,
      imageUrl: evt.target.value,
      categoryId: item.categoryId,
      description: item.description,
      condition: item.condition,
      Available: item.Available,
    });
  };

  const trackCategoryId = (evt) => {
    updateItem({
      name: item.name,
      imageUrl: item.imageUrl,
      categoryId: evt.target.value,
      description: item.description,
      condition: item.condition,
      Available: item.Available,
    });
  };

  const trackDescription = (evt) => {
    updateItem({
      name: item.name,
      imageUrl: item.imageUrl,
      categoryId: item.categoryId,
      description: evt.target.value,
      condition: item.condition,
      Available: item.Available,
    });
  };

  const trackCondition = (evt) => {
    updateItem({
      name: item.name,
      imageUrl: item.imageUrl,
      categoryId: item.categoryId,
      description: item.description,
      condition: evt.target.value,
      Available: item.Available,
    });
  };

  let i = 1;

  const submitItem = (evt) => {
    evt.preventDefault();

    if (
      !document.querySelector("#newNameInp").value ||
      !document.querySelector("#newNameInp").value.trim() ||
      !document.querySelector("#newImgUrlInp").value ||
      !document.querySelector("#newImgUrlInp").value.trim() ||
      !document.querySelector("#newCatIdInp").value ||
      !document.querySelector("#newDescriptionInp").value ||
      !document.querySelector("#newDescriptionInp").value.trim() ||
      !document.querySelector("#newConditionInp").value
    ) {
      alert("no empty values allowed");
    } else {
      addItem(item).then(() => {
        setSubmissionTracker(submissionTracker + 1);
        history.push(`/item/myItems`);
      });
    }
  };

  return (
    <>
      <h1>Add Item</h1>
      <p>Enter an item name</p>
      <input id="newNameInp" onChange={trackName} />
      <p>Enter an item imageUrl</p>
      <input id="newImgUrlInp" onChange={trackImageUrl} />
      <p>Enter an item category</p>
      <select id="newCatIdInp" onChange={trackCategoryId}>
        <option value="0">Please Select an Option</option>
        {categories.map((cat) => {
          return <option key={cat.id} value={i++}>{`${cat.name}`}</option>;
        })}
      </select>
      <p>Enter an item description</p>
      <input id="newDescriptionInp" onChange={trackDescription} />
      <p>Enter an item condition</p>
      <select id="newConditionInp" onChange={trackCondition}>
        <option value="0">Please Select an Option</option>
        <option value="1">broken/ non-functional</option>
        <option value="2">acceptable</option>
        <option value="3">good</option>
        <option value="4">very good</option>
        <option value="5">New</option>
      </select>
      <div>
        <button onClick={submitItem}>submit</button>
      </div>
    </>
  );
};
