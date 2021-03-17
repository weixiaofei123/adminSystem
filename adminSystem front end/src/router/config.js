import Login from "../container/login/index.js";
import NotFound from "../container/notFound/index.js";
import Home from "../container/home/index.js";
import List from "../container/list/index.js";
import Notice from "../container/notice/index.js"
import Edit from "../container/edit/index.js";
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
//mainRouter for the layout
export const mainRouters = [
  { path: "/login", component: Login },
  { path: "/404", component: NotFound },
];
//router for the admin
export const adminRouters = [
  { path: "/admin/dashboard", component: Home, title: "home", icon: faHome, isShow: true, },
  { path: "/admin/products", component: List, title: "products", icon: faCouch, isShow: true, },
  { path: "/admin/products/edit/:data?", component: Edit, title: "edit", isShow: false, },
  { path: "/admin/notice", component: Notice, title: "notice", isShow: false, },
];
