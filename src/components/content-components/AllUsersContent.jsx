import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Popconfirm, Avatar } from 'antd';
import axios from "axios";
import AuthContext from '../../context/AuthContext';

const AllUsersContent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
    showQuickJumper: false,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '15', '20'],
  });

  const { isLoggedIn, isAdmin, authToken, backendApi, userData } = useContext(AuthContext);
  const usersUrl = `${backendApi}/users`;
  const navigate = useNavigate();

  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await axios.get(`${usersUrl}?page=${page}&limit=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setData(res.data.Users || []);
      setPagination({
        current: page,
        pageSize,
        total: res.data.pagination.total,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!(isLoggedIn && isAdmin)) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [])

  const handleEdit = (id) => {
    navigate(`/${userData.company_id}/users/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendApi}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      alert(res.data.message);
      fetchUsers(pagination.current, pagination.pageSize); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  const handleTableChange = (pagination) => {
    fetchUsers(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: 'Name',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email_id',
    },
    {
      title: 'Company ID',
      dataIndex: 'company_id',
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      render: (role_id) => <strong>{role_id === 1 ? "Admin" : "Employee"}</strong>,
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record.id)} style={{ color: "green" }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
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

export default AllUsersContent;
