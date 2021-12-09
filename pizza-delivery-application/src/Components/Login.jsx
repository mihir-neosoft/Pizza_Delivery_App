import React, { useState } from 'react';
import { login } from '../Config/MyService';
import TopNavBar from './TopNavBar';
import { useNavigate } from 'react-router';

//RegEx for Validation
const regForUser_email = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const regForUser_password = RegExp('^[a-zA-Z0-9@*!&%$]{8,15}$');

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ User_email: "", User_password: "" });
    const [verror, setVerror] = useState({ User_email: "", User_password: "" });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "User_email":
                setVerror({ ...verror, [name]: regForUser_email.test(value) ? "" : 'Enter a Valid Email' })
                break;
            case "User_password":
                setVerror({ ...verror, [name]: regForUser_password.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.User_email === "" && errors.User_password === "") ? true : false;
        return validate;

    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.User_email !== "" && data.User_password !== "") {
                console.log(data);
                login(data).then(res => {
                    if (res.data.err === 0) {
                        console.log(res.data);
                        sessionStorage.setItem('User_email', data.User_email);
                        navigate('/Menu');
                    }
                    if (res.data.err === 1) { alert(res.data.msg); }
                });
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Email and Password"); }
    }
    return (
        <div className="">
            <TopNavBar />
            <h2>Login</h2>
            <form method="post" onSubmit={handleFormSubmit}>
                <div class="form-group">
                    <input type="email" onChange={handleInputChange} name="User_email" class="form-control" placeholder="Enter email" />
                    {verror.User_email.length > 0 && <span className="errorspan">{verror.User_email}</span>}
                </div>
                <div class="form-group">
                    <input type="password" onChange={handleInputChange} name="User_password" class="form-control" placeholder="Enter Password" />
                    {verror.User_password.length > 0 && <span className="errorspan">{verror.User_password}</span>}
                </div>
                <button type="submit" class="btn btn-dark">Login</button>
            </form>

        </div>
    )
}
