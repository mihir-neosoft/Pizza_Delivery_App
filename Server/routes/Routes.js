const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// db connection
const db = "mongodb://localhost:27017/pizzashop";
const connect_db = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB Connected.");
    } catch (err) { console.log(err.message); }
}
connect_db();
// schema 
const DATA = require('../db/categorySchema');

// regex for server side validation
const regForUser_name = RegExp("^[a-zA-Z]+\\s[a-zA-Z]+$");
const regForUser_phone = RegExp('^((\\+91-?)|0)?[0-9]{10}$');
const regForUser_address = RegExp("^[a-zA-Z0-9\\s,.'-/]{7,}$");
const regForUser_email = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$");
const regForUser_password = RegExp("^[a-zA-Z0-9@*!&%$]{8,15}");

// Routes
router.post("/addmenuitem", (req, res) => {
    let Product_id = req.body.Product_id;
    let Product_name = req.body.Product_name;
    let Product_category = req.body.Product_category;
    let Product_price = req.body.Product_price;
    let Product_description = req.body.Product_description;
    let Product_image = req.body.Product_image;
    let errors = {
        Product_id: "",
        Product_name: "",
        Product_category: "",
        Product_price: "",
        Product_description: "",
        Product_image: "",
    }
    // regex validation
    // if (!regForProduct_id.test(Product_id)) { errors.Product_id = "Error in Product_id"; }
    // if (!regForProduct_name.test(Product_name)) { errors.Product_name = "Error in Product_name"; }
    // if (!regForProduct_category.test(Product_category)) { errors.Product_category = "Error in Product_category"; }
    // if (!regForProduct_price.test(Product_price)) { errors.Product_price = "Error in Product_price"; }
    // if (!regForProduct_description.test(Product_description)) { errors.Product_description = "Error in Product_description"; }
    // if (!regForProduct_image.test(Product_image)) { errors.Product_image = "Error in Product_image"; }

    if (
        errors.Product_id === "" &&
        errors.Product_name === "" &&
        errors.Product_category === "" &&
        errors.Product_price === "" &&
        errors.Product_description === "" &&
        errors.Product_image === ""
    ) {
        let insertdata = new DATA.Menu({
            Product_id: Product_id,
            Product_name: Product_name,
            Product_category: Product_category,
            Product_price: Product_price,
            Product_description: Product_description,
            Product_image: Product_image,
        });
        insertdata.save((err) => {
            if (err) { res.send(errors); }
            else { res.send("menu item added."); }
        });
    } else { res.send(errors); }
});
router.get('/getmenuitems', (req, res) => {
    DATA.Menu.find({}, (err, data) => {
        if (err) throw err;
        else { res.json({ "err": 0, "data": data }); }
    });
});
router.post("/adduser", (req, res) => {
    let User_id = req.body.User_id;
    let User_email = req.body.User_email;
    let User_phone = req.body.User_phone;
    let User_name = req.body.User_name;
    let User_address = req.body.User_address;
    let User_password = req.body.User_password;
    let User_cpassword = req.body.User_cpassword;
    let errors = {
        User_id: "",
        User_email: "",
        User_phone: "",
        User_name: "",
        User_address: "",
        User_password: "",
    }
    // regex validation
    if (!regForUser_email.test(User_email)) { errors.User_email = "Error in User_email"; }
    if (!regForUser_phone.test(User_phone)) { errors.User_phone = "Error in User_phone"; }
    if (!regForUser_name.test(User_name)) { errors.User_name = "Error in User_name"; }
    if (!regForUser_address.test(User_address)) { errors.User_address = "Error in User_address"; }
    if (!regForUser_password.test(User_password)) { errors.User_password = "Error in User_password"; }
    if (
        errors.User_id === "" &&
        errors.User_email === "" &&
        errors.User_phone === "" &&
        errors.User_name === "" &&
        errors.User_address === "" &&
        errors.User_password === ""
    ) {
        let insertdata = new DATA.Users({
            User_id: User_id,
            User_email: User_email,
            User_phone: User_phone,
            User_name: User_name,
            User_address: User_address,
            User_password: User_password,
            User_cart: [],
            User_orders_ids: [{
                Order_id: 1,
                Order_items: [{
                    Product_id: 1,
                    Product_Quantity: 2
                }, {
                    Product_id: 2,
                    Product_Quantity: 1
                }],
                Order_price: 1200
            }]
        });
        // console.log(User_id, User_email, User_phone, User_name, User_address, User_password, User_cpassword);
        insertdata.save((err) => {
            if (err) { res.send(err); }
            else {
                console.log(insertdata);
                res.send("User Added.");
            }
        });
    } else { res.send(errors); }
});
router.post("/updateuser", (req, res) => {
    let User_email = req.body.User_email;
    let User_phone = req.body.User_phone;
    let User_name = req.body.User_name;
    let User_address = req.body.User_address;
    let User_password = req.body.User_password;
    let User_cpassword = req.body.User_cpassword;
    let errors = {
        User_email: "",
        User_phone: "",
        User_name: "",
        User_address: "",
        User_password: "",
    }
    console.log(User_email, User_phone, User_name, User_address, User_password, User_cpassword);

    // regex validation
    if (!regForUser_email.test(User_email)) { errors.User_email = "Error in User_email"; }
    if (!regForUser_phone.test(User_phone)) { errors.User_phone = "Error in User_phone"; }
    if (!regForUser_name.test(User_name)) { errors.User_name = "Error in User_name"; }
    if (!regForUser_address.test(User_address)) { errors.User_address = "Error in User_address"; }
    if (!regForUser_password.test(User_password)) { errors.User_password = "Error in User_password"; }

    if (
        errors.User_email === "" &&
        errors.User_phone === "" &&
        errors.User_name === "" &&
        errors.User_address === "" &&
        errors.User_password === ""
    ) {
        DATA.Users.updateOne({ User_email: User_email }, {
            $set: {
                User_phone: User_phone,
                User_name: User_name,
                User_address: User_address,
                User_password: User_password
            }
        }, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log("user Updated");
                res.json({ "err": 0, "msg": "user Updated." });
            }
        });
    } else { res.send(errors); }
});
router.post("/login", (req, res) => {
    let User_email = req.body.User_email;
    let User_password = req.body.User_password;
    let errors = { User_email: "", User_password: "" }
    // regex validation
    if (!regForUser_email.test(User_email)) { errors.User_email = "Error in User_email"; }
    if (!regForUser_password.test(User_password)) { errors.User_password = "Error in User_password"; }

    if (errors.User_email === "" && errors.User_password === "") {
        DATA.Users.findOne({ User_email: User_email, User_password: User_password }, (err, data) => {
            if (err) {
                console.log(err);
                res.json({ "err": 1, "msg": "Email or password is incorrect" });
            }
            else if (data == null) {
                res.json({ "err": 1, "msg": "Email or password is incorrect" });
            }
            else {
                console.log(User_email, User_password);
                res.json({ "err": 0, "msg": "Login Success" });
            }
        })
    } else { res.send(errors); }
});
router.post("/addtocart", (req, res) => {
    let User_email = req.body.User_email;
    let Product_id = req.body.Product_id;
    let Product_name = req.body.Product_name;
    let Product_price = req.body.Product_price;
    let Product_image = req.body.Product_image;
    let Product_Quantity = req.body.Product_Quantity;

    console.log(User_email, Product_id, Product_Quantity, Product_name, Product_price, Product_image);
    let errors = { Product_id: "", Product_Quantity: "", }
    if (errors.Product_id === "" && errors.Product_Quantity === "") {
        let updatecart = new DATA.Cart({
            Product_id: Product_id,
            Product_name: Product_name,
            Product_price: Product_price,
            Product_image: Product_image,
            Product_Quantity: Product_Quantity
        });
        DATA.Users.updateOne({ User_email: User_email }, { $push: { User_cart: updatecart } }, (err) => {
            if (err) {
                res.json({ "err": 1, "msg": err });
            }
            else {

                res.json({ "err": 0, "msg": "Item Added." });
            }
        });
    } else { res.send(errors); }
});
router.post("/deletecartitem", (req, res) => {
    let User_email = req.body.User_email;
    let Product_id = req.body.Product_id;

    console.log(User_email, Product_id);
    let errors = { Product_id: "" }
    if (errors.Product_id === "") {
        DATA.Users.updateOne({ User_email: User_email }, { $pull: { User_cart: { Product_id: Product_id } } }, (err, data) => {
            console.log(data);
            console.log(err);
        });
    } else { res.send(errors); }
});
router.post('/getcartitems', (req, res) => {
    let User_email = req.body.User_email;
    DATA.Users.findOne({ User_email: User_email }, (err, data) => {
        if (err) throw err;
        else { res.json({ "err": 0, "data": data }); }
    });
});
router.post('/ordersuccess', (req, res) => {
    let User_email = req.body.User_email;
    let Card_Number = req.body.Card_Number;
    let Card_Holder_Name = req.body.Card_Holder_Name;
    let Cart_Quantity = req.body.Cart_Quantity;
    let Cart_Price = req.body.Cart_Price;
    const HTML_OUTPUT = `
    <h2>Order Confirmation</h2>
    <hr />
    <h5>Hello ${Card_Holder_Name},</h5>
    <p>your order has been placed and will arrive soon.</p>
    <p>Thank You.</p>
    <hr />
    <h5>Order Details :-</h5>
    <table>
        <tr>
            <th>Total Items Ordered</th>
            <td>${Cart_Quantity} Pizza</td>
        </tr>
        <tr>
            <th>Total Order Value</th>
            <td>₹${Cart_Price}</td>
        </tr>
    </table>
    <hr />
    <h5>Order Details :-</h5>
    <table>
        <tr>
            <th>Card Number </th>
            <td>${Card_Number}</td>
        </tr>
        <tr>
            <th>Card Holder Name</th>
            <td>${Card_Holder_Name}</td>
        </tr>
    </table>
    <hr />
    `;
    const TEXT_OUTPUT = `
Order Confirmation
-------------------------------------------------
Hello ${Card_Holder_Name},
your order has been placed and will arrive soon.
Thank You.
-------------------------------------------------
Order Details :-
Total Items Ordered :  ${Cart_Quantity} Pizza
Total Order Value	:  ₹${Cart_Price}
-------------------------------------------------
Order Details :-
Card Number	     :  ${Card_Number}
Card Holder Name :	${Card_Holder_Name}
-------------------------------------------------
    `;
    async function sendmail() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'odessa.king86@ethereal.email', // generated ethereal user
                pass: '8cz8YkGskwY9nQTEY7', // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"NodeMailer" <nodemailer@ethereal.email>', // sender address
            to: User_email, // list of receivers
            subject: "Order Success", // Subject line
            text: TEXT_OUTPUT, // plain text body
            html: HTML_OUTPUT, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    sendmail().catch(console.error);
    res.json({ msg: "Email Sent" });
})
module.exports = router;