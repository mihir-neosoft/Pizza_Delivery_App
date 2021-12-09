import React, { useState, useEffect } from 'react'
import { getcartitems, updateuser } from '../Config/MyService';
import TopNavBar2 from './TopNavBar2'
import { useNavigate } from 'react-router';

const regForUser_name = RegExp("^[a-zA-Z]+\\s[a-zA-Z]+$");
const regForUser_phone = RegExp('^((\\+91-?)|0)?[0-9]{10}$');
const regForUser_address = RegExp("^[a-zA-Z0-9\\s,.'-/]{7,}$");
const regForUser_email = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$");
const regForUser_password = RegExp("^[a-zA-Z0-9@*!&%$]{8,15}");

export default function Profile() {
    const navigate = useNavigate();
    var User_email = sessionStorage.getItem('User_email');
    const [data, setData] = useState({ User_name: "", User_phone: "", User_address: "", User_email: "", User_password: "", User_cpassword: "", User_cart: [] });
    const [verror, setVerror] = useState({ User_name: "", User_phone: "", User_address: "", User_email: "", User_password: "", User_cpassword: "", });
    useEffect(() => {
        getcartitems({ User_email: User_email }).then(res => {
            if (res.data.err === 0) {
                // console.log(res.data.data);
                setData(res.data.data);
            }
        });
        // eslint-disable-next-line
    }, []);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "User_name":
                setVerror({ ...verror, [name]: regForUser_name.test(value) ? "" : 'Enter a Valid Name (FirstNane LastName)' })
                break;
            case "User_phone":
                setVerror({ ...verror, [name]: regForUser_phone.test(value) ? "" : 'Enter a Valid Phone number' })
                break;
            case "User_address":
                setVerror({ ...verror, [name]: regForUser_address.test(value) ? "" : 'Enter a Valid Address' })
                break;
            case "User_email":
                setVerror({ ...verror, [name]: regForUser_email.test(value) ? "" : 'Enter a Valid Email' })
                break;
            case "User_password":
                setVerror({ ...verror, [name]: regForUser_password.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            case "User_cpassword":
                setVerror({ ...verror, [name]: data.User_password === value ? "" : 'Password Not Matched)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.User_name === "" && errors.User_phone === "" && errors.User_address === "" && errors.User_email === "" && errors.User_password === "" && errors.User_cpassword === "") ? true : false;
        return validate;

    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.User_name !== "" && data.User_phone !== "" && data.User_address !== "" && data.User_email !== "" && data.User_password !== "" && data.User_cpassword !== "") {
                updateuser(data).then(res => {
                    if (res.data.err === 0) {
                        alert(res.data.msg);
                        navigate('/Menu');
                    }
                    if (res.data.err === 1) {
                        alert(res.data.msg);
                    }
                });
                navigate('/Login');
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }
    return (
        <div>
            <TopNavBar2 cart={data.User_cart.length} />
            <h2>profile</h2>
            <form method="post" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <input defaultValue={data.User_name} onChange={handleInputChange} name="User_name" type="text" className="form-control" placeholder="Enter Name" />
                    {verror.User_name.length > 0 && <span className="errorspan">{verror.User_name}</span>}
                </div>
                <div className="form-group">
                    <input defaultValue={data.User_phone} onChange={handleInputChange} name="User_phone" type="number" className="form-control" placeholder="Enter Contact Number" />
                    {verror.User_phone.length > 0 && <span className="errorspan">{verror.User_phone}</span>}
                </div>
                <div className="form-group">
                    <input defaultValue={data.User_address} onChange={handleInputChange} name="User_address" type="text" className="form-control" placeholder="Enter Delivery Address" />
                    {verror.User_address.length > 0 && <span className="errorspan">{verror.User_address}</span>}
                </div>
                <div className="form-group">
                    <input disabled defaultValue={data.User_email} onChange={handleInputChange} name="User_email" type="email" className="form-control" placeholder="Enter email" />
                    {verror.User_email.length > 0 && <span className="errorspan">{verror.User_email}</span>}
                </div>
                <div className="form-group">
                    <input defaultValue={data.User_password} onChange={handleInputChange} name="User_password" type="password" className="form-control" placeholder="Enter Password" />
                    {verror.User_password.length > 0 && <span className="errorspan">{verror.User_password}</span>}
                </div>
                <div className="form-group">
                    <input onChange={handleInputChange} name="User_cpassword" type="password" className="form-control" placeholder="Confirm Password" />
                    {verror.User_cpassword.length > 0 && <span className="errorspan">{verror.User_cpassword}</span>}
                </div>
                <button type="submit" className="btn btn-dark">Update</button>
            </form>
        </div>
    )
}
