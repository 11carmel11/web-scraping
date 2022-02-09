const pastesReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH":
      return payload.map((paste) => {
        paste.hide = false;
        return paste;
      });

    case "FILTER":
      return [...payload];

    default:
      return state;
  }
};

export default pastesReducer;
