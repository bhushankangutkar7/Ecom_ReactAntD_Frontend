import React, {useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Input, Checkbox } from "antd";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "../context/authContext";
import { jwtDecode } from "jwt-decode";

const loginValidationSchema = Yup.object({
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
  remember: Yup.boolean(),
});

const Login = () => {

  const {isLoggedIn, setIsLoggedIn, userRole, setUserRole} = useContext(AuthContext); 

  const initialLoginValues = {
    email_id: "",
    password: "",
    remember: false,
  };


  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    const backendApi = import.meta.env.VITE_BACKEND_API;
    axios.post(`${backendApi}/login`, values)
      .then((res)=>{
        console.log(res);
        console.log(res.status);
        if(res.status === 200){
          setIsLoggedIn(true);
          localStorage.setItem("authToken", res.data.authToken);
          const decodedToken  = jwtDecode(res.data.authToken);
          setUserRole(decodedToken.role_id);
          console.log(isLoggedIn);
        }
        else{
          setIsLoggedIn(false);
        }
      })
      .catch((err)=>{
        console.log(err);
      })
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

              {/* Remember Me */}
              <div style={{ marginBottom: 16 }}>
                <Checkbox
                  checked={values.remember}
                  onChange={(e) => setFieldValue("remember", e.target.checked)}
                >
                  Remember Me
                </Checkbox>
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

export default Login;
