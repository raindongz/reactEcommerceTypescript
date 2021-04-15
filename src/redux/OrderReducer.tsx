import React from "react";
import {Order, OrderActions} from "../Type";
import {RESTORE_ALL_ORDERS, UPDATE_ORDER} from "./Actions/OrderActionsTypes";

const initialState:Order[]=[];

function OrderReducer(state=initialState, action: OrderActions){
    switch(action.type){
        case RESTORE_ALL_ORDERS:{
            return action.orders;
        }
        case UPDATE_ORDER:{
            return state.map((order)=>{
                if(order.id===action.updatedOrder.id){
                    return action.updatedOrder;
                }
                return order;
            })
        }
        default:
            return state;
    }
}
export default OrderReducer;