/**
 * Lyn's CS317 app illustrating sorting without tiebreakers, 
 * using CS111 section data from Fall 2023.
 */ 

import { useState } from "react";
import "./App.css";

/* CS111 lectures in Fall 2023 */
const lectures = [
  {
    section: 1,
    first: "Eni",
    last: "Mustafaraj"
  },
  {
    section: 2,
    first: "Vinitha",
    last: "Gadiraju"
  },
  {
    section: 3,
    first: "Sohie",
    last: "Lee"
  },
  {
    section: 4,
    first: "Lyn",
    last: "Turbak"
  }
];

/**
 * Helper function for sorting an array of objects by key.
 * This function does *not* handle tiebreakers.
 * 
 * @param {array of objects} array: array to be sorted
 * @param {string} sortKey: key to sort by
 * @param {bool} isAscending: true means sort in ascending order;
 *    false means sort in descending order. 
 * @returns 
 */
function sortArray(array, sortKey, isAscending) {

  // Comparator returns -1 if datum1 should come before datum2,
  // 0 if datum1 and datum2 are "equal",
  // and 1 if datum1 should come after datum2 
  function comparator(datum1, datum2) {
    const val1 = datum1[sortKey];
    const val2 = datum2[sortKey];
    if (isAscending) {
      return val1 < val2 ? -1 : val1 > val2 ? 1 : 0;
    } else {
      return val1 > val2 ? -1 : val1 < val2 ? 1 : 0;
    }
  }
  // console.log(`sortArray with sortKey="${sortKey}" and isAscending=${isAscending}`);
  let arrayCopy = [...array];
  return arrayCopy.sort(comparator);
}

/**
 * Local component that represents a lecture section 
 * @param {props object}: contains one key, lec, to represent lecture object.  
 * @returns 
 */
function Lecture({ lec }) {
  return (
    <div className="lecture">
      <div>{`Section: ${lec.section}`}</div>
      <div>{`First Name: ${lec.first}`}</div>
      <div>{`Last Name: ${lec.last}`}</div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(() => sortArray(lectures, "section", true));
  const [sortKey, setSortKey] = useState("section");
  const [sortMode, setSortMode] = useState("ascending");

  function handleChangeSortMode(event) {
    const newSortMode = event.target.value;
    setSortMode(newSortMode);
    const sortedData = sortArray(
      lectures,
      sortKey,
      newSortMode === "ascending"
    );
    setData(sortedData);
  }

  function dropDownChanged(event) {
    const newSortKey = event.target.value;
    setSortKey(newSortKey);
    const sortedData = sortArray(
      lectures,
      newSortKey,
      sortMode === "ascending"
    );
    // console.log("sortedData is", sortedData);
    setData(sortedData);
  }

  return (
    <div className="App">
      <h1>Simple Sorting App (no tiebreakers)</h1>
      <div className="control">
        <span>Sort by:</span>
        <select value={sortKey} onChange={dropDownChanged}>
          <option value="section">Section</option>
          <option value="first">First Name</option>
          <option value="last">Last Name</option>
        </select>
        <span className="choice">
          <input
            type="radio"
            name="sortMode"
            value="ascending"
            checked={sortMode === "ascending"}
            onChange={handleChangeSortMode}
          />
          Ascending
        </span>
        <span className="choice">
          <input
            type="radio"
            name="sortMode"
            value="descending"
            checked={sortMode === "descending"}
            onChange={handleChangeSortMode}
          />
          Descending
        </span>
      </div>
      {data.map((datum) => (
        <Lecture lec={datum} key={datum.section } />
      ))}
    </div>
  );
}
