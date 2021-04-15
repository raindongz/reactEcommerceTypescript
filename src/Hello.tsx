import React from "react";
import {useParams} from "react-router-dom";

function Hello(){
    const {id}:any=useParams();
    return(
       <div>
           <h3>ID:{id}</h3>
       </div>
    );
}

export default Hello;