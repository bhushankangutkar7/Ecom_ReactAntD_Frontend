import React, {useState} from 'react';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import * as Yup from "yup";
import {Formik, Form as FormikForm, ErrorMessage} from "formik";

const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const loginValidator = Yup.object({
  email_id: Yup.string()
    .min(10,`Email Id should contain alteast 10 characters long`)
    .max(100, `Email Id should not exceed 100 characters`)
    .matches(/[@]/, `Enmail Id must contain "@" symbol`)
    .matches(/[.]/, `Email Id must have "."`)
    .required(`Emai Id is required`),
  password: Yup.string()
    .min(8, `Password must contain atleast 8 characters`)
    .max(16, `Password cannot exceed 16 characters`)
    .matches(/[a-z]/, `Password must contain atleast one lowercase`)
    .matches(/[A-Z]/, `Password must contain atleast one uppercase`)
    .matches(/[@#$%&*/]/, "Password must contain atleast one special character from (@,#,$,%,&,*,/)")
    .required(`Password is required`)
});

const Login = () => {

  const [userLoginData, setUserLoginData] = useState({
    email_id: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const {name, value, checked, type} = e.target;
    setUserLoginData({ ...userLoginData, 
      [name]: type === "checkbox"? checked : value});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userLoginData);

  };



  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        title={<h1>Login</h1>}
        style={{
          margin:"20px",
          width: '100%',
          maxWidth: '500px',
          minWidth: '400px',
          textAlign: 'center',
        }}
      >
        <Formik
          validationSchema={loginValidator}
          onSubmit={handleFormSubmit}
        >
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{
                margin:"20px",
                width: '100%',
                maxWidth: '450px',
                minWidth: '350px',
                textAlign: 'center',
              }}
            >
              <Form.Item
                label="Email Id"
                name="email_id"
                rules={[{ required: true, message: 'Please input your username!' }]}
                style={{ 
                  margin: '20px 30px 20px 0px',
                  maxWidth: '400px',
                  minWidth: '300px',
                  textAlign: 'center'
                }}
              >
                <div>
                  <Input onChange = {handleInputChange}/>
                  <ErrorMessage name="email_id" component="div" style={{color: "red"}}/>

                </div>

              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                style={{
                  margin: '20px 30px 20px 0px',
                  maxWidth: '400px',
                  minWidth: '300px',
                  textAlign: 'center'
                }}
              >
                <Input.Password onChange = {handleInputChange} />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked"
                style={{ 
                  margin: '20px 30px 20px 0px',
                  maxWidth: '400px',
                  minWidth: '300px',
                  textAlign: 'start'
                }}
              >
                <Checkbox onChange = {handleInputChange}>Remember me</Checkbox>
              </Form.Item>

              {/* This is the key change */}
              <Form.Item
                style={{
                  margin: '20px 30px 20px 0px',
                  width: "full",
                  maxWidth: '400px',
                  minWidth: '300px',
                  textAlign: 'start'
                  }}
              >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      margin: '20px 30px 20px 0px',
                      width: "100%",
                      maxWidth: '400px',
                      minWidth: '300px',
                      textAlign: 'start'
                      }}

                    onSubmit={handleFormSubmit}
                  >
                    Submit
                  </Button>
              </Form.Item>
            </Form>
        </Formik>

      </Card>
    </div>
  );
};

export default Login;
