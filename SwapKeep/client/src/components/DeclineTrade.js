import { useState, useEffect } from "react";
import { getTradeById } from "../modules/TradeManager";
import { useParams, Link } from "react-router-dom";
import { updateTrade } from "../modules/TradeManager";
import { useHistory } from "react-router-dom";

export const DeclineTrade = () => {
  const { id } = useParams();
  const history = useHistory();

  const [trade, setTrade] = useState({});

  useEffect(() => {
    getTradeById(id).then((res) => setTrade(res));
  }, []);

  trade.statusId = 4;
  const decline = (evt) => {
    evt.preventDefault();
    updateTrade(trade);
    history.go(-1);
  };

  return (
    <>
      <h1>Are you sure you want to decline the offer?</h1>
      <button onClick={decline}>Confirm</button>
      <Link to={`/offers/`}>Go Back</Link>
    </>
  );
};
