import React from "react";
import Recommendation from "./Recommendation";
import RecommendationByFuse from "./RecommendationByFuse";
import debounce from "./debounce";

const Test = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");
  const [selectedWord, setSelectedWord] = React.useState("");

  const handleClick = (word) => {
    setSelectedWord(word);
    setInputValue("");
    setDebouncedValue("");
  };

  const updateDebounceText = React.useCallback(
    debounce((value) => {
      setDebouncedValue(value);
    }, 500),
    [debounce]
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setOpenModal(true);
    setInputValue(value);
    updateDebounceText(value);
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter" && event.target.value.trim().length > 0) {
      setDebouncedValue(event.target.value);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        top: 10,
        left: 10,
        width: "70vw",
        height: "50vh",
        border: "1px solid black",
      }}
    >
      <h1>fussy string matching 연습하기</h1>
      <form>
        <input
          type="text"
          name="input"
          placeholder="검색어를 입력하세요"
          style={{ width: "400px", border: "1px solid blue" }}
          value={inputValue}
          onChange={handleChange}
        />
      </form>
      {openModal && (
        <>
          <Recommendation
            debouncedValue={debouncedValue}
            handleClick={handleClick}
          />
          <RecommendationByFuse
            debouncedValue={debouncedValue}
            handleClick={handleClick}
          />
        </>
      )}
      {selectedWord && (
        <p
          style={{
            position: "absolute",
            bottom: 0,
            border: "2px solid yellow",
          }}
        >
          {selectedWord}
        </p>
      )}
    </div>
  );
};

export default Test;
