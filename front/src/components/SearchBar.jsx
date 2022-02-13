import React, { useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import PastesContext from "../contexts/pastes/context";

export default function SearchBar() {
  const { dispatch, pastes } = useContext(PastesContext);
  const [filterText, setFilterText] = useState("");

  const filterPastes = (value) => {
    setFilterText(value);

    const mappedPastes = pastes.map((paste) => {
      paste.hide = !paste.title.toLowerCase().includes(value.toLowerCase());
      return paste;
    });

    const action = { payload: mappedPastes, type: "FILTER" };

    dispatch(action);
  };

  const inputChangeHandler = async ({ target: { value } }) => {
    filterPastes(value);
  };

  useEffect(() => {
    if (
      pastes.filter((paste) => !paste.hide).length === pastes.length &&
      filterText
    )
      filterPastes("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastes]);

  return (
    <>
      <label htmlFor="filter-input">
        <h3>filter pastes by title:</h3>
      </label>
      <DebounceInput
        id="filter-input"
        type="text"
        value={filterText}
        onChange={inputChangeHandler}
        debounceTimeout="1500"
      />
    </>
  );
}
