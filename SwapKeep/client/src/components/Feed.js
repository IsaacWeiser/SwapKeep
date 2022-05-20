import { useState, useEffect } from "react";
import { getAllItemsOfUserZip } from "../modules/itemManager";
import { getCurrentUserId } from "../modules/userProfileManager";
import { getAllCategories } from "../modules/categoryManager";
import { getAllItemsOfCategoryNotOfUserAndOfZipCode } from "../modules/itemManager";
import { feed } from "./style/feed.css";

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
    if (evt.target.value != 0) {
      getAllItemsOfCategoryNotOfUserAndOfZipCode(evt.target.value).then((res) =>
        setItems(res)
      );
    } else {
      getAllItemsOfUserZip().then((res) => setItems(res));
    }
  };

  return (
    <>
      <h1>Items In your area</h1>
      <div id="listings-feed">
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
        <section id="listing-results">
          {items?.map((item) => {
            return (
              <div key={item.id} className="feed-item">
                <a href={`/item/details/${item?.id}`}>
                  <h2>{item?.name}</h2>
                  <img src={item?.imageUrl}></img>
                </a>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};
