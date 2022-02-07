import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import axios from "axios";
import { BASE_WEB_DATA, SERVER_API, timeout } from "./config";
import Paste from "./components/Paste";

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

export default function App() {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    const setPastesAsync = async () => {
      const { data } = await axios.post(SERVER_API, BASE_WEB_DATA);
      setPastes(data);
    };

    // component did mount
    setPastesAsync();
    const interval = setInterval(setPastesAsync, timeout);

    // component did unmount
    return () => clearInterval(interval);
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
        "waiting"
      )}
    </>
  );
}
