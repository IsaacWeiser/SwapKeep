import { useState, useEffect } from "react";
import { getOpenTradesOfferedById } from "../modules/TradeManager";
import { getOpenTradesOfferedToId } from "../modules/TradeManager";
import { getClosedTradesOfferedById } from "../modules/TradeManager";
import { getClosedTradesOfferedToId } from "../modules/TradeManager";
import { getAllItems } from "../modules/itemManager";

export const ViewTrades = () => {
  const [openTradesOfferedByUser, setOpenTradesOfferedByUser] = useState([]);
  const [openTradesOfferedToUser, setOpenTradesOfferedToUser] = useState([]);
  const [closedTradesOfferedByUser, setClosedTradesOfferedByUser] = useState(
    []
  );
  const [closedTradesOfferedToUser, setClosedTradesOfferedToUser] = useState(
    []
  );
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems().then((res) => setItems(res));
    getOpenTradesOfferedById().then((res) => setOpenTradesOfferedByUser(res));
    getOpenTradesOfferedToId().then((res) => setOpenTradesOfferedToUser(res));
    getClosedTradesOfferedById().then((res) =>
      setClosedTradesOfferedByUser(res)
    );
    getClosedTradesOfferedToId().then((res) =>
      setClosedTradesOfferedToUser(res)
    );
  }, []);

  return (
    <>
      <h1>Open Trades</h1>
      <h2>you offered</h2>
      {openTradesOfferedByUser.map((offer) => {
        return (
          <div>
            <p>{items.find((item) => item.id === offer.party1ItemId).name}</p>
            <img
              src={
                items.find((item) => item.id === offer.party1ItemId).imageUrl
              }
            ></img>
          </div>
        );
      })}
      <h2>Offered to you</h2>
      <h1>Closed Trades</h1>
      <h2>you offered</h2>
      <h2>Offered to you</h2>
    </>
  );
};
