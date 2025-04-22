import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Input, Card } from 'antd';
import axios from "axios";
import * as Yup from "yup";
import AuthContext from '../../context/AuthContext';

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
  product_price: Yup.number()
    .integer('Please enter a valid Product Price')
    .positive('Please enter a valid Product Price')
    .required('Product price is required'),
});

const UpdateProductContent = () => {
  const { userData, authToken, backendApi } = useContext(AuthContext);
  const [existingData, setExistingData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const navigatePath = userData.role_id === 1 ? "admin" : "user";

  useEffect(() => {
    axios.get(`${backendApi}/products/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((res) => {
      const product = res.data.Products;
      setExistingData(product);

      if (product.product_image) {
        const imageName = product.product_image.replace(/^.*[\\/]/, '');
        setImagePreview(`${backendApi}/uploads/products/${imageName}`);
        setImageUrl(imageName); // Keep original image URL if user doesn't upload new
      }
    })
    .catch((err) => {
      console.error("Error fetching product:", err);
    });
  }, []);

  const initialValues = {
    category_id: existingData.category_id || "",
    product_name: existingData.product_name || "",
    product_sku: existingData.product_sku || "",
    product_description: existingData.product_description || "",
    available_stock: existingData.available_stock || "",
    product_price: existingData.product_price || "",
    product_image: "", // Not setting default file value
  };

  const handleImageChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append('image', selectedFile);

      const imageRes = await axios.post(`${backendApi}/image/uploads`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (imageRes.status === 200) {
        const uploadedPath = imageRes.data.file;
        const cleanedPath = uploadedPath.replace(/^.*[\\/]/, '');
        setImageUrl(cleanedPath);
        setImagePreview(`${backendApi}/uploads/2025_04/${cleanedPath}`);
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        product_image: imageUrl, // Use uploaded (or existing) image path
      };

      const response = await axios.put(`${backendApi}/products/${id}`, payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 200) {
        navigate(`/${navigatePath}`);
      }
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        title={<h2 style={{ textAlign: "center" }}>Update Product</h2>}
        style={{ margin: "20px", maxWidth: '500px', minWidth: '400px', marginTop: "50px" }}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>

              {/* Category ID */}
              <div style={{ marginBottom: 16 }}>
                <label>Category ID</label>
                <Field
                  as={Input}
                  name="category_id"
                  placeholder="Enter category ID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category_id}
                />
                <ErrorMessage name="category_id" component="div" style={{ color: "red" }} />
              </div>

              {/* Product Name */}
              <div style={{ marginBottom: 16 }}>
                <label>Product Name</label>
                <Field
                  as={Input}
                  name="product_name"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.product_name}
                />
                <ErrorMessage name="product_name" component="div" style={{ color: "red" }} />
              </div>

              {/* SKU */}
              <div style={{ marginBottom: 16 }}>
                <label>Product SKU</label>
                <Field
                  as={Input}
                  name="product_sku"
                  placeholder="Enter SKU"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.product_sku}
                />
                <ErrorMessage name="product_sku" component="div" style={{ color: "red" }} />
              </div>

              {/* Description */}
              <div style={{ marginBottom: 16 }}>
                <label>Description</label>
                <Field
                  as={Input}
                  name="product_description"
                  placeholder="Enter description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.product_description}
                />
                <ErrorMessage name="product_description" component="div" style={{ color: "red" }} />
              </div>

              {/* Stock */}
              <div style={{ marginBottom: 16 }}>
                <label>Available Stock</label>
                <Field
                  as={Input}
                  name="available_stock"
                  placeholder="Enter stock"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.available_stock}
                />
                <ErrorMessage name="available_stock" component="div" style={{ color: "red" }} />
              </div>

              {/* Image Upload */}
              <div style={{ marginBottom: 16 }}>
                <label>Product Image</label>
                <small style={{ display: "block", marginBottom: 6, color: "#888" }}>
                  Leave empty to keep current image
                </small>
                <Input
                  name="product_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div style={{ marginTop: 10 }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "250px",
                        objectFit: "contain",
                        border: "1px solid #ccc"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 16 }}>
                <label>Product Price</label>
                <Field
                  as={Input}
                  name="product_price"
                  placeholder="Enter price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.product_price}
                />
                <ErrorMessage name="product_price" component="div" style={{ color: "red" }} />
              </div>

              {/* Submit */}
              <Button type="primary" htmlType="submit" block>
                Update Product
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default UpdateProductContent;
