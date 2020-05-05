import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App ">
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
