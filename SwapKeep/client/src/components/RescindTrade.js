import { useState, useEffect } from "react";
import { getTradeById } from "../modules/TradeManager";
import { useParams, Link } from "react-router-dom";
import { updateTrade } from "../modules/TradeManager";
import { useHistory } from "react-router-dom";

export const RescindTrade = () => {
  const { id } = useParams();
  const history = useHistory();

  const [trade, setTrade] = useState({});

  useEffect(() => {
    getTradeById(id).then((res) => setTrade(res));
  }, []);

  trade.statusId = 5;
  const rescind = (evt) => {
    evt.preventDefault();
    updateTrade(trade);
    history.go(-1);
  };

  return (
    <>
      <h1>Are you sure you want to rescind the offer?</h1>
      <button onClick={rescind}>Confirm</button>
      <Link to={`/offers/`}>Go Back</Link>
    </>
  );
};
