import "./App.css";
import axios from "axios";
import { useState } from "react";
import InfoPage from "./components/InfoPage";
import ErrorPage from "./components/ErrorPage";
import DefaultComponent from "./components/DefaultComponent";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");
  const [mapSrc, setMapSrc] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorComponent, setErrorComponent] = useState(null);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    try {
      const res = await axios.get(API);

      setHasError(false);
      setLocation(res.data[0]);
      setMapSrc(
        `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${res.data[0].lat},${res.data[0].lon}&size=300>x<300&markers=icon:tiny-red-cutout|${res.data[0].lat},${res.data[0].lon}`
      );
    } catch ({ response }) {
      setHasError(true);
      setErrorComponent(() => <ErrorPage errorDetails={response}></ErrorPage>);
    }
  }

  return (
    <div className="App">
      <div className="Header">
        <h1>City Explorer</h1>
        <form onSubmit={getLocation}>
          <input
            onChange={handleChange}
            placeholder="Location"
            value={search}
          />
          <button>Get Location</button>
        </form>
      </div>

      <div className="Main">
        {hasError ? (
          errorComponent
        ) : Object.keys(location).length === 0 ? (
          <DefaultComponent></DefaultComponent>
        ) : (
          <InfoPage infoLocation={location} mapSrc={mapSrc}></InfoPage>
        )}
      </div>
    </div>
  );
}

export default App;
