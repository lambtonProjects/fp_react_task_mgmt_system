import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import ListTask from "./pages/ListTask";
import ListUsers from "./pages/ListUsers";
import PrivateRoute from './pages/PrivateRoute';
import Error from "./pages/Error";
import ItemsList from "./pages/ItemsList";
import AddProject from "./pages/AddProject";
import AddUser from "./pages/AddUser";
import AddTask from "./pages/AddTask";

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
        <Route path="/listTask" element={<ListTask />} />
        <Route path="/listUsers" element={<ListUsers />} />
        <Route path="/list" element={<ItemsList />} />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/addTask" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


