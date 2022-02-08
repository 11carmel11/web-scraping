import styled from "styled-components";

export const StyledPastesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

export const StyledPasteContainer = styled.div`
  border: 3px solid black;
  border-radius: 30px;
  padding: 10px;
  margin-top: 20px;
  display: table-caption;
  height: fit-content;
`;

export const StyledText = styled.p`
  overflow-wrap: break-word;
`;
