import React, { ChangeEvent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { Order, OrderItem } from "../../Type";
import { OrderStatus } from "../../Enums/OrderStatus";
import OrderService from "../../Service/OrderService";
import { UPDATE_ADDRESS } from "../../redux/Actions/AddressActionType";

//Check out
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  function PaymentForm() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  //address
  interface addressProps {
    callBackFromParent: (address: string) => void;
  }
  function AddressForm(props: addressProps) {
    const [address, setAddress] = useState("");
    function handleSubmit() {
      props.callBackFromParent(address);
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setAddress(e.target.value);
    }
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="Name"
              name="Name"
              label="name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="off"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              {" "}
              Next{" "}
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  //Review page
  const useReviewStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
  }));

  function Review() {
    const classes = useReviewStyles();
    const payments = [
      { name: "Card type", detail: "Visa" },
      { name: "Card holder", detail: "Mr John Smith" },
      { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
      { name: "Expiry date", detail: "04/2024" },
    ];
    const Total = ({ products }: any) => (
      <Typography variant="subtitle1" className={classes.total}>
        Total Price: $
        {activeOrder && activeOrder.orderItemsList
          ? activeOrder.orderItemsList.reduce(
              (sum: any, i: any) => (sum += i.quantity * i.unitPrice),
              0
            )
          : 0}
      </Typography>
    );
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {activeOrder && activeOrder.orderItemsList
            ? activeOrder.orderItemsList.map((product) => (
                <ListItem className={classes.listItem} key={product.productId}>
                  <ListItemText
                    primary={product.productName}
                    secondary={`X ${product.quantity}`}
                  />
                  <Typography variant="body2">${product.unitPrice}</Typography>
                </ListItem>
              ))
            : null}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Total products={activeOrder ? activeOrder.orderItemsList : null} />
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom></Typography>
            <Typography gutterBottom>{address}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Payment details
            </Typography>
            <Grid container>
              {payments.map((payment) => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const selectActiveOrder = (state: any) => {
    //console.log(state.orderReducer);
    return state.orderReducer.find(
      (order: Order) => order.status === OrderStatus.ACTIVE
    );
  };

  const activeOrder: Order = useSelector(selectActiveOrder);
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (activeStep === 2) {
      const saved: Order = {
        ...activeOrder,
        shippingAddress: address,
        status: OrderStatus.PLACED,
      };
      OrderService.UpdateOrder(saved)
        .then((response) => {
          console.log(response.data);
          setActiveStep(activeStep + 1);
        })
        .catch((error) => {
          console.log(error.response.message);
        });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ["Shipping address", "Payment details", "Review your order"];
  const myCallback = (address: string) => {
    setAddress(address);
    setActiveStep(1);
  };
  function getStepContent(step: any) {
    switch (step) {
      case 0:
        return <AddressForm callBackFromParent={myCallback} />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            My Ecommerce CheckOut
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {activeOrder.id}. We have emailed your
                  order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === 0 ? null : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
