import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../modules/itemManager";
import { itemConditioner } from "../modules/itemManager";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCurrentUserId } from "../modules/userProfileManager";
import { itemDetails } from "./style/itemDetails.css";

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
      <section id="item-detail-card">
        <h1>Item Details</h1>
        <article id="info-split">
          <div id="img-half">
            <img src={item?.imageUrl}></img>
          </div>
          <div id="detail-half">
            <article id="name-detail">
              <div>
                <h4>name:</h4>
              </div>
              <div>
                <p>{item?.name}</p>
              </div>
            </article>
            <article id="description-detail">
              <div>
                <h4>Description: </h4>
              </div>
              <div>
                <p>{item?.description}</p>
              </div>
            </article>
            <article id="condition-detail">
              <div>
                <h4>condition: </h4>
              </div>
              <div>
                <p>{condition()}</p>
              </div>
            </article>
            <article id="category-detail">
              <div>
                <h4>Category: </h4>
              </div>
              <div>
                <p>{item.category?.name}</p>
              </div>
            </article>
            <article id="available-detail">
              <div>
                <h4>Available: </h4>
              </div>
              <div>
                <p>{`${item?.available}`}</p>
              </div>
            </article>
            <article id="links">
              <div>
                <Link to={`/item/edit/${item.id}`}>edit</Link>
              </div>
              <div>
                <Link to={`/item/deactivate/${item.id}`}> deactivate</Link>
              </div>
              <div>
                {currentUserId != item?.userId ? (
                  <Link to={`/item/offer/create/${item.id}`}>
                    Trade for this
                  </Link>
                ) : (
                  <p></p>
                )}
              </div>
              <div>
                <a onClick={back}>back</a>
              </div>
            </article>
          </div>
        </article>
      </section>
    </>
  );
};
