import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./components/HomePage";
import MyCalender from "./components/Calender";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/calender" element={<MyCalender/>}/>
          </Routes>
        </div>
      </header>

    </div>
  );
}

export default App;
