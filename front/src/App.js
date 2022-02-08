import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { StyledPastesList } from "./components/Styled";
import Loader from "./components/Loader";
import { asyncEffect } from "./helpers";
import Paste from "./components/Paste";

export default function App() {
  const [pastes, setPastes] = useState([]);
  const loading = !pastes.length;

  useEffect(() => {
    asyncEffect(setPastes);
  }, []);

  if (loading) return <Loader />;
  else
    return (
      <StyledPastesList>
        {pastes.map((paste) => (
          <Paste key={nanoid()} paste={paste} />
        ))}
      </StyledPastesList>
    );
}
