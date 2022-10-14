import React from "react";
import dictionary from "./dictionary";

export const splitInputValue = (value) => {
  const numberOfCases = [];
  for (let x = value.length - 1; x >= 1; x--) {
    for (let y = 0; y < value.length - x; y++) {
      numberOfCases.push(value.slice(y, x + y + 1));
    }
  }
  return [...new Set(numberOfCases)];
};

const useFussy = () => {
  const [match, setMatch] = React.useState([]);

  const findPartialMatch = (inputWord, perfectMatch) => {
    const partialMatch = dictionary
      .filter((word) => word.toLowerCase().includes(inputWord) === true)
      .sort(function (a, b) {
        if (a.indexOf(inputWord) < b.indexOf(inputWord)) return -1;
        if (a.indexOf(inputWord) > b.indexOf(inputWord)) return 1;
        return 0;
      });

    return [...new Set(perfectMatch.concat(partialMatch))];
  };

  const findPerfectMatch = (inputWord, callback) => {
    const perfectMatch = dictionary.filter((word) => word === inputWord);
    return callback(inputWord, perfectMatch);
  };

  const findMatch = (wordArray) => {
    wordArray.forEach((word) => {
      setMatch((prevState) =>
        [...prevState].concat(findPerfectMatch(word, findPartialMatch))
      );
    });
  };

  return {
    match: match.length > 0 ? [...new Set(match)] : ["검색어 없음"],
    findMatch,
  };
};

export default useFussy;
