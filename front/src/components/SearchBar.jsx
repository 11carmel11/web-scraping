import React, { useContext, useEffect, useState } from "react";
import PastesContext from "../contexts/pastes/context";

let promisesInQueue = 0;

const delay = (delaySeconds) =>
  new Promise((resolve) => {
    promisesInQueue += 1;
    setTimeout(() => {
      promisesInQueue -= 1;
      resolve();
    }, 1000 * delaySeconds);
  });

export default function SearchBar() {
  const { dispatch, pastes } = useContext(PastesContext);
  const [filterText, setFilterText] = useState("");

  const inputChangeHandler = async ({ target: { value } }) => {
    setFilterText(value);
    await delay(1);

    if (!promisesInQueue) {
      const mappedPastes = pastes.map((paste) => {
        paste.hide = !paste.title.toLowerCase().includes(value.toLowerCase());
        return paste;
      });

      const action = { payload: mappedPastes, type: "FILTER" };

      dispatch(action);
    }
  };

  useEffect(() => {
    pastes.every((paste) => !paste.hide) &&
      inputChangeHandler({ target: { value: "" } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastes]);

  return (
    <>
      <label htmlFor="filter-input">
        <h3>filter pastes by title:</h3>
      </label>
      <input
        id="filter-input"
        value={filterText}
        onInput={inputChangeHandler}
      />
    </>
  );
}
