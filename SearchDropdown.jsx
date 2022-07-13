import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { movieState } from '../state/atoms';
import styled from "styled-components";
import { main_color } from "../styles/globalStyle";

//customFussyCallback만 손보기
 
const SearchDropdown = (props) => {
  const { value, keyName } = props;
  //console.log(keyName); //props 안 넘어오는 중 (기대값 : ArrowUp | ArrowDown)

  const [match, setMatch] = useState([]);
  const [titles, setTitles] = useState([]);
  
  const navigate = useNavigate();
  const movies = useRecoilState(movieState); //왜 movies 가져오면 [[영화데이터],function] 배열 형태인가?
  useEffect(()=>{
    setTitles(movies[0].map(i=>i.title_english)); //타이틀만 갈무리
  },[]);

  //useCallback? 아니면 utils 디렉토리에 정리
  const customFussy = (value, callback) => {
    const numberOfCases = [];

    for (let x = value.length-1; x >= 0 ; x--) {
      for (let y = 0; y < value.length - x; y++) {
        numberOfCases.push(value.slice(y, x+y+1));
      }
    }
    console.log(numberOfCases); 

    callback(numberOfCases); 
  };

  const customFussyCallback = (numberOfCases) => {
    const filteredMatch = [];
    for (let x = 0; x < numberOfCases.length; x++) {
      const caseWord = numberOfCases[x];
      filteredMatch.push(
        titles.filter((word) => word.toLowerCase().includes(caseWord) === true)
      );
    }

    //arr2 만들기 전에 다시 sorting 경우의수가 단어에 포함된 인덱스 순으로 !

    const arr2 = [
      ...new Set(
        filteredMatch.reduce(function (acc, cur) {
          return [...acc, ...cur];
        })
      ),
    ];

    setMatch(arr2);
  };

  const handleDropdownClick = (event) => {
    navigate(`/search?q=${event.target.innerText}`); 
  }

  useEffect(() => {
    customFussy(value.toLowerCase(), customFussyCallback);
  }, [value]);

  return (
    <SearchDropdownContainer>
      <Text>추천 검색어</Text>
      <SearchResult>
        {match?.map((matchWord, index) => {
          return <Recommend key={index} onClick={handleDropdownClick}>{matchWord}</Recommend>;
        })}
      </SearchResult>
    </SearchDropdownContainer>
  );
};

export default SearchDropdown;

/* 이 아래 CSS는 자유롭게 수정해주세요 */
export const SearchDropdownContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: ${main_color};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 18px;
  position: absolute;
  top: 34px;
  z-index: 200;
`;

export const Text = styled.span`
  color: gray;
  font-size: 0.8rem;
`;

export const SearchResult = styled.div`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
`;

export const Recommend = styled.p`
  padding: 5px 0;
`;
