import React from 'react'
import { useNavigate } from 'react-router';
import TopNavBar from './TopNavBar';

export default function Logout() {
    const navigate = useNavigate();
    sessionStorage.clear();
    return (
        <div>
            <TopNavBar />
            <h2>Logout</h2>
            <button onClick={() => navigate('/')} className="btn btn-outline-dark mx-2 my-sm-0" type="submit">Home</button>

        </div>
    )
}
