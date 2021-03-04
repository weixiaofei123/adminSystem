import React, { useEffect,useState } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createProduct,getOneById,modifyProduct} from '../../services/products.js'
import { PropertySafetyFilled } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import { connect } from 'react-redux'
import Store from '../../store/store.js'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const validationSchema = yup.object({
    name: yup
      .string('Enter your name')
   
      .required('name is required'),
    price: yup
      .string('Enter your price')
   
      .required('price is required'),
  });

function Edit(props) {

  const [data,setData]=useState({});
  const [editorState,setEditorState]=useState(BraftEditor.createEditorState(null));
  useEffect(()=>{
  
   if (props.match.params.data) {
    
     getOneById(props.match.params.data).then((res)=>{
    console.log(res)
        setData(res);
        setEditorState(BraftEditor.createEditorState(res.editorState));
     }).catch((err)=>{
console.log(err)
     });
   } 
  },[]);
    const formik = useFormik({
        initialValues: {
        name:data.name,
        price:data.price,
        imgUrl:data.imgUrl
        },
        enableReinitialize:true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
    var file=document.getElementsByClassName("pic")[0].files[0];

 
          if (props.match.params.data) {
            
            modifyProduct(props.match.params.data,{...values,imgUrl:file.name,editorState:editorState.toHTML()}).then((res)=>{
if (res.tag) {
  props.history.push("/admin/products");
}
            }).catch((err)=>{});
          }else{
             
            createProduct({...values,price:parseFloat(values.price),imgURL:file.name,onSale:true,editorState:editorState.toHTML()}).then((res)=>{
              if (res.tag) {
                props.history.push("/admin/products");
              }
            }).catch((err)=>{
                console.log(err)
            });
          }
          //call the api from the back end
          

        },
      });

     const handleChangePic=(e)=>{
        //show the pic in the div
      var file=e.target.files[0];
      var imgDom=document.getElementsByClassName("formPic")[0];
      var reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(e){
        imgDom.setAttribute("src",reader.result);
      }
        //upload the pic 
        var formData=new FormData();
        formData.append("file",file);
        Axios.post("https://localhost:44323/api/products/uploadfile",formData);
      }

      const handleEditorChange=(editorState)=>{
    
        setEditorState(editorState)
      }

    return (
        <Card>
            <CardHeader
      
       
        title="product edit"
      
      />
       <CardContent>
       <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          style={{marginBottom:"20px"}}
        />
        <TextField
          fullWidth
          id="price"
          name="price"
          label="price"
 
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <div style={{margin:"15px 0px",textAlign:"left"}}>
         <img className="formPic"  id="imgUrl"
          name="imgUrl"
          label="imgUrl"
          src={formik.values.imgUrl?("https://localhost:44323/"+formik.values.imgUrl):""}
          style={{width:"100px",height:"100px",border:"1px solid #c8ced5",marginBottom:"15px"}}
          /><br />
        <input 
        className="pic"
        type="file" 
        onChange={(e)=>{handleChangePic(e)}}
        />
        </div>
        <BraftEditor
                    value={editorState}
                    onChange={handleEditorChange}
                    style={{border:"1px solid #c8ced5",height:"600px"}}
                 />
        <Button color="primary" variant="contained" style={{marginTop:"20px"}} type="submit">
          Submit
        </Button>
      </form>
      </CardContent>
        </Card>
    )
}

const mapStateToProps=(state)=>{
  return {
   
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Edit)) ;