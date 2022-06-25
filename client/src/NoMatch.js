import React from "react";
import "./NoMatch.scss";

function NoMatch() {
  return (
    <div className="no_match-wrapper">
      <div className="container">
        <div className="no_match">
          <img src="http://localhost:5000/resource/Logo/404-logo.jpeg" alt="" />
          <div className="no_match-text">
            <h2>AWWW...DON’T CRY.</h2>
            <p>It's just a 404 Error!</p>
            <p>
              What you’re looking for may have been misplaced in Long Term
              Memory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;
