import {combineReducers} from "redux";

import React from "react";
import authReducer from "./authReducer";
import ProductReducer from "./ProductReducer";
import OrderReducer from "./OrderReducer";
import AddressReducer from "./AddressReducer";

const rootReducer =combineReducers({
    authReducer:authReducer,
    productReducer:ProductReducer,
    orderReducer:OrderReducer,
    addressReducer:AddressReducer,
})
export default rootReducer;