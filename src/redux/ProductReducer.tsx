import React from "react";
import {ADD_PRODUCT, GET_PRODUCT, RESTORE_ALL_PRODUCT, UPDATE_PRODUCT} from "./Actions/ProductActionTypes";
import {Product, ProductActions} from "../Type";

const initialState:Product[]=[];

function ProductReducer(state=initialState, action:ProductActions){
    switch(action.type){
        case RESTORE_ALL_PRODUCT:{
            return action.productsList;
        }
        case UPDATE_PRODUCT:{
            return state.map((product)=>{
                if(product.id===action.UpdatedProduct.id){
                    return action.UpdatedProduct;
                }
                return product;
            })
        }
        case GET_PRODUCT:{
            return
        }
        case ADD_PRODUCT: {
            return [
                ...state,
                action.UpdatedProduct
            ]
        }
        default :
            return state;
    }
}
export default ProductReducer;