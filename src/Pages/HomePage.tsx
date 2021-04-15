import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../redux/Actions/AuthActionTypes";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import PrimarySearchAppBar from "./HomePageComponents/PrimarySearchAppBar";
import TitlebarGridList from "./HomePageComponents/GridListPanel";
import OrderService from "../Service/OrderService";
import {RESTORE_ALL_ORDERS} from "../redux/Actions/OrderActionsTypes";

function HomePage() {
  const dispatch=useDispatch();
  useEffect(() => {
    OrderService.FindOrderByCustomerAndStatus().then((response)=>{
      if(!response.data){return null;}
      dispatch({type:RESTORE_ALL_ORDERS, orders:response.data})
    })
  },[]);
  return (
    <div>
      <Container>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PrimarySearchAppBar />
            </Grid>
            <Grid item xs={12}>
              <TitlebarGridList />
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default HomePage;
