import { getToken } from "./authManager";

const apiUrl = `/api/itemtradeoffer`;

export const getAllTrades = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes."
        );
      }
    });
  });
};

export const getTradeById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes."
        );
      }
    });
  });
};

export const addTrade = (trade) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trade),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new category."
        );
      }
    });
  });
};

export const getOpenTrades = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/open/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes."
        );
      }
    });
  });
};

/*export const getOpenTradesOfferedToId = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/open/offersto/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes."
        );
      }
    });
  });
};
export const getClosedTradesOfferedById = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/closed/offersfrom/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes."
        );
      }
    });
  });
}; */
export const getClosedTrades = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/closed/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get quotes."
        );
      }
    });
  });
};

export const updateTrade = (trade) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${trade.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trade),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save changes to trade."
        );
      }
    });
  });
};
