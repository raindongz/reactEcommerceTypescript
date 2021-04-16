import axios from "axios";
import {Product} from "../Type";
import {Category} from "../Enums/Category";

const getAllProducts=()=>{
    return axios.get(`/product`);
}
const AddNewProduct= (product: { quantity: number; cost: number; pictureURL: string; description: string; id: string; category: Category; retailPrice: number; productName: string })=>{
    return axios.post(`/product`, product);
}
const UpdateProduct= (product: { quantity: unknown; cost: unknown; pictureURL: string; description: unknown; id: any; category: Category; retailPrice: unknown; productName: unknown })=>{
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