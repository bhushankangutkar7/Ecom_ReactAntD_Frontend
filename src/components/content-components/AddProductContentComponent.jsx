import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import { Button, Input, Card,Layout } from 'antd';
import axios from "axios";
import * as Yup from "yup";
import AuthContext from '../../context/AuthContext';



const productValidationSchema = Yup.object({
    category_id: Yup.number()
        .integer("category_id should be an integer")
        .positive("category_id can not be negative")
        .required("compay_id is required"),
    product_name: Yup.string()
        .min(3,`Product name should atleast have 4 characters`)
        .max(100, `Product name should not exceed 100 characters`)
        .required(`Product name is required`),
    product_sku: Yup.string()
        .min(2, `Product sku should atleast have 2 characters`)
        .max(30, `Product sku should not exceed 30 characters`)
        .required(`Product sku is required`),
    product_description: Yup.string()
        .min(10, `Product description should atleast have 10 characters`)
        .max(255, `Product description should not exceed 255 characters`),
    available_stock: Yup.number()
        .integer(`Available stock should be an Interger`)
        .positive(`Available stock should be a Positive Number`)
        .required(`Available stock is required`),
    product_image: Yup.string()
        .url()
        .required(),
    product_price: Yup.number()
        .integer(`Product price should be an Integer`)
        .positive(`Product price should be a Positive number`)
        .required(`Product price is required`)

});

const AddProductContentComponent = () => {

    const authToken = localStorage.getItem("authToken");

    const {userData} = useContext(AuthContext);

    const navigatePath = userData.role_id === 1 ? "admin" : "user"
  
    const navigate = useNavigate();
  
    const intialRegistrationValues = {
        category_id: "",
        product_name: "",
        product_sku: "",
        product_description: "",
        available_stock: "",
        product_image: "",
        product_price: "",
    };
    
  
  
    const handleSubmit = async(values) => {
      console.log(`Form Data: `, values);
      const backendApi = import.meta.env.VITE_BACKEND_API;
  
      try{
        const response = await axios.post(`${backendApi}/products`,values, {
          headers : {
            Authorization: `Bearer ${authToken}`,
          }
        });
  
        if(response.status === 200){
          console.log(response.data);
          navigate(`/${navigatePath}`);
        }  
      }
      catch(err){
        console.log(err);
      }
  
    }
  
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          title= {<h2 style={{textAlign:"center"}}>Add Product</h2>} 
          style={{
            margin:"20px",
            width: '100%',
            maxWidth: '500px',
            minWidth: '400px',
            marginTop: "50px"
          }}
        >
          <Formik
            initialValues = {intialRegistrationValues}
            validationSchema={productValidationSchema}
            onSubmit={handleSubmit}
          >
            {({handleChange, handleBlur, values})=>(
              <Form>
                {/*Category Id Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product Category Id</label>
                  <Field
                    as={Input}
                    name="category_id"
                    placeholder="Enter Product's Category Id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category_id}
                  />
                  <ErrorMessage
                    name="category_id"
                    component="div"
                    style={{ color: "red", marginTop: "4px" }}
                  />
                </div>
  
  
                {/*Product Name Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product Name</label>
                  <Field
                    as={Input}
                    name="product_name"
                    placeholder="Enter Product's Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.product_name}
                  />
                  <ErrorMessage
                    name="product_name"
                    component="div"
                    style={{ color: "red", marginTop: "4px" }}
                  />
                </div>
  
  
                {/*Product SKU Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product SKU</label>
                  <Field
                    as={Input}
                    name="product_sku"
                    placeholder="Enter Product's SKU"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.product_sku}
                  />
                  <ErrorMessage
                    name="product_sku"
                    component="div"
                    style={{ color: "red", marginTop: "4px" }}
                  />
                </div>
  
  
                {/*Product Description Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product Description</label>
                  <Field
                    as={Input}
                    name="product_description"
                    placeholder="Enter Product's Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.product_description}
                  />
                  <ErrorMessage
                    name="product_description"
                    component="div"
                    style={{ color: "red", marginTop: "4px" }}
                  />
                </div>
  
  
                {/*Product Available Stock Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product Available Stock</label>
                  <Field
                    as={Input}
                    name="available_stock"
                    placeholder="Enter Product available stock"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.available_stock}
                  />
                  <ErrorMessage
                    name="available_stock"
                    component="div"
                    style={{ color: "red", marginTop: "4px" }}
                  />
                </div>
  
  
                {/*Product Image Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product Image link</label>
                  <Field
                    as={Input}
                    name="product_image"
                    placeholder="Enter Product Image Link"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.product_image}
                  />
                  <ErrorMessage
                    name="product_image"
                    component="div"
                    style={{ color: "red", marginTop: "4px" }}
                  />
                </div>
  
  
                {/*Product Available Stock Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product Price</label>
                  <Field
                    as={Input}
                    name="product_price"
                    placeholder="Enter Product Price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.product_price}
                  />
                  <ErrorMessage
                    name="product_price"
                    component="div"
                    style={{ color: "red", marginTop: "4px" }}
                  />
                </div>
  
                {/* Submit Button */}
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          
        </Card>
      </div>
    );
  };
  
  export default AddProductContentComponent;
  
  