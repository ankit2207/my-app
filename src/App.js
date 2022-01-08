import { useState, useEffect } from 'react';
import './App.css';

function SearchBox({ searchItems }) {
  return (
    <div style={{ padding: 20 }}>
      <input
        type='text'
        name='search'
        placeholder='Search...'
        onChange={e => searchItems(e.target.value)}
      />
    </div>
  )
}

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/`)
      .then((response) => response.json())
      .then(setData);
  }, []);

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
      const filteredData = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  };

    return (
      <>
        <SearchBox searchItems={searchItems} />
        {searchInput.length > 1 ? (
          filteredResults && filteredResults.map((item) => {
            return (
              <div>
                <ul>
                  <li key={item.id}>
                    <span>{item.name}</span>
                  </li>
                </ul>
              </div>
            )
          })
        ) : (
          data && data.map((item) => {
            return (
              <div>
                <ul>
                  <li key={item.id}>
                    <span>{item.name}</span>
                  </li>
                </ul>
              </div>
            )
          })
        )
        }
      </>
    )
}

export default App;
