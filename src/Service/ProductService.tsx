import axios from "axios";
import {Product} from "../Type";

const getAllProducts=()=>{
    return axios.get(`/product`);
}
const AddNewProduct=(product:Product)=>{
    return axios.post(`/product`, product);
}
const UpdateProduct=(product:Product)=>{
    return axios.put(`/product`,product);
}
const DeleteProduct=(productId:string)=>{
    return axios.delete(`/product/${productId}`)
}
const GetProduct=(productId:string)=>{
    return axios.get(`/product/${productId}`)
}
export default {
    getAllProducts,
    AddNewProduct,
    DeleteProduct,
    UpdateProduct,
    GetProduct,
}