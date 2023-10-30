import React from "react";

export default function ErrorPage({ errorDetails }) {
  return (
    <div className="ErrorPage">
      <h2>An Error Occured!</h2>
      <h3>Enter a Valid Location or Try Again</h3>
      <img src={`https://http.cat/${errorDetails.status}`} />
    </div>
  );
}
