import { useState, useEffect } from "react";
import { getOpenTrades } from "../modules/TradeManager";
import { getClosedTrades } from "../modules/TradeManager";
import { getCurrentUserId } from "../modules/userProfileManager";
import { Link } from "react-router-dom";
import "./style/offers.css";

export const ViewTrades = () => {
  const [openTrades, setOpenTrades] = useState([]);
  const [closedTrades, setClosedTrades] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    Promise.all([getCurrentUserId(), getOpenTrades(), getClosedTrades()]).then(
      ([cuid, ot, ct]) => {
        setCurrentUserId(cuid);
        setOpenTrades(ot);
        setClosedTrades(ct);
      }
    );
    /* getOpenTradesOfferedById().then((res) => setOpenTrades(res));
    getOpenTradesOfferedToId().then((res) => setOpenTradesOfferedToUser(res));
    getClosedTradesOfferedById().then((res) =>
      setClosedTradesOfferedByUser(res)
    );
    getClosedTradesOfferedToId().then((res) =>
      setClosedTrades(res)
    ); */
  }, []);

  const userItemDeterminer = (tradeOffer, whoseItem) => {
    if (whoseItem === "currUser") {
      if (currentUserId === tradeOffer.p1Item.userId) {
        return tradeOffer.p1Item;
      } else {
        return tradeOffer.p2Item;
      }
    } else {
      if (currentUserId != tradeOffer.p1Item.userId) {
        return tradeOffer.p1Item;
      } else {
        return tradeOffer.p2Item;
      }
    }
  };

  const buttonDeterminer = (offer) => {
    //Sdebugger;
    if (currentUserId == offer.p1Item.userId) {
      return <Link to={`/offers/rescind/${offer.id}`}>Rescind Offer</Link>;
    } else {
      return (
        <div>
          <Link to={`/offers/accept/${offer.id}`}>Accept</Link> |
          <Link to={`/offers/decline/${offer.id}`}>Decline</Link>
        </div>
      );
    }
  };

  const openStatusDeterminer = (offer) => {
    //Sdebugger;
    if (currentUserId == offer.p1Item.userId) {
      return "youOffered";
    } else {
      return "offeredToYou";
    }
  };

  return (
    <>
      <h1>Open Trades</h1>
      <section className="trade-list" id="open-trades-list">
        {openTrades.map((offer) => {
          return (
            <div
              className={`${openStatusDeterminer(offer)} trade-card`}
              key={offer.id}
            >
              <div className="currUser-item item">
                <a
                  href={`/item/details/${
                    userItemDeterminer(offer, "currUser").id
                  }`}
                >
                  <p>{userItemDeterminer(offer, "currUser").name}</p>
                  <img
                    src={userItemDeterminer(offer, "currUser").imageUrl}
                  ></img>
                </a>
              </div>
              <div className="2ndParty-item item">
                <a href={`/item/details/${userItemDeterminer(offer).id}`}>
                  <p>{userItemDeterminer(offer).name}</p>
                  <img src={userItemDeterminer(offer).imageUrl}></img>
                </a>
              </div>
              {buttonDeterminer(offer)}
            </div>
          );
        })}
      </section>
      <section className="trade-list" id="closed-trades-list">
        <h1>Closed Trades</h1>
        {closedTrades.map((offer) => {
          return (
            <div className={`${offer.status.name} trade-card`} key={offer.id}>
              <div className="currUser-item item">
                <a
                  href={`/item/details/${
                    userItemDeterminer(offer, "currUser").id
                  }`}
                >
                  <p>{userItemDeterminer(offer, "currUser").name}</p>
                  <img
                    src={userItemDeterminer(offer, "currUser").imageUrl}
                  ></img>
                </a>
              </div>
              <div className="2ndParty-item item">
                <a href={`/item/details/${userItemDeterminer(offer).id}`}>
                  <p>{userItemDeterminer(offer).name}</p>
                  <img src={userItemDeterminer(offer).imageUrl}></img>
                </a>
              </div>
              <p>{`result: ${offer.status.name}`}</p>
            </div>
          );
        })}
      </section>
    </>
  );
};
