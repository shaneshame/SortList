import React, { useState } from 'react';
import './styles.css';

const NUM_INPUT_ROWS = 30;

const sortLines = lines => {
  return lines.sort((a, b) => a.localeCompare(b));
};

const stripDuplicates = list => {
  return Array.from(new Set(list));
};

const trim = (s = '') => {
  return s.trim();
};

const apply = f => list => {
  return list.map(item => {
    return f(item);
  });
};

const doWhen = (f, cond) => value => {
  const predicate = typeof cond === 'function' ? cond(value) : value;
  return predicate ? f(value) : value;
};

export default function App() {
  const [checkedStripDuplicates, setCheckedStripDuplicates] = useState(false);

  const [text, setText] = useState('');

  const toggleCheckedStripDuplicates = () => {
    setCheckedStripDuplicates(!checkedStripDuplicates);
  };

  const sortText = () => {
    const processList = list => {
      return [
        apply(trim),
        doWhen(stripDuplicates, checkedStripDuplicates),
        sortLines
      ].reduce((accumulatedValue, func) => {
        return func(accumulatedValue);
      }, list);
    };

    const result = processList(text.split('\n')).join('\n');

    setText(result);
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
          <label
            className="strip-dups__input-label"
            htmlFor="checkbox-strip-duplicates"
          >
            <input
              checked={checkedStripDuplicates}
              className="strip-dups__input"
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
