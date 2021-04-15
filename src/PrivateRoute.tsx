import React, {useEffect, useState} from 'react';
import { Route,RouteProps,Redirect } from 'react-router-dom';
import { useSelector} from "react-redux";
import {role} from "./Type";

const selectUserInfo=(state:any)=>state.authReducer.map((authInfo:role)=>authInfo);
const PrivateRoute:React.FC<RouteProps>= ({ component: Component, ...rest }) =>{
     const userInfo:role[]=useSelector(selectUserInfo);
    /* const dispatch=useDispatch();
     const [token, setToken]=useState<string|null>(null);
     const [role,setRole]=useState<string|null>(null);
     useEffect(()=>{
         setToken(localStorage.getItem('token'));
         setRole(localStorage.getItem('userRole'));
         dispatch({type:GETINFO, token:token, userRole:role})
     })
     */

    if(!Component){return null;}
    return(
        <Route {...rest} render={props => (
            //localStorage.getItem('userRole')
            localStorage.getItem('token')
                ? (<Component {...props} />)
                : (<Redirect to={{ pathname: '/customerLogin', state: { from: props.location } }} />)
        )} />
    );
}

export default PrivateRoute;