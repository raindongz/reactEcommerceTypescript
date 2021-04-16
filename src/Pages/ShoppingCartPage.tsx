import React, { useEffect, useState } from "react";
import { Order, OrderItem, Product } from "../Type";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, GridListTile, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { OrderStatus } from "../Enums/OrderStatus";
import OrderService from "../Service/OrderService";
import {RESTORE_ALL_ORDERS} from "../redux/Actions/OrderActionsTypes";


function ShoppingCartPage() {
  /*const selectAllCartItem = (state: any) => {
    console.log(state.shoppingCartReducer);
    return state.shoppingCartReducer.map((product: Product) => product);
  };
  const products = useSelector(selectAllCartItem);

   */
  const dispatch = useDispatch();
  const selectActiveOrder = (state: any) => {
    //console.log(state.orderReducer);
    return state.orderReducer.find(
      (order: Order) => order.status === OrderStatus.ACTIVE
    );
  };
  const activeOrder: Order = useSelector(selectActiveOrder);
  const history = useHistory();
  const Total = ({ products }: any) => (
      <h1>
      Total Price:
      {activeOrder.orderItemsList.reduce(
        (sum: any, i: any) => (sum += i.quantity * i.unitPrice),
        0
      )}
    </h1>
  );
  function handleCheckOut() {
    let path = "/checkOutPage";
    history.push(path);
  }
  function handleDeleteItem(productId: string) {
    for (let i = 0; i < activeOrder.orderItemsList.length; i++) {
      if (productId === activeOrder.orderItemsList[i].productId) {
        //update that item
        //copy orderItem array
        let existingOrderItemList: OrderItem[] = [...activeOrder.orderItemsList];
        existingOrderItemList.splice(i, 1);
        const newOrder: Order = {
          ...activeOrder,
          orderItemsList: existingOrderItemList,
        };
        //update existing order
        OrderService.UpdateOrder(newOrder).then((response) => {
          const orders:Order[]=[response.data];
          dispatch({type:RESTORE_ALL_ORDERS, orders:orders});
        });
        break;
      }
    }
    //dispatch({ type: DELETE_FROM_CART, productId: productId });
  }

  return (
    <div>
      {activeOrder ? activeOrder.orderItemsList.map((orderItem: OrderItem) => (
        <Grid container>
          <Grid item xs={2}>
            Name : {orderItem.productName}{" "}
          </Grid>
          <Grid item xs={2}>
            {" "}
            Price: {orderItem.unitPrice}
          </Grid>
          <Grid item xs={2}>
            {" "}
            quantity: {orderItem.quantity}
          </Grid>
          <Grid item xs={2}>
            {" "}
            <Button onClick={() => handleDeleteItem(orderItem.productId)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      )): null}
      {activeOrder && activeOrder.orderItemsList.length>0 ? <Total products={activeOrder.orderItemsList} /> : <h1>you dont have any Item in Shopping Cart.</h1>}

      <Button onClick={handleCheckOut}>Checkout</Button>
    </div>
  );
}
export default ShoppingCartPage;
