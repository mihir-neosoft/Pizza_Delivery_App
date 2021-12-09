import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import { addtocart, getcartitems, getmenuitems } from '../Config/MyService';
import TopNavBar2 from './TopNavBar2';

export default function Menu() {
    // const navigate = useNavigate();
    var User_email = sessionStorage.getItem('User_email');
    const [menu, setMenu] = useState([]);
    const [data, setData] = useState({ User_name: "", User_phone: "", User_address: "", User_email: "", User_password: "", User_cpassword: "", User_cart: [] });
    useEffect(() => {
        getmenuitems().then(res => {
            if (res.data.err === 0) {
                setMenu(res.data.data)
            }
        });
        getcartitems({ User_email: User_email }).then(res => {
            if (res.data.err === 0) {
                // console.log(res.data.data);
                setData(res.data.data);
            }
        });
        // eslint-disable-next-line
    }, []);
    const handleAddCart = (item) => {
        // console.log(item);
        addtocart({
            User_email: User_email,
            Product_id: item.Product_id,
            Product_name: item.Product_name,
            Product_price: item.Product_price,
            Product_image: item.Product_image,
            Product_Quantity: 1
        }).then(res => {
            if (res.data.err === 0) {
                alert(res.data.msg);
            }
            if (res.data.err === 1) {
                alert(res.data.msg);
            }
        })
    }
    return (
        <div>
            <TopNavBar2 cart={data.User_cart.length} />
            <h2>Menu</h2>
            <div className="row">
                {menu.map(item =>
                    <div className="col-lg-4 col-md-6  my-2" key={item.Product_id}>
                        <div className="card text-center" style={{ width: "22rem" }}>
                            <img class="card-img-top" src={"./Images/Menu/" + item.Product_image} alt={"./Images/Menu/" + item.Product_image} height="250px" />
                            <div className="card-body">
                                <h5 className="card-title">{item.Product_name}</h5>
                                <h4><button type="button" onClick={() => handleAddCart(item)} class="btn btn-dark mx-2">Add to Cart</button>
                                    <span class="badge badge-light mx-3">₹{item.Product_price}</span></h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
