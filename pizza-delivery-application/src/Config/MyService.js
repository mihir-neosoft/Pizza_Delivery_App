import axios from 'axios';
import { MAIN_URL } from '../Config/URL';

export function getmenuitems() {
    return axios.get(`${MAIN_URL}/getmenuitems`);
}
export function addmenuitem(data) {
    return axios.post(`${MAIN_URL}/addmenuitem`, data);
}
export function adduser(data) {
    return axios.post(`${MAIN_URL}/adduser`, data);
}
export function updateuser(data) {
    return axios.post(`${MAIN_URL}/updateuser`, data);
}
export function login(data) {
    return axios.post(`${MAIN_URL}/login`, data);
}
export function addtocart(data) {
    return axios.post(`${MAIN_URL}/addtocart`, data);
}
export function deletecartitem(data) {
    return axios.post(`${MAIN_URL}/deletecartitem`, data);
}
export function getcartitems(data) {
    return axios.post(`${MAIN_URL}/getcartitems`, data);
}
export function ordersuccess(data) {
    return axios.post(`${MAIN_URL}/ordersuccess`, data);
}