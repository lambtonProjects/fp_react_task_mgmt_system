import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    let navigate = useNavigate(); 
    const handleLogout = () => {
        localStorage.clear();
        redirect()
    }

    const redirect = () => {
        navigate('/login', { replace: true });
    }

    return(
        <div>
            <h3>Dasboard Protected</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;
