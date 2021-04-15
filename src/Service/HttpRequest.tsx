import axios from "axios";
import store from "../index";
import {get} from "http";

/*export default axios.create({
    baseURL: "http://localhost:8080",
  //  headers: {
    //"Content-type": "application/json",
     //  'Access-Control-Allow-Origin': '*',
  //  }
});
 */
/*
const HttpRequest=()=>{
    const defaultOptions={
        baseURL: "http://localhost:8080",
        headers:{
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json",
        }
    }
    let instance=axios.create(defaultOptions);

    instance.interceptors.request.use(function (config){
        const token=store.getState().authReducer[0].token;
        config.headers.Authorization= token ? `Basic ${token}` : '';
        return config;
    })
}
export default HttpRequest;

 */