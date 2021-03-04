import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./router/index.js";
import "../src/base.css"
import "./static/icon/icon/iconfont.css"
import { mainRouters } from "./router/config.js";
import { Router, Switch, Route, Redirect,BrowserRouter} from "react-router-dom";
var Tpp = (
  <Provider store={store}>
    <BrowserRouter >
      <Switch>
        <Route path="/admin"  component={App} />
        {mainRouters.map((value, index) => {
          return <Route exact key={value.path} {...value} />;
        })}
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'

// import "../node_modules/normalize.css/normalize.css";

ReactDom.render(Tpp, document.getElementById("root"));
