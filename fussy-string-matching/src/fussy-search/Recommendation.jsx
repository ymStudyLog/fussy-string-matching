import React from "react";
import styled from "styled-components";
import useFussy, { splitInputValue } from "./useFussy";

const Recommendation = (props) => {
  const { debouncedValue, handleClick } = props;
  const { match, findMatch } = useFussy();
  console.log(debouncedValue)
  React.useEffect(() => {
    if (debouncedValue.length > 0) {
      findMatch(splitInputValue(debouncedValue.toLowerCase()));
    }
  }, [debouncedValue, findMatch]);

  return (
    <Container>
      <Text>추천 검색어</Text>
      <SearchResult>
        {match?.slice(0, 15).map((matchWord, index) => {
          return (
            <Recommend key={index} onClick={() => handleClick(matchWord)}>
              {matchWord}
            </Recommend>
          );
        })}
      </SearchResult>
    </Container>
  );
};

export default Recommendation;

export const Container = styled.div`
  position: absolute;
  top: 50px;
  width: 200px;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid red;
  z-index: 200;
`;

export const Text = styled.span`
  color: gray;
  font-size: 0.8rem;
`;

export const SearchResult = styled.ul`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
`;

export const Recommend = styled.li`
  padding: 5px 0;
`;
