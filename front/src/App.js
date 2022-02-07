import React, { useEffect, useState } from "react";
import axios from "axios";
import Paste from "./components/Paste";
import { BASE_WEB_DATA, SERVER_API } from "./config";

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
        <ol>
          {pastes.map((paste, i) => (
            <Paste key={i + paste.title} paste={paste} />
          ))}
        </ol>
      ) : (
        "waiting"
      )}
    </>
  );
}
