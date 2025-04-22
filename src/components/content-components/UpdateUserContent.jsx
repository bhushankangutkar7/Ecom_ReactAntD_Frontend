import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import { Button, Input, Card,Layout } from 'antd';
import axios from "axios";
import * as Yup from "yup";
import AuthContext from '../../context/AuthContext';
import selectSiderContext from "../../context/SiderSelectContext"


const userValidationSchema = Yup.object({
    first_name: Yup.string()
        .min(2,"First name must be alteat Two characters long")
        .max(16, "First name must not exceed 16 characters")
        .required("First Name is required"),
    last_name: Yup.string()
        .min(2,"Last name must be alteat Two characters long")
        .max(16, "Last name must not exceed 16 characters")
        .required("Last Name is required"),
    email_id: Yup.string()
        .min(10,"Email Id atleast 10 characters long")
        .max(100,`Email Id should not exceed 100 characters`)
        .matches(/[@]/,`Email Id must contain "@" symbol`)
        .matches(/[.]/,`Email Id must have "."`)
        .email("Invalid Email Id format")
        .required(`Email Id is required`),
    password : Yup.string()
        .min(8, "Password must contain atleast 8 characters")
        .max(16, "Password cannot exceed 16 characters")
        .matches(/[a-z]/, "Password must contain atleast one lowercase")
        .matches(/[A-Z]/, "Password must contain atleast one Uppercase")
        .matches(/[@#$%&*/]/, "Password must contain atleast one special character from (@,#,$,%,&,*,/)")
        .required("Password is required"),
    confirm_password:Yup.string()
        .oneOf([Yup.ref('password'), null], `Password must match`),
})


const UpdateUserContent = () => {

  const {userData, authToken, backendApi} = useContext(AuthContext);
  const [existingData, setExistingData] = useState({});
  const {setSiderSelection} = useContext(selectSiderContext);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    axios.get(`${backendApi}/users/${id}`,{
      headers : {
        Authorization : `Bearer ${authToken}`
      }
    })
    .then((res)=>{
      setExistingData(()=>res.data.User);
    })
  },[]);


  const intialRegistrationValues = {
    first_name: existingData.first_name || "",
    last_name: existingData.last_name || "",
    email_id: existingData.email_id || "",
    password: "",
    confirm_password:"",
    role_id: 2,
  };


  const handleSubmit = async(values) => {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    try{
      const response = await axios.put(`${backendApi}/users/${id}`,values, {
        headers : {
          Authorization: `Bearer ${authToken}`,
        }
      });

      if(response.status === 200){
        navigate("/admin");
        setSiderSelection("all-users");
      }  
    }
    catch(err){
      console.log(err);
    }
  }

  const handleCancel = () => {
    navigate("/admin");
    setSiderSelection("all-users");
  };


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        title= {<h2 style={{textAlign:"center"}}>Update User</h2>} 
        style={{
          margin:"20px",
          width: '100%',
          maxWidth: '500px',
          minWidth: '400px',
          marginTop: "50px"
        }}
      >
        <Formik
            enableReinitialize
            initialValues = {intialRegistrationValues}
            validationSchema={userValidationSchema}
            onSubmit={handleSubmit}
        >
          {({handleChange, handleBlur, values})=>(
            <Form>
              {/*Employee First Name Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Employee's First Name</label>
                <Field
                  as={Input}
                  name="first_name"
                  placeholder="Enter Employee's First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>


              {/*Employee Last Name Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Employee's Last Name</label>
                <Field
                  as={Input}
                  name="last_name"
                  placeholder="Enter Employee's Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>


              {/*Employee Email Id Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Employee's Email Id</label>
                <Field
                  as={Input}
                  name="email_id"
                  placeholder="Enter Employee's Email Id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email_id}
                />
                <ErrorMessage
                  name="email_id"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>


              {/*Employee Password Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Employee's Password</label>
                <Field
                  as={Input.Password}
                  name="password"
                  placeholder="Enter Employee's Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>


              {/*Confirm Employee Password Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Confirm Employee's Password</label>
                <Field
                  as={Input.Password}
                  name="confirm_password"
                  placeholder="Confirm Employee's Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                />
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>

              {/* Submit Button */}
              <Button type="primary" htmlType="submit" block>
                Update User
              </Button>

              <br/>
              <br/>

              {/* Cancel Button */}
              <Button type="danger" color="danger" variant="solid" block
              onClick = {handleCancel}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
        
      </Card>
    </div>
  );
};

export default UpdateUserContent;

