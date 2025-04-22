import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Input, Card, Image } from 'antd';
import axios from 'axios';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';
import sideSelectContext from "../../context/SiderSelectContext"

const productValidationSchema = Yup.object({
  category_id: Yup.number()
    .integer('Please enter a valid Category Id')
    .positive('Please enter a valid Category Id')
    .required('Category Id is required'),
  product_name: Yup.string()
    .min(3, 'Product name should at least have 4 characters')
    .max(100, 'Product name should not exceed 100 characters')
    .required('Product name is required'),
  product_sku: Yup.string()
    .min(2, 'Product sku should at least have 2 characters')
    .max(30, 'Product sku should not exceed 30 characters')
    .required('Product sku is required'),
  product_description: Yup.string()
    .min(10, 'Product description should at least have 10 characters')
    .max(255, 'Product description should not exceed 255 characters'),
  available_stock: Yup.number()
    .integer('Please enter a valid Available Stock')
    .positive('Please enter a valid Available Stock')
    .required('Available stock is required'),
  product_image: Yup.mixed()
    .required('Product image is required'),
  product_price: Yup.number()
    .integer('Please enter a valid Product Price')
    .positive('Please enter a valid Product Price')
    .required('Product price is required'),
});

const AddProductContent = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userData, authToken, backendApi } = useContext(AuthContext);
  const navigatePath = userData.role_id === 1 ? 'admin' : 'user';
  const {sideSelection, setSiderSelection} = useContext(sideSelectContext);
  
  const navigate = useNavigate();
  
  const initialRegistrationValues = {
    category_id: '',
    product_name: '',
    product_sku: '',
    product_description: '',
    available_stock: '',
    product_image: '',
    product_price: '',
  };

  
  const handleImageChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;
  
      const newImage = new FormData();
      newImage.append('image', selectedFile);
  
      const imageRes = await axios.post(`${backendApi}/image/uploads`, newImage, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (imageRes.status === 200) {
        const uploadedImagePath = imageRes.data.file;
        // Replace both backslashes and forward slashes for cross-platform support
        const cleanedPath = uploadedImagePath.replace(/^.*[\\/]/, '');
  
        const fullImageUrl = `http://localhost:8000/uploads/2025_04/${cleanedPath}`;
        setImageUrl(()=>cleanedPath);
        setImagePreview(fullImageUrl);
      }
    } catch (err) {
      console.log(`Image Upload Error: ${err}`);
    }
  };
  

  const handleSubmit = async (values) => {

    try {
      const productPayload = {...values, product_image: imageUrl};
      
      
      const response = await axios.post(`${backendApi}/products`, productPayload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      
      if (response.status === 200) { 
        navigate(`/${navigatePath}`);
        setSiderSelection("all-products");
      }

    } catch (err) {
      console.log(err);
    }
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
        title={<h2 style={{ textAlign: 'center' }}>Add Product</h2>}
        style={{
          margin: '20px',
          width: '100%',
          maxWidth: '500px',
          minWidth: '400px',
          marginTop: '50px',
        }}
      >
        <Formik
          initialValues={initialRegistrationValues}
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => {
            return (
              <Form>
                {/* Category Id Field */}
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
                    style={{ color: 'red', marginTop: '4px' }}
                  />
                </div>

                {/* Product Name Field */}
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
                    style={{ color: 'red', marginTop: '4px' }}
                  />
                </div>

                {/* Product SKU Field */}
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
                    style={{ color: 'red', marginTop: '4px' }}
                  />
                </div>

                {/* Product Description Field */}
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
                    style={{ color: 'red', marginTop: '4px' }}
                  />
                </div>

                {/* Product Available Stock Field */}
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
                    style={{ color: 'red', marginTop: '4px' }}
                  />
                </div>

                {/* Product Image Field */}
                <div style={{ marginBottom: 16 }}>
                  <label>Product Image</label>
                  <Field name="product_image">
                    {({ field, form }) => (
                      <Input
                        name = "product_image"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          form.setFieldValue('product_image', file);
                          handleImageChange(event);
                        }}
                        onBlur={field.onBlur}
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name="product_image"
                    component="div"
                    style={{ color: 'red', marginTop: '4px' }}
                  />


                  {imagePreview && (
                    <div style={{ marginTop: 10 }}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "100%", maxHeight: "250px", objectFit: "contain", border: "1px solid #ccc" }}
                      />
                    </div>
                  )}



                </div>

                {/* Product Price Field */}
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
                    style={{ color: 'red', marginTop: '4px' }}
                  />
                </div>

                {/* Submit Button */}
                <Button type="primary" htmlType="submit" block>
                  Add Product
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default AddProductContent;
