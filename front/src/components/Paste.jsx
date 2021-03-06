import React, { useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";
import { StyledText, StyledPasteContainer } from "./Styled";
import { polarityCheck } from "../helpers";

export default function Paste({ paste }) {
  const [polarity, setPolarity] = useState(0);
  const [text, setText] = useState(paste.content);

  useEffect(() => {
    const { text, score } = polarityCheck(paste);
    setPolarity(score);
    setText(text);
  }, [paste]);

  return (
    <StyledPasteContainer hidden={paste.hide}>
      <h4>{paste.title}</h4>
      <ShowMoreText>
        <StyledText>{text}</StyledText>
      </ShowMoreText>
      <b>
        {paste.author} | {paste.date} <br />
        <small>polarity: {polarity}</small>
      </b>
    </StyledPasteContainer>
  );
}
