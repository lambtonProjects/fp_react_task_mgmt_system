import React, { useState } from "react";
import ReactDOM from "react-dom";
import MyNavbar from "./MyNavbar";

function Dashboard() {
    return(
        <div>
            <MyNavbar />
            <h3>Dasboard Protected</h3>
        </div>
    )
}

export default Dashboard;
