import React from "react";
import ShowMoreText from "react-show-more-text";
import { StyledText, StyledPasteContainer } from "./Styled";

export default function Paste({ paste }) {
  return (
    <StyledPasteContainer>
      <h4>{paste.title}</h4>
      <ShowMoreText>
        <StyledText>{paste.content}</StyledText>
      </ShowMoreText>
      <b>
        {paste.author} | {paste.date}
      </b>
    </StyledPasteContainer>
  );
}
