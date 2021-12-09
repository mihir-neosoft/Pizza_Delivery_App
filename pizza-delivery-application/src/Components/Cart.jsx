import React, { useEffect, useState } from 'react';
import TopNavBar2 from './TopNavBar2';
import { useNavigate } from 'react-router';
import { deletecartitem, getcartitems } from '../Config/MyService';

export default function Cart() {
    const navigate = useNavigate();
    let total = 0;
    var User_email = sessionStorage.getItem('User_email');
    const [cart, setCart] = useState([]);
    const getCartItem = () => {
        getcartitems({ User_email: User_email }).then(res => {
            if (res.data.err === 0) {
                setCart(res.data.data.User_cart);
            }
        });
    }
    useEffect(() => {
        getCartItem();
        // eslint-disable-next-line
    }, []);

    const handleDeleteItem = (Product_id) => {
        deletecartitem({ User_email: User_email, Product_id: Product_id });
        // getCartItem();
        navigate('/Menu')
    }
    return (
        <div>
            <TopNavBar2 cart={cart.length} />
            <h2>Shopping Cart</h2>
            <table className="table">
                <tbody className="text-center">
                    {cart.map(item =>
                        <tr key={item.Product_id}>
                            <td> <img src={"./Images/Menu/" + item.Product_image} alt="pizza img" height="50rem" /> </td>
                            <td> <h5>{item.Product_name}</h5></td>
                            <td> <h5> <span className="badge badge-light mx-3">₹{item.Product_price}</span></h5> </td>
                            <td> <h5> <input className="form-control" type="number" defaultValue="1" value={item.Product_Quantity} /> </h5> </td>
                            <td> <h5> <span className="badge badge-light mx-3">₹{item.Product_price * item.Product_Quantity}</span></h5><span className="sr-only">{total = total + item.Product_price * item.Product_Quantity}</span> </td>
                            <td className="text-right"> <button onClick={() => handleDeleteItem(item.Product_id)} className="btn btn-dark">Delete</button> </td>
                        </tr>
                    )}
                    {/* <tr key="">
                        <td> <img src="./Images/Menu/AchariDoPyaza.jpg" alt="" height="50rem" /> </td>
                        <td> <h5>Pizza Name</h5></td>
                        <td> <h5> <span className="badge badge-light mx-3">₹399</span></h5> </td>
                        <td> <h5> <input className="form-control" type="number" defaultValue="1" /> </h5> </td>
                        <td> <h5> <span className="badge badge-light mx-3">₹399</span></h5> </td>
                        <td className="text-right"> <button className="btn btn-dark">Delete</button> </td>
                    </tr> */}
                    <tr>
                        <td colSpan="4"> <h4>Total :</h4> </td>
                        <td colSpan="1"> <h4>₹{total}</h4> </td>
                        <td className="text-right" colSpan="1"> <button onClick={() => { sessionStorage.setItem("Cart_price", total); sessionStorage.setItem("Cart_quantity", cart.length); navigate('/Checkout'); }} className="btn btn-dark btn-md">Checkout</button> </td>
                    </tr>
                </tbody>
            </table>
            <hr />

        </div>
    )
}
