import React, {useEffect, useState} from "react";
import img from "../imgs/example.jpg";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Order, OrderItem, Product} from "../Type";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import PrimarySearchAppBar from "./HomePageComponents/PrimarySearchAppBar";
import {OrderStatus} from "../Enums/OrderStatus";
import OrderService from "../Service/OrderService";
import {RESTORE_ALL_ORDERS, UPDATE_ORDER} from "../redux/Actions/OrderActionsTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1200,
      height: 650,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    submit: {
      margin: theme.spacing(0.5, 0, 2),
      height: 50,
    },
  })
);

function ProductDetails() {
  const classes = useStyles();
  let { id }: any = useParams();
  const [productQuantity, setProductQuantity] = useState(1);

  //for hash map or for frontend store shopping cart
  //const [orderItemsMap, setOderItemsMap]=useState<Map<string, OrderItem>>();
  //let orderItemsMap: Map<string, OrderItem> = new Map();
  // const selectShoppingCartProduct = (state: any) => {
  //  return state.shoppingCartReducer.find(
  //   (product: Product) => product.id === id
  //  );
  //};
  //const shoppingCartProduct = useSelector(selectShoppingCartProduct);

  const selectActiveOrder = (state:any) => {
    //console.log(state.orderReducer);
    return state.orderReducer.find(
      (order: Order) => order.status === OrderStatus.ACTIVE
    );
  };
  const selectProductById = (state: any) => {
    return state.productReducer.find((product: Product) => product.id === id);
  };

  const product = useSelector(selectProductById);
  //const shoppingCartProduct = useSelector(selectShoppingCartProduct);
  const activeOrder:Order = useSelector(selectActiveOrder);
  const dispatch = useDispatch();

 /* useEffect(()=>{
     UserService.hasActiveOrder().then((response)=>{
       if(response.data===false){return null}
       OrderService.FindOrderByCustomerAndStatus().then((response)=>{
         if(response.data ===null){return null}
           setOrder(response.data);
       })
     })

  },[])
 */
  //restore all Orders of user
  //it is for hash map data structure
   /*useEffect(()=>{
        OrderService.FindOrderByUserEmail().then((response)=>{
            if(response.data==null){return null;}
          const additionalResponse=response.data[0].orderItemsMap;
          Object.entries(additionalResponse).forEach(([key, value])=>{
            orderItemsMap.set(key, value);
          })

          const activeOrder:Order={
            ...response.data[0],
            orderItemsMap:orderItemsMap,
          }
          const orders:Order[]=[activeOrder];
            //right now front end will not be able to read orderitemsmap
            dispatch({type:RESTORE_ACTIVE_ORDER, orders:orders})
        })
    },[])

  useEffect(()=>{
    const newOrder={
      ...activeOrder,
      orderItemsMap:
    }
    setOrder()
  })
*/

  function handleAddToCart() {
    //item exist in active order?
    if(activeOrder.orderItemsList.length!==0) {
      for (let i = 0; i < activeOrder.orderItemsList.length; i++) {
        if (product.id === activeOrder.orderItemsList[i].productId) {
          //update that item
          //copy orderItem array
          const existingOrderItemList: OrderItem[] = [
            ...activeOrder.orderItemsList,
          ]

          existingOrderItemList[i]={
            productId:product.id,
            productName:product.productName,
            quantity:activeOrder.orderItemsList[i].quantity + productQuantity,
            unitPrice:product.retailPrice,
          };
          //existingOrderItemList.splice(i, 1);
          const saved:Order={
            ...activeOrder,
          }
          saved.orderItemsList=existingOrderItemList;

          //update existing order
          OrderService.UpdateOrder(saved).then((response) => {
            const orders:Order[]=[response.data]
            dispatch({type:RESTORE_ALL_ORDERS, orders:orders})
          })
          break;
        }
      }
    }
    //product not existing in users order, add one
    const newOrderItem:OrderItem={
      productId: product.id,
      productName:product.productName,
      quantity:productQuantity,
      unitPrice: product.retailPrice,
    }
    const newOrderItemList:OrderItem[]=[
      ...activeOrder.orderItemsList,
      newOrderItem,
    ];
    const saved:Order={
      ...activeOrder,
    }
    saved.orderItemsList=newOrderItemList;

    //update existing order
    OrderService.UpdateOrder(saved).then((response)=>{
      const orders:Order[]=[response.data]
      dispatch({type:RESTORE_ALL_ORDERS, orders:orders})
    })
    //it is for front end only shopping cart
  /* if(shoppingCartProduct){
      dispatch({type:UPDATE_CART, productId:product.id, quantity:shoppingCartProduct.quantity+productQuantity})
   }else{
      const newProduct={
        ...product,
        quantity:productQuantity,
      }
      dispatch({type:ADD_TO_CART, product:newProduct})
   }
*/

    //logic starts here
    //it is for hash map
  /*  orderItemsMap.set(product.id, {
      quantity: productQuantity,
      unitPrice: product.retailPrice,
    });
    if (activeOrder.orderItemsMap.size !==0) {
      //find existing orderitem in orderitemMap
      //if exist update that orderitem
      //else set new orderItem
      if (activeOrder.orderItemsMap.has(product.id)) {
        const updatedItemQuantity =
          activeOrder.orderItemsMap.get(product.id)!.quantity +
          productQuantity;let newMap: Map<string, OrderItem> = new Map([
         ...Array.from(activeOrder.orderItemsMap.entries()),
        ]);
        newMap.set(product.id, {
          quantity: updatedItemQuantity,
          unitPrice: product.retailPrice,
        });
        const updatedOrder: Order = {
          ...activeOrder,
          orderItemsMap: newMap,
        };
        OrderService.UpdateOrder(updatedOrder).then((response) => {
          if (response.data) {
            dispatch({ type: UPDATE_ORDER, updatedOrder: response.data });
          }
        });
        //if orderitem not exist in map
      } else {
       let newMap: Map<string, OrderItem> = new Map([
         ...Array.from(activeOrder.orderItemsMap.entries()),
        ]);
        newMap.set(product.id, {
          quantity: productQuantity,
          unitPrice: product.retailPrice,
        });
        const updatedOrder: Order = {
          ...activeOrder,
          orderItemsMap: newMap,
        };
        OrderService.UpdateOrder(updatedOrder).then((response) => {
          if (response.data) {
            dispatch({ type: UPDATE_ORDER, updatedOrder: response.data });
          }
        });
      }
      //no active order
    } else {
      const newMap:Map<string,OrderItem>=new Map([product.id, {quantity: productQuantity, unitPrice:product.retailPrice}])
      const newOrder: Order = {
        id: "",
        customerId: "",
        shippingAddress:"",
        status:OrderStatus.ACTIVE,
        orderItemsMap:newMap,
        historyProductList:[],
      };
      OrderService.CreateOrder(newOrder).then((response)=>{
        console.log(response.data);
      })
    }
*/
  }

  return (
    <div className={classes.root}>
      <Container>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PrimarySearchAppBar />
            </Grid>
            <Grid item xs={12}>
              <h1>ProductName:{product.productName}</h1>
              Stock: {product.quantity} left
            </Grid>

            <Grid container item xs={12}>
              <img
               // src={"https://images-na.ssl-images-amazon.com/images/I/81sQxjJBn1L._AC_SX679_.jpg"}
                  src={product.pictureURL}
                alt={id}
              />
              <TextField
                variant="outlined"
                disabled
                name="quantity"
                label={productQuantity}
                id="quantity"
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() =>
                  productQuantity < product.quantity
                    ? setProductQuantity(productQuantity + 1)
                    : null
                }
              >
                +
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() =>
                  productQuantity > 1
                    ? setProductQuantity(productQuantity - 1)
                    : null
                }
              >
                -
              </Button>
            </Grid>
            <Grid item>
              <h2>Unit Price: ${product.retailPrice}</h2>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
              <h1>product description :</h1>
              {product.description}
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
export default ProductDetails;
