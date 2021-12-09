const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    Product_id: { type: Number, required: true, unique: true },
    Product_name: { type: String, required: true, unique: true },
    Product_category: { type: String, required: true },
    Product_price: { type: Number, required: true },
    Product_description: { type: String, required: true },
    Product_image: { type: String, required: true }
});
const ItemSchema = new mongoose.Schema({
    Product_id: { type: Number },
    Product_Quantity: { type: Number },
    Product_name: { type: String },
    Product_price: { type: Number },
    Product_image: { type: String }
});
const OrderSchema = new mongoose.Schema({
    Order_id: { type: Number },
    Order_items: [ItemSchema],
    Order_price: { type: Number },
    Order_date: { type: Date, default: Date.now },
});
const UserSchema = new mongoose.Schema({
    User_email: { type: String, required: true, unique: true },
    User_phone: { type: Number, required: true, unique: true },
    User_name: { type: String, required: true, },
    User_address: { type: String, required: true },
    User_password: { type: String, required: true },
    User_registered: { type: Date, default: Date.now },
    User_cart: [ItemSchema],
    User_orders_ids: [OrderSchema]
});
// Creating model objects
const Menu = mongoose.model('Menu', MenuSchema);
const Users = mongoose.model('Users', UserSchema);
const Cart = mongoose.model('Cart', ItemSchema);
const Order = mongoose.model('Order', OrderSchema);
module.exports = { Menu, Users, Cart, Order };