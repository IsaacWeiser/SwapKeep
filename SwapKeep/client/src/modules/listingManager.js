const apiUrl = `api/item`;

export const localListingGrabber = () => {
  return fetch(apiUrl).then((res) => res.json());
};
