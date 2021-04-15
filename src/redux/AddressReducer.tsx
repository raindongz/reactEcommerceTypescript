import React from "react";
import {AddressAction} from "../Type";
import {UPDATE_ADDRESS} from "./Actions/AddressActionType";

const initialState:string[]=[];
function AddressReducer(state=initialState, action:AddressAction){
    switch (action.type){
        case UPDATE_ADDRESS:{
            return action.address;
        }
        default: return state;
    }
}
export default AddressReducer;