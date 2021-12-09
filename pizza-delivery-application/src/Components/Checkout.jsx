import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ordersuccess } from '../Config/MyService';
import TopNavBar2 from './TopNavBar2';

const regForCard_Number = RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
const regForCard_CVV = RegExp("^[0-9]{3,4}$");
const regForCard_Holder_Name = RegExp("^[a-zA-Z]+\\s[a-zA-Z]+$");

export default function Checkout() {
    const navigate = useNavigate();
    let Cart_quantity = sessionStorage.getItem("Cart_quantity");
    let Cart_price = sessionStorage.getItem("Cart_price");
    let User_email = sessionStorage.getItem('User_email');
    const [data, setData] = useState({ Card_Number: "", Card_CVV: "", Card_Expiry: "", Card_Holder_Name: "", Cart_Quantity: Cart_quantity, Cart_Price: Cart_price, User_email:User_email });
    const [verror, setVerror] = useState({ Card_Number: "", Card_CVV: "", Card_Expiry: "", Card_Holder_Name: "", });
    // Card_Number
    // Card_CVV
    // Card_Expiry
    // Card_Holder_Name
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "Card_Number":
                setVerror({ ...verror, [name]: regForCard_Number.test(value) ? "" : 'Enter a Valid Visa Card Number (4155279860457)' })
                break;
            case "Card_CVV":
                setVerror({ ...verror, [name]: regForCard_CVV.test(value) ? "" : 'Enter a Valid CVV Number (3/4 digit) (561)' })
                break;
            case "Card_Holder_Name":
                setVerror({ ...verror, [name]: regForCard_Holder_Name.test(value) ? "" : 'Enter a Valid Name (FirstNane LastName)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.Card_Number === "" && errors.Card_CVV === "" && errors.Card_Expiry === "" && errors.Card_Holder_Name === "") ? true : false;
        return validate;

    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.Card_Number !== "" && data.Card_CVV !== "" && data.Card_Expiry !== "" && data.Card_Holder_Name !== "") {
                // console.log(data);
                ordersuccess(data);
                navigate('/OrderSuccess');
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    }
    return (
        <div>
            <TopNavBar2 cart={Cart_quantity} />
            <h2>Checkout</h2>

            <div className="card my-4">
                <div className="card-header">
                    <h5>Order Details</h5>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <tr>
                            <th>Total Items Added</th>
                            <td>{Cart_quantity} Pizza</td>
                        </tr>
                        <tr>
                            <th>Total Cart Value</th>
                            <td>₹ {Cart_price}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="card my-4">
                <div className="card-header">
                    <h5>Card Details</h5>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label for="Card_Number">Card Number</label>
                            <input onChange={handleInputChange} name="Card_Number" type="number" className="form-control" id="Card_Number" placeholder="Enter Credit/Debit Card" />
                            {verror.Card_Number.length > 0 && <span className="errorspan">{verror.Card_Number}</span>}
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <label for="Card_CVV">CVV</label>
                                <input onChange={handleInputChange} name="Card_CVV" id="Card_CVV" type="number" className="form-control" placeholder="Enter CVV" />
                                {verror.Card_CVV.length > 0 && <span className="errorspan">{verror.Card_CVV}</span>}
                            </div>
                            <div className="col">
                                <label for="Card_Expiry">Expiry Date</label>
                                <input onChange={handleInputChange} name="Card_Expiry" id="Card_Expiry" type="month" className="form-control" />
                                {verror.Card_Expiry.length > 0 && <span className="errorspan">{verror.Card_Expiry}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="Card_Holder_Name">Card Holder Name</label>
                            <input onChange={handleInputChange} name="Card_Holder_Name" type="text" className="form-control" id="Card_Holder_Name" placeholder="Enter Card Holder Name" />
                            {verror.Card_Holder_Name.length > 0 && <span className="errorspan">{verror.Card_Holder_Name}</span>}
                        </div>
                        <button type="submit" className="btn btn-dark btn-lg btn-block">Pay ₹{Cart_price}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
