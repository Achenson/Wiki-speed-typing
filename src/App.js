import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="outer-container">
        <h3 className="title">Typing App</h3>
        <div className="main-square">
          <div className="counter">
          01:00
          </div>
          <div className="typing-display wiki-display">sfsdfsd</div>
          <div className="typing-display current-display">sfsdfsd</div>

          <div className="control-buttons">
          
          <button className="btn-control">Start</button>
          <button className="btn-control">Pause</button>
          <button className="btn-control">Reset</button>


          </div>


        </div>
      </div>
    </div>
  );
}




export default App;
