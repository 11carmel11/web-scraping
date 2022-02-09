import React, { useContext, useEffect } from "react";
import { nanoid } from "nanoid";
import { StyledPastesList } from "./components/Styled";
import PastesContext from "./contexts/pastes/context";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import { asyncEffect } from "./helpers";
import Paste from "./components/Paste";

export default function App() {
  const { dispatch, pastes } = useContext(PastesContext);

  const loading = !pastes.length;

  useEffect(() => {
    asyncEffect(dispatch);
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <SearchBar />
      <StyledPastesList>
        {pastes.map((paste) => (
          <Paste key={nanoid()} paste={paste} />
        ))}
      </StyledPastesList>
    </>
  );
}
