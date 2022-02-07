import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_WEB_DATA, SERVER_API } from "./config";
import Paste from "./components/Paste";

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

export default function App() {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    const setter = async () => {
      const { data } = await axios.post(SERVER_API, BASE_WEB_DATA);
      setPastes(data);
    };

    setter();
  }, []);

  return (
    <>
      {pastes.length ? (
        <StyledList>
          {pastes.map((paste, i) => (
            <Paste key={i + paste.title} paste={paste} />
          ))}
        </StyledList>
      ) : (
        "waiting"
      )}
    </>
  );
}
