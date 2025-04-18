import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import { Button, Input, Card,Layout } from 'antd';
import axios from "axios";
import * as Yup from "yup";
import AuthContext from '../../context/AuthContext';


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
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must be at most 16 characters")
        .matches(/[a-z]/, "Must include at least one lowercase letter")
        .matches(/[A-Z]/, "Must include at least one uppercase letter")
        .matches(/[@#$%&*/]/, "Must include one special character (@#$%&*/)")
        .required("Password is required"),
    confirm_password:Yup.string()
        .oneOf([Yup.ref('password'), null], `Password must match`),
})


const AddUserContent = () => {


  const navigate = useNavigate();

  const {authToken} = useContext(AuthContext);

  const intialRegistrationValues = {
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    confirm_password: "",
    role_id: 2,
  };

  useEffect(()=>{
    navigate("/admin");

  })



  const handleSubmit = async(values) => {
    console.log(`Form Data: `, values);
    const backendApi = import.meta.env.VITE_BACKEND_API;

    try{
      const response = await axios.post(`${backendApi}/users`,values, {
        headers : {
          Authorization: `Bearer ${authToken}`,
        }
      });

      if(response.status === 200){
        console.log(response.data.msg);
        navigate("/admin");
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
        title= {<h2 style={{textAlign:"center"}}>Add User</h2>} 
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
        
      </Card>
    </div>
  );
};

export default AddUserContent;

