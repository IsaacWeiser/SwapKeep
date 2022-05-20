import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItemById } from "../modules/itemManager";
import { useParams } from "react-router-dom";
import { updateItem } from "../modules/itemManager";
import { useHistory } from "react-router-dom";
import "./style/deactivate.css";

export const ItemDeactivate = () => {
  const { id } = useParams();
  const history = useHistory();

  const [item, setItem] = useState({});
  const [confirmTracker, setConfirmTracker] = useState(0);

  useEffect(() => {
    getItemById(id).then((res) => {
      res.available = false;
      return setItem(res);
    });
  }, []);

  const confirmDeactivate = () => {
    updateItem(item).then(() => history.go(-1));
  };

  return (
    <>
      <h1>Are you sure you want to deactivate this item?</h1>
      <section id="item-card">
        <div id="item-details">
          <img src={item.imageUrl}></img>
          <h4>{item.name}</h4>
        </div>
        <article id="buttons">
          <div>
            <button onClick={confirmDeactivate}>DEACTIVATE</button>
          </div>
          <div>
            <Link to={`/item/details/${item.id}`}>Go Back</Link>
          </div>
        </article>
      </section>
    </>
  );
};
