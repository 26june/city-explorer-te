import React from "react";

export default function InfoPage({ infoLocation, mapSrc, weather }) {
  console.log(weather);
  const { display_name, lat, lon } = infoLocation;
  return (
    <div className="InfoPage">
      <h2>{`Location: ${display_name}`}</h2>
      <p>{`Latitude: ${lat}`}</p>
      <p>{`Longitude: ${lon}`}</p>

      <div>
        <h2>Weather Data:</h2>
        {weather?.map((e, index) => {
          return (
            <div key={index}>
              <p>
                city_name:{e.city_name}, Weather: {e.weather.description}
              </p>
            </div>
          );
        })}
      </div>
      <img src={mapSrc}></img>
    </div>
  );
}
