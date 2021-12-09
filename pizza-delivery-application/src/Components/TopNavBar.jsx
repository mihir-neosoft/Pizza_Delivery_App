import React from 'react';
import { useNavigate } from 'react-router';

export default function TopNavBar() {
    const navigate = useNavigate();
    return (
        <div className="">
            <nav className="navbar navbar-light bg-light justify-content-between">
                <img src="./Images/Brand-Logo.png" width="100" height="100" class="d-inline-block align-top" alt="" />
                <form className="form-inline">
                    <button className="btn btn-outline-dark mx-2 my-sm-0" onClick={()=>navigate('/SignUp')} type="submit">Sign Up</button>
                    <button className="btn btn-outline-dark mx-2 my-sm-0" onClick={()=>navigate('/Login')} type="submit">Login</button>
                </form>
            </nav>
            <br />
        </div>
    )
}