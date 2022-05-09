import { useState, useEffect } from "react";
import { getAllItemsOfUserZip } from "../modules/itemManager";
import { getCurrentUserId } from "../modules/userProfileManager";
import { getAllCategories } from "../modules/categoryManager";
import { getAllItemsOfCategoryNotOfUserAndOfZipCode } from "../modules/itemManager";

export const Feed = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategoryId, setFilterCategoryId] = useState();

  /*useEffect(() => {
    debugger;
    getAllItemsOfCategoryNotOfUserAndOfZipCode(filterCategoryId).then((res) =>
      setItems(res)
    );
  }, [filterCategoryId]); */

  useEffect(() => {
    Promise.all([getAllItemsOfUserZip(), getAllCategories()]).then(
      ([gaiouz, gac]) => {
        setItems(gaiouz);
        setCategories(gac);
      }
    );
    //getAllItemsOfUserZip().then((res) => setItems(res));
  }, []);

  /*useEffect(() => {
    getAllCategories().then((res) => setCategories(res));
  }, []); */

  const filterView = (evt) => {
    getAllItemsOfCategoryNotOfUserAndOfZipCode(evt.target.value).then((res) =>
      setItems(res)
    );
  };

  return (
    <>
      <h1>Items In your area</h1>
      <select onChange={filterView}>
        <option value="0">FIlter listings By Category</option>
        {categories?.map((cat) => {
          return (
            <option key={cat.id} value={cat?.id}>
              {cat?.name}
            </option>
          );
        })}
      </select>
      <div id="feedDisplay">
        {items?.map((item) => {
          return (
            <a key={item.id} href={`/item/details/${item?.id}`}>
              <h2>{item?.name}</h2>
              <img src={item?.imageUrl}></img>
            </a>
          );
        })}
      </div>
    </>
  );
};
