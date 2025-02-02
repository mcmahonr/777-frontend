import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/api/data/${category}`);
        const response = await axios.get(`https://seven-seven-seven-30e52711822b.herokuapp.com/api/data/${category}`);
        setData(response.data.entries || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category]);

  /*
  const filteredData = data.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ); */

  const filteredData = data.filter((entry) =>
  Object.entries(entry).some(([key, value]) =>
    key !== 'description' && // Exclude the description field
    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  return (
    <div className="App">
      <h1>777 Explorer</h1>
      <div className="controls">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Planets">Planets</option>
          <option value="Zodiac Signs">Zodiac Signs</option>
          <option value="Elements">Elements</option>
          <option value="Hebrew Letters">Hebrew Letters</option>
          <option value="Tarot Cards (Major Arcana)">Tarot Cards (Major Arcana)</option>
          <option value="Tarot Cards (Minor Arcana - Wands)">Tarot Cards (Minor Arcana - Wands)</option>
          <option value="Tarot Cards (Minor Arcana - Cups)">Tarot Cards (Minor Arcana - Cups)</option>
          <option value="Tarot Cards (Minor Arcana - Swords)">Tarot Cards (Minor Arcana - Swords)</option>
          <option value="Tarot Cards (Minor Arcana - Disks)">Tarot Cards (Minor Arcana - Disks)</option>
          <option value="Numbers">Numbers</option>
          <option value="Geometric Figures">Geometric Figures</option>
          <option value="Gods and Goddesses">Gods and Goddesses</option>
          <option value="Angels and Spirits">Angels and Spirits</option>
          {/* Add more categories as needed */}
        </select>
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card-container">
        {filteredData.map((entry, index) => (
          <div key={index} className="card">
            {Object.entries(entry).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {value.toString()}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;