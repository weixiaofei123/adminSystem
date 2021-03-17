import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { setToken } from '../../utils/auth/auth.js'
import { withRouter } from 'react-router-dom'
import { login } from '../../services/auth.js'
import Snackbar from '@material-ui/core/Snackbar';
var md5 = require('blueimp-md5');

//yup
const validationSchema = yup.object({
  userName: yup
    .string('Enter your userName')
    .required('userName is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

//login component
function Login(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [resInfo, setResInfo] = React.useState("");
  const { vertical, horizontal, open } = state;
  const handleClick = (newState, resInfo) => {
    setState({ open: true, ...newState });
    setResInfo(resInfo);
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const formik = useFormik({
    initialValues: {
      userName: 'userName',
      password: 'password',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //call the api from the back end 
      var hashPassword = md5(values.password);
      console.log(hashPassword)
      login({
        "userName": values.userName,
        "password": hashPassword,
      }).then(res => {
        console.log(res)
        if (res.status == true) {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
          }, res.message);
          setToken("res.token");
          props.history.push("/admin/dashboard")
        } else {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
          }, res.message);
        }
      }).catch(err => {
        handleClick({
          vertical: 'top',
          horizontal: 'center',
        }, "erro occured");
      });
    },
  });
  return 
  <Card style={{ width: "500px", margin: "50px auto", }}>
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={resInfo}
      key={vertical + horizontal}
    />
    <CardHeader title="Login" />
    <CardContent>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="userName"
          name="userName"
          label="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: "15px", }}>
          Submit
        </Button>
      </form>
    </CardContent>
  </Card>
}
export default withRouter(Login);