import React, { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import "./App.css";
import EmployeePage from "./Pages/EmployeePage";
import CustomerHomePage from "./Pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Pages/Unauthorized";
import AuthRoute from "./AuthRoute";
import CustomerLogin from "./Auth/CustomerLogin";
import SignupPage from "./Pages/SignupPage";
import ProductList from "./Pages/ProductList";
import Hello from "./Hello";
import ProductDetails from "./Pages/ProductDetails";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import Checkout from "./Pages/CheckOutPage/CheckOut";
import EmployeeProductListPage from "./Pages/EmployeeProductListPage";
import EmployeeProductDetail from "./Pages/EmployeeProductDetail";
import AddNewProductPage from "./Pages/AddNewProductPage";
import {role} from "./Type";
import {useSelector} from "react-redux";

function App() {
  const selectUserInfo = (state: any) =>
      state.authReducer.map((authInfo: role) => authInfo);
  const userInfo: role[] = useSelector(selectUserInfo);
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          {userInfo[0] && userInfo[0].role === "EMPLOYEE" ? <li>
            <Link to="/employee">Employee Page</Link>
          </li> : null}


        </ul>
        <Route path="/unauthorized" component={Unauthorized} />
        <PrivateRoute exact path="/" component={CustomerHomePage} />
        <Route path="/customerLogin" component={CustomerLogin} />
        <AuthRoute path="/employee" component={EmployeePage} />
        <AuthRoute path="/addNewProduct" component={AddNewProductPage} />

        <Route path="/signup" component={SignupPage} />

        <PrivateRoute path="/shoppingCart" component={ShoppingCartPage}/>
        <PrivateRoute path="/checkOutPage" component={Checkout} />

        <Switch>
          <PrivateRoute path="/productList/:id" component={ProductList} />
          <PrivateRoute path="/productDetail/:id" component={ProductDetails}/>
          <AuthRoute path="/employeeProductList/:id" component={EmployeeProductListPage} />
          <AuthRoute path="/employeeProductDetail/:id" component={EmployeeProductDetail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
