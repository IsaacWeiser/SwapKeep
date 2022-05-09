import { useState, useEffect } from "react";
import { getItemById } from "../modules/itemManager";
import { getAllItemsOfUser } from "../modules/itemManager";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { addTrade } from "../modules/TradeManager";

export const MakeOffer = () => {
  const { id } = useParams();
  const history = useHistory();

  const [itemWanted, setItemWanted] = useState({});
  const [itemsToOffer, setItemsToOffer] = useState([]);
  const [tradeOffer, setTradeOffer] = useState({
    party1ItemId: 0,
    party2ItemId: 0,
    statusId: 1,
  });

  const plzWork = () => {};

  useEffect(() => {
    Promise.all([getItemById(id), getAllItemsOfUser()]).then(
      ([gibi, gaiou]) => {
        setItemWanted(gibi);
        setItemsToOffer(gaiou);
      }
    );
    // getItemById(id).then((res) => setItemWanted(res));
  }, []);

  /*useEffect(() => {
    getAllItemsOfUser().then((res) => setItemsToOffer(res));
  }, []); */

  useEffect(() => {
    const state = { ...tradeOffer };
    state.party2ItemId = itemWanted.id;
    setTradeOffer(state);
  }, [itemWanted]);

  const trackParty1 = (evt) => {
    const state = { ...tradeOffer };
    state.party1ItemId = evt.target.value;
    setTradeOffer(state);
  };

  const submitOffer = (evt) => {
    if (tradeOffer.party1ItemId != 0) {
      evt.preventDefault();

      addTrade(tradeOffer).then(() => history.push(`/offers/`));
    } else {
      alert("please choose an item to offer");
    }
  };

  return (
    <>
      <h1>Make Offer</h1>
      <h3>Item Wanted</h3>
      <h4>{itemWanted.name}</h4>
      <img src={itemWanted.imageUrl}></img>
      <h3>Item you want to offer</h3>
      <select onChange={trackParty1}>
        <option value="0">Select which item you want to offer in return</option>
        {itemsToOffer.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <button onClick={submitOffer}>Submit</button>
      <Link to={`/item/details/${id}`}>Back</Link>
    </>
  );
};
