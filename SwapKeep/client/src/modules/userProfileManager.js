import { getToken } from "./authManager";

const apiUrl = `/api/userProfile`;

export const getCurrentUserId = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/currusrid`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get your id."
        );
      }
    });
  });
};
