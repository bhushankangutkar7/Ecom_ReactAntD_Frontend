import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import { Button, Input, Card } from 'antd';
import axios from "axios";
import * as Yup from "yup";

const registerValidationSchema = Yup.object({
  company_name: Yup.string()
    .required("Company name is required"),  
  company_address: Yup.string()
    .required("Company Address is required"),
  company_pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode should be a number and must be exactly 6 digits")
    .required("Pincode is required"),
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
    .required("Password is required")
    .required("Password is required"),
  confirm_password:Yup.string()
    .oneOf([Yup.ref('password'), null], `Password must match`),
  role_id: Yup.number()
    .required(),
})


const register = () => {

  const navigate = useNavigate();

  const intialRegistrationValues = {
    company_name: "",
    company_address:"",
    company_pincode: "",
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    confirm_password: "",
    role_id: 1,
  };

  const handleSubmit = async(values) => {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    try{
      const response = await axios.post(`${backendApi}/register`, values);
      if(response.status === 200){
        alert(response.data.msg);
        navigate("/login");
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
        title= {<h2 style={{textAlign:"center"}}>Company & Admin Register</h2>} 
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
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({handleChange, handleBlur, values})=>(
            <Form>
              {/* Company Name Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Company Name</label>
                <Field
                  as={Input}
                  name="company_name"
                  placeholder="Enter your Company Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company_name}
                />
                <ErrorMessage
                  name="company_name"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>

              {/* Company Address Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Company Address</label>
                <Field
                  as={Input}
                  name="company_address"
                  placeholder="Enter your Company Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company_address}
                />
                <ErrorMessage
                  name="company_address"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>


              {/*Company Pincode Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Company Pincode</label>
                <Field
                  as={Input}
                  name="company_pincode"
                  placeholder="Enter your Company Pincode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company_pincode}
                />
                <ErrorMessage
                  name="company_pincode"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>


              {/*Admin First Name Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Admin First Name</label>
                <Field
                  as={Input}
                  name="first_name"
                  placeholder="Enter Admin First Name"
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


              {/*Admin Last Name Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Admin Last Name</label>
                <Field
                  as={Input}
                  name="last_name"
                  placeholder="Enter Admin Last Name"
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


              {/*Admin Email Id Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Admin Email Id</label>
                <Field
                  as={Input}
                  name="email_id"
                  placeholder="Enter Admin Email Id"
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


              {/*Admin Password Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Admin Password</label>
                <Field
                  as={Input.Password}
                  name="password"
                  placeholder="Enter Admin Password"
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


              {/*Confirm Admin Password Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Confirm Admin Password</label>
                <Field
                  as={Input.Password}
                  name="confirm_password"
                  placeholder="Confirm Admin Password"
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

export default register;

