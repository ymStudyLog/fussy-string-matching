import React from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
import dictionary from "./dictionary";

const fuseOptions = {
  findAllMatches: true,
  shouldSort: true,
};

const RecommendationByFuse = (props) => {
  const { debouncedValue, handleClick } = props;
  const [match, setMatch] = React.useState([]);

  const fuse = React.useMemo(() => new Fuse(dictionary, fuseOptions), []);

  React.useEffect(() => {
    const sortedMatch = [];
    for (let x of fuse.search(debouncedValue)) {
      sortedMatch.push(x.item);
    }

    if (sortedMatch.length === 0) {
      setMatch(["검색어 없음"]);
    } else {
      setMatch(sortedMatch);
    }
  }, [debouncedValue, fuse]);

  return (
    <Container>
      <Text>추천 검색어</Text>
      <SearchResult>
        {match?.slice(0, 15).map((matchWord, index) => {
          return (
            <Recommend key={index} onClick={()=>handleClick(matchWord)}>
              {matchWord}
            </Recommend>
          );
        })}
      </SearchResult>
    </Container>
  );
};

export default RecommendationByFuse;

export const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 200px;
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
