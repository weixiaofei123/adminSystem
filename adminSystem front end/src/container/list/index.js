import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listProducts, modifyProduct } from '../../services/products.js'
import './style.scss'
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";

//table structure
const columns = [
  { id: "id", label: "id", minWidth: 140, align: "left", },
  { id: "name", label: "name", minWidth: 140, align: "left", },
  {
    id: "price",
    label: "price",
    minWidth: 140,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "imgUrl",
    label: "img",
    minWidth: 140,
    align: "left",
    format: (value) => { console.log(value); return value ? <img src={"http://localhost:44323" + value} /> : "not exist" },
  },
  {
    id: "onSale",
    label: "onSale",
    minWidth: 140,
    align: "left",
    format: (value) => { return value ? "in store" : "out of store"; },
  },
  {
    id: "operation",
    label: "operation",
    minWidth: 220,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },

}));


//list component for list products
export default function List(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    //call products api 
    listProducts(1).then((res) => {
      setRows(res.data);
      setCount(res.total);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    //call the api from the back end
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    listProducts(newPage + 1).then((res) => {
      setRows(rows.concat(res.data));
      setCurrentPage(newPage + 1);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handelClickEdit = (productId) => {
    props.history.push(`/admin/products/edit/${productId}`);
  }

  const handleClickOnSale = (productId, product) => {
    //call the edit api
    modifyProduct(productId, product).then((res) => {
      if (res.tag) {
        listProducts(currentPage).then((res) => {
          setRows(rows.slice(0, -2).concat(res.data));
          setCount(res.total);
        }).catch((err) => {

        })
      }
    }).catch((err) => {

    });
  }

  //upload files
  const handelClickUpload = () => {
    //get the files from the front end
    var file = document.getElementById("file").files[0];
    //wrap the file in the formdata
    console.log(file)
    var form = new FormData();
    form.append("file", file);
    console.log(form)
    Axios.post("http://localhost:8080/api/products/uploadfile", form);
  }


  return (
    <Card>
      <CardHeader
        action={<Button variant="contained" color="primary" onClick={() => { props.history.push("/admin/products/edit") }}>
          add
      </Button>}
        title="Product List"
      ></CardHeader>
      <CardContent>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == "operation") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button className="btn" variant="contained" color="primary" className={classes.margin} onClick={() => { handelClickEdit(row.id) }} >
                                edit
                              </Button>
                              <Button className="btn" variant="contained" color="secondary" className={classes.margin} onClick={handleClickOpen}>
                                delete
                              </Button>

                              <Button className="btn" variant="contained" className={classes.margin} onClick={() => { handleClickOnSale(row["id"], { ...row, onSale: !row["onSale"] }) }}>
                                {
                                  row["onSale"] ? "not onSale" : "onSale"
                                }
                              </Button>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">{"confirm delete?"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    delete the product?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} color="primary">
                                    Cancel
                                  </Button>
                                  <Button onClick={handleClose} color="primary" autoFocus onClick={handleConfirm}>
                                    Confirm
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 4, 6]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
}
