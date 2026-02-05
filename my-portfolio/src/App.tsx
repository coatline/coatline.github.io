import React from "react";
import Physics from "./Physics";

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <div id="bg-canvas-layer"></div>
      
      <Physics />
      
      {/* <nav className="overlay-nav">
        <span>Coatline Studios</span>
      </nav> */}
    </div>
  );
};

export default App;