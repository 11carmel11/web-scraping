import React from "react";
import styled from "styled-components";
import ShowMoreText from "react-show-more-text";

const StyledContainer = styled.div`
  border: 3px solid black;
  border-radius: 30px;
  padding: 10px;
  margin-top: 20px;
  display: table-caption;
`;

const StyledText = styled.p`
  overflow-wrap: break-word;
`;

export default function Paste({ paste }) {
  return (
    <StyledContainer>
      <h4>{paste.title}</h4>
      <ShowMoreText>
        <StyledText>{paste.content}</StyledText>
      </ShowMoreText>
      <b>
        {paste.author} | {paste.date}
      </b>
    </StyledContainer>
  );
}
