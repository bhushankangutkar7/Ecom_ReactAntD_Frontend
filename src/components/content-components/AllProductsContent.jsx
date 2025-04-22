import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Popconfirm, Avatar } from 'antd';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import ProductsSelectContext from '../../context/ProductsSelectContext';

const AllProductsContent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { isLoggedIn, authToken, backendApi, userData } = useContext(AuthContext);
  const { productSelection, setProductSelection, siderSelection, setSideSelection } = useContext(ProductsSelectContext);
  const navigate = useNavigate();

  const productsUrl = `${backendApi}/products/company`;

  const fetchProducts = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await axios.get(`${productsUrl}?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const products = res.data.Products || [];
      setData(products);
      setPagination({
        current: page,
        pageSize: limit,
        total: res.data.pagination?.total || products.length,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/${userData.company_id}/products/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendApi}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert(res.data.message);
      fetchProducts(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleTableChange = (pagination) => {
    fetchProducts(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'product_image',
      key: 'product_image',
      render: (img) => <Avatar src={`${backendApi}/uploads/products/${img}`} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Description',
      dataIndex: 'product_description',
      key: 'product_description',
    },
    {
      title: 'SKU',
      dataIndex: 'product_sku',
      key: 'product_sku',
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
      key: 'product_price',
    },
    {
      title: 'Available Stock',
      dataIndex: 'available_stock',
      key: 'available_stock',
    },
    {
      title: 'Company ID',
      dataIndex: 'company_id',
      key: 'company_id',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record.id)} style={{ color: 'green' }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      style={{ margin: 20 }}
    />
  );
};

export default AllProductsContent;
