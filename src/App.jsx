import "./App.css";
import axios from "axios";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");
  const [mapSrc, setMapSrc] = useState("");

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    try {
      const res = await axios.get(API);

      setLocation(res.data[0]);

      setMapSrc(
        `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${res.data[0].lat},${res.data[0].lon}&size=300>x<300&markers=icon:tiny-red-cutout|${res.data[0].lat},${res.data[0].lon}`
      );
    } catch ({ response }) {
      setMapSrc(`https://http.cat/${response.status}`);
    }
  }

  return (
    <div className="App">
      <h1>City Explorer</h1>
      <form onSubmit={getLocation}>
        <input onChange={handleChange} placeholder="Location" value={search} />
        <button>Get Location</button>
      </form>

      <h2>{`Location: ${location.display_name}`}</h2>
      <p>{`Latitude: ${location.lat}`}</p>
      <p>{`Longitude: ${location.lon}`}</p>
      <img src={mapSrc}></img>
    </div>
  );
}

export default App;
