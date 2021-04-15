import axios from "axios";
import {User} from "../Type";

const SignUp=(userInfo:User)=>{
    return axios.post(`/user/signup`, userInfo);
}
export default {SignUp,}