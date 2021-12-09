import React from 'react'
import { useNavigate } from 'react-router';

export default function TopNavBar2(props) {
    const navigate = useNavigate();
    return (
        <div className="">
            <nav className="navbar navbar-light bg-light justify-content-between">
                <img src="./Images/Brand-Logo.png" width="100" height="100" class="d-inline-block align-top" alt="" />
                <form className="form-inline nav-item">
                    <button onClick={()=>navigate('/Menu')} className="btn btn-light mx-2 my-sm-0" type="submit">Menu</button>
                    <button onClick={()=>navigate('/Cart')} className="btn btn-light mx-2 my-sm-0" type="submit">Cart <span class="badge badge-dark"> {props.cart} </span> </button>
                    <button onClick={()=>navigate('/Profile')} className="btn btn-light mx-2 my-sm-0" type="submit">Profile</button>
                    <button onClick={()=>navigate('/Logout')} className="btn btn-outline-dark mx-2 my-sm-0" type="submit">Logout</button>
                </form>
            </nav>
            <br />
        </div>
    )
}
