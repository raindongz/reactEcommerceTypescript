import axios from "axios";

const hasActiveOrder=()=>{
    return axios.get(`/user`);
}

export default {
    hasActiveOrder,
}