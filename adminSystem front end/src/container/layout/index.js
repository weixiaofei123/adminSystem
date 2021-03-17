import React from "react";
import "./index.scss";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Sider from "../../component/menu/index.js";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { clearToken } from '../../utils/auth/auth.js'
import { withRouter } from 'react-router-dom'
import { logout } from '../../services/auth.js'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    width: "100%",
  },
  paper: {
    height: "100%",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  header: {
    borderRadius: "0px",
    height: "80px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  sider: {
    height: "100%",
    borderRadius: "0px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    overflow: "hidden",
  },
  container: {
    width: "100%",
    height: "100%",
    margin: 0,
    alignContent: "start",
  },
}));
//layout wrapper for the component
function LayOut(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.innerText == 'Logout') {
      //call the api from the back end
      logout();
      clearToken();
      props.history.push("/login");
    }
  };
  const handelClickLogin = () => {
    props.history.push("/login");
  }
  const handelClickNotice = () => {
    props.history.push("/admin/notice");
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.header}>
          <Paper
            style={{
              width: "100%",
              height: "100%",
              lineHeight: "76px",
              backgroundColor: "#6969e1",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 15px",
              borderRadius: "0px",
            }}
          >
            <a href="/admin/dashboard">
              <span className="logo">QianF Education</span>
            </a>
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                userMenu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handelClickLogin}>login</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
                <MenuItem onClick={handelClickNotice}>Notice</MenuItem>
              </Menu>
            </div>
          </Paper>
        </Grid>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={2} style={{ margin: "0px", height: "initial", }}>
            <Paper className={classes.sider}>
              <Sider />
            </Paper>
          </Grid>
          <Grid item xs={10} style={{ margin: "0px", height: "100%", }} >
            <Paper className={classes.paper}>{props.children}</Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(LayOut);