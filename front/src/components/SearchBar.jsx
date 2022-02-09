import React, { useState } from "react";
import { NO_SUCH_PASTE } from "../config";

let promisesInQueue = 0;

const delay = (delaySeconds) =>
  new Promise((resolve) => {
    promisesInQueue += 1;
    setTimeout(() => {
      promisesInQueue -= 1;
      resolve();
    }, 1000 * delaySeconds);
  });

export default function SearchBar({ pastes, pastesSetter }) {
  const [filterText, setFilterText] = useState("");

  const inputChangeHandler = async ({ target: { value } }) => {
    setFilterText(value);
    await delay(2);

    if (!promisesInQueue) {
      const filteredPastes = pastes.filter(({ title }) =>
        title.toLowerCase().includes(value.toLowerCase())
      );

      filteredPastes[0] = filteredPastes[0] || NO_SUCH_PASTE;

      pastesSetter(filteredPastes);
    }
  };

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
