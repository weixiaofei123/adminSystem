import { Menu } from "antd";
import { withRouter } from 'react-router-dom'
import React from "react";
import "antd/dist/antd.css";
import { adminRouters } from "../../router/config.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
//sider menu 
function Sider(props) {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: "57%",
        margin: "50px auto",
        border: "none",
      }}
    >
      {adminRouters.map((route, index) => {
        if (route.isShow) {
          return (
            <Menu.Item key={route.path} onClick={() => { props.history.push(route.path) }}> <FontAwesomeIcon icon={route.icon} />&nbsp;&nbsp;{route.title}</Menu.Item>);
        }
      })}
    </Menu>
  );
}

export default withRouter(Sider);