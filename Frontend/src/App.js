import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './pages/PrivateRoute';
import Error from "./pages/Error";
import ItemsList from "./pages/ItemsList";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
        <Route path="/*" element={<Error />} />
        <Route path="/list" element={<ItemsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


