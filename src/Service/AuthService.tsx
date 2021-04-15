import axios from "axios";

const Login = (token: string) => {
  /*let tokenStr = window.btoa(token + ":" + token)
  let loginResult : any
  let res = await axios.get(`/user/login`, {
    headers: {
      Authorization: "Basic " + token,
      //  'Access-Control-Allow-Origin': '*',
      //  "Content-type": "application/json",
    },
  });
  loginResult = res.data
  //loginResult.token = tokenStr
  return loginResult
  let role = response.data
 */
   return axios.get(`/user/login`, {
    headers: {
      Authorization: "Basic " + token,
      //  'Access-Control-Allow-Origin': '*',
      //  "Content-type": "application/json",
    },
  });


};



export default {
  Login,
};
