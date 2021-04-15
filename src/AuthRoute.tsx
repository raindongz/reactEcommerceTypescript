import { Redirect, Route, RouteProps } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import {role} from "./Type";

interface Props {
  path: string;
  requiredRoles: string;
}

const selectUserInfo = (state: any) =>
  state.authReducer.map((authInfo: role) => authInfo);
const AuthRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const userInfo: role[] = useSelector(selectUserInfo);
  //const isAuthed = localStorage.getItem('token');
  //const userRole=localStorage.getItem('userRole');
  //const { userRole }: React.useContext(UserRoleContext);
  //const isEmployee=(userRole=="EMPLOYEE");
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") && userInfo[0] && userInfo[0].role === "EMPLOYEE" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default AuthRoute;
