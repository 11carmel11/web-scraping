import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Paste from "./components/Paste";
import Loader from "./components/Loader";
import { asyncEffect } from "./helpers";

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

export default function App() {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    asyncEffect(setPastes);
  }, []);

  return (
    <>
      {pastes.length ? (
        <StyledList>
          {pastes.map((paste) => (
            <Paste key={nanoid()} paste={paste} />
          ))}
        </StyledList>
      ) : (
        <Loader />
      )}
    </>
  );
}
