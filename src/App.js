import React, { useState } from "react";
import "./styles.css";

const NUM_INPUT_ROWS = 30;

const sortLines = text => {
  return text
    .split("\n")
    .sort((a, b) => a.localeCompare(b))
    .join("\n");
};

const stripDuplicates = text => {
  return Array.from(new Set(text.split("\n"))).join("\n");
};

export default function App() {
  const [checkedStripDuplicates, setCheckedStripDuplicates] = useState(false);

  const [text, setText] = useState("");

  const toggleCheckedStripDuplicates = () => {
    setCheckedStripDuplicates(!checkedStripDuplicates);
  };

  const sortText = () => {
    const processedText = checkedStripDuplicates ? stripDuplicates(text) : text;
    setText(sortLines(processedText.trim()));
  };

  const handleCtrlEnter = e => {
    if (e.keyCode === 13 && e.ctrlKey) {
      sortText();
    }
  };

  return (
    <div className="App">
      <form
        className="app-form"
        onSubmit={e => {
          e.preventDefault();
          sortText();
        }}
        rows={NUM_INPUT_ROWS}
      >
        <div>
          <textarea
            className="user-input"
            onChange={e => {
              setText(e.target.value);
            }}
            onKeyDown={handleCtrlEnter}
            value={text}
          />
          <sub className="sub-textarea">
            <i>Press Ctrl+Enter to submit</i>
          </sub>
        </div>
        <div className="actions">
          <button className="sort-button" type="submit">
            Sort
          </button>
          <label htmlFor="checkbox-strip-duplicates">
            <input
              checked={checkedStripDuplicates}
              id="checkbox-strip-duplicates"
              name="stripDuplicates"
              onChange={toggleCheckedStripDuplicates}
              type="checkbox"
            />
            Strip Duplicates
          </label>
        </div>
      </form>
    </div>
  );
}
