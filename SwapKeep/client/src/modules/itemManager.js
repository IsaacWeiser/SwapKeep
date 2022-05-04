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

export const getAllItemsOfUserZip = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/listings`, {
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

export const getItemById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/item/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to getting your item."
        );
      }
    });
  });
};

export const updateItem = (item) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${item.id}`, {
      method: "PUT",
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
          "An unknown error occurred while trying to save changes to item."
        );
      }
    });
  });
};

export const itemConditioner = (num) => {
  if (num === 1) {
    return `Broken`;
  } else if (num === 2) {
    return `acceptable`;
  } else if (num === 3) {
    return `good`;
  } else if (num === 4) {
    return `very good`;
  } else {
    return `new`;
  }
};
