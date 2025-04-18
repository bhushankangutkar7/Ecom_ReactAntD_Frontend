
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, List, Skeleton, Popconfirm } from 'antd';
import axios from "axios";
import AuthContext from '../../context/AuthContext';

const count = 10;


const AllUsersContent = () => {

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    const {isLoggedIn, isAdmin, authToken, backendApi, userData} = useContext(AuthContext);

    const usersUrl = `${backendApi}/users`;

    const navigate = useNavigate();

    useEffect(() => {   
        if(!(isLoggedIn && isAdmin)){
            navigate("/login");
        }

        axios.get(`${usersUrl}?page=${page}&limit=${count}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then(res => {
            setInitLoading(false);
            setData(res.data.Users);
            setList(res.data.Users);

        })
        .catch(err=> console.log(err));

    }, []);
    
    const onLoadMore = () => {
      setLoading(true);
      const nextPage = page + 1;
      setList(
        data.concat(
          Array.from({ length: count }).map(() => ({ loading: true, name: {}, picture: {} })),
        ),
      );
        axios.get(`${usersUrl}?page=${nextPage}&limit=${count}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => {
            const newData = data.concat(res.data.Users);
            setData(()=>newData);
            setList(()=>newData);
            setLoading(false);
            setPage(prev => prev + 1);
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
        });
    };
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
    ) : null;


    const handleEdit = (e) => {
      navigate(`/${userData.company_id}/users/${e}`);
    };


    const handleDelete = async(e) => {
      try{
        const res = await axios.delete(`${backendApi}/users/${e}`, {
          headers: {
            Authorization : `Bearer ${authToken}`,
          }
        });

        alert(res.data.message);

        const data = await axios.get(usersUrl, {
          headers : {
            Authorization : `Bearer ${authToken}`
          },
          count
        });

        const products = data.data.Products;
        console.log(products);
        setInitLoading(false);
        setData(products);
        setList(products);
      }
      catch(err){
        console.log(err);
      }

    };

    return(
        <>      
          <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              style={{
                  margin: 20,
              }}
              renderItem={item => {
                  var _a;
                  return (
                  <List.Item
                      actions={[
                          <a key={`${item.role_id}`} style={{color: "green"}}
                          onClick={()=>handleEdit(item.id)}
                          >Edit</a>, 
                          <Popconfirm
                          title="Are you sure you want to delete this User?"
                          onConfirm={()=>handleDelete(item.id)}
                          okText="Yes"
                          cancelText="No"
                          >
                            <a key={`${item.role_id}`} style={{color: "red"}}>Delete</a>
                          </Popconfirm>
                          
                      ]}
                  >
                      <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                          avatar={<Avatar src={item?.picture?.large} />}
                          title={`${item.first_name} ${item.last_name}`
                          }
                          description={`"EmailId" : "${item.email_id}" ,  "CompanyId": "${item.company_id}"  ,  "User Role": "${item.role_id}"`}
                      />
                      <div><strong>{item.role_id === 1? "Admin": "Employee"}</strong></div>
                      </Skeleton>
                  </List.Item>
                  );
              }}
          />
        </>
    );
};

export default AllUsersContent;