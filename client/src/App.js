import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import PridetiDalyvi from "./components/add-dalyvis.component";
import Dalyvis from "./components/dalyvis.component";
import DalyviuSarasas from "./components/dalyviai-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <Link to={"/dalyviai"} className="navbar-brand">
            Renginio sistema
            </Link>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/dalyviai"} className="nav-link">
                  Dalyviai
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/registruoti"} className="nav-link">
                  Registruoti
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<DalyviuSarasas/>} />
            <Route path="/dalyviai" element={<DalyviuSarasas/>} />
            <Route path="/registruoti" element={<PridetiDalyvi/>} />
            <Route path="/dalyviai/:id" element={<Dalyvis/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;