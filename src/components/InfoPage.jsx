import React from "react";

export default function InfoPage({ infoLocation, mapSrc }) {
  const { display_name, lat, lon } = infoLocation;
  return (
    <div className="InfoPage">
      <h2>{`Location: ${display_name}`}</h2>
      <p>{`Latitude: ${lat}`}</p>
      <p>{`Longitude: ${lon}`}</p>
      <img src={mapSrc}></img>
    </div>
  );
}
