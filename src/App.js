import "./App.css";
import React, { useState, useEffect } from "react";

import SearchBox from "./components/search-box/search-box.component.jsx";
import CardList from "./components/card-list/card-list.component";

function App() {
  const [searchField, setSearchField] = useState("");
  const [montsters, setMontsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(montsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMontsters(users));
  }, []);

  useEffect(() => {
    const filteredMonsterList = montsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );
    setFilteredMonsters(filteredMonsterList);
  }, [montsters, searchField]);

  const onSearchChange = (event) => {
    let searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
