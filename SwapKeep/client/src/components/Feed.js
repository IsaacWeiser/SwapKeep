import { useState, useEffect } from "react";
import { getAllItemsOfUserZip } from "../modules/itemManager";
import { getCurrentUserId } from "../modules/userProfileManager";
import { getAllCategories } from "../modules/categoryManager";
import { getAllItemsOfCategoryNotOfUserAndOfZipCode } from "../modules/itemManager";

export const Feed = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategoryId, setFilterCategoryId] = useState(0);

  useEffect(() => {
    getAllItemsOfCategoryNotOfUserAndOfZipCode(filterCategoryId).then((res) =>
      setItems(res)
    );
  }, [filterCategoryId]);

  useEffect(() => {
    getAllItemsOfUserZip().then((res) => setItems(res));
  }, []);

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res));
  }, []);

  const filterView = (evt) => {
    setFilterCategoryId(evt.target.value);
  };

  return (
    <>
      <h1>Items In your area</h1>
      <select onChange={filterView}>
        <option value="0">FIlter listings By Category</option>
        {categories?.map((cat) => {
          return <option value={cat?.id}>{cat?.name}</option>;
        })}
      </select>
      <div id="feedDisplay">
        {items?.map((item) => {
          return (
            <a href={`/item/details/${item?.id}`}>
              <h2>{item?.name}</h2>
              <img src={item?.imageUrl}></img>
            </a>
          );
        })}
      </div>
    </>
  );
};
