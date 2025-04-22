import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Input, Checkbox } from "antd";
import AuthContext from "../context/authContext";

const loginValidationSchema = Yup.object({
  email_id: Yup.string()
    .min(10,"Email Id must atleast be 10 characters long")
    .max(100,`Email Id should not exceed 100 characters`)
    .matches(/[@]/,`Email Id must contain "@" symbol`)
    .matches(/[.]/,`Email Id must have "."`)
    .email("Invalid Email Id format")
    .required(`Email Id is required`),
  password: Yup.string()
    .min(8, "Password must contain atleast 8 characters")
    .max(16, "Password cannot exceed 16 characters")
    .matches(/[a-z]/, "Password must contain atleast one lowercase")
    .matches(/[A-Z]/, "Password must contain atleast one Uppercase")
    .matches(/[@#$%&*/]/, "Password must contain atleast one special character from (@,#,$,%,&,*,/)")
    .required("Password is required")
    .required("Password is required"),
});

const login = () => {

  const {isLoggedIn, setIsLoggedIn, userData, setUserData} = useContext(AuthContext); 

  const navigate = useNavigate();

  const initialLoginValues = {
    email_id: "",
    password: "",
    remember: false,
  };


  const handleSubmit = async(values, e) => {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    try{
      const response = await axios.post(`${backendApi}/login`, values);

      if(response.status === 200){
        localStorage.setItem("authToken", response.data.authToken);
        const decodedToken  = jwtDecode(response.data.authToken);
        const {user_id, role_id, company_id, company_name, iat, exp} = decodedToken;
        setUserData({...userData,user_id, role_id, company_id, company_name, iat, exp});
        setIsLoggedIn(true);
        if(userData.role_id === 1){
          navigate("/admin");
      
        }
        if(userData.role_id === 2){
          navigate("/user");
        }
      }

    } 
    catch(err){
      console.log(err);
      res.json({err: 1, message: err});
      setIsLoggedIn(false);
    }
  };


  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card 
        title= {<h2 style={{textAlign:"center"}}>Login</h2>} 
        style={{ width: 400 }}
      >
        <Formik
          initialValues={initialLoginValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, setFieldValue, errors }) => (
            <Form>
              {/* Email Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Email ID</label>
                <Field
                  as={Input}
                  name="email_id"
                  placeholder="Enter your email"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  value={values.email_id}
                />
                <ErrorMessage
                  name="email_id"
                  component="div"
                  style={{ color: "red", marginTop: "4px" }}
                />
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: 16 }}>
                <label>Password</label>
                <Field
                  as={Input.Password}
                  name="password"
                  placeholder="Enter your password"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
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

export default login;
