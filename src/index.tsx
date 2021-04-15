import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import rootReducer from "./redux/rootreducer";
import { Provider } from "react-redux";
import axios from "axios";

const store = createStore(rootReducer);
axios.defaults.baseURL = "http://localhost:8080";
if (localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] =
    "Basic " + localStorage.getItem("token");
}
axios.defaults.headers.post["Content-Type"] = "application/json";

export default store;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
