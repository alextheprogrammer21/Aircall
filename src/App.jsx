import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import Home from "./Pages/Home/Home.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Home />
      <aside style={{ fontSize: "12px", textAlign: "center" }}>
        Click on a call to archive/unarchive it.
      </aside>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
