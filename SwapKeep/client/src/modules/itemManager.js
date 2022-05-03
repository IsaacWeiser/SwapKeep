import { getToken } from "./authManager";

const apiUrl = `/api/item`;

export const addItem = (item) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new item."
        );
      }
    });
  });
};

export const getAllItemsOfUser = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/itemsofuser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get your items."
        );
      }
    });
  });
};
