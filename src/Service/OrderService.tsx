import axios from "axios";
import {Order} from "../Type";

const CreateOrder=(order:Order)=>{
    return axios.post('/order',order);
}

const UpdateOrder=(order:Order)=>{
    return axios.put(`/order`, order);
}

//will delete this method later
const FindOrderByCustomerAndStatus=()=>{
    return axios.get<Order[]>(`/order/active`);
}

const FindOrderByUserEmail=()=>{
    return axios.get<Order[]>(`/order`)
}
export default {
    CreateOrder,
    UpdateOrder,
    FindOrderByCustomerAndStatus,
    FindOrderByUserEmail,
}