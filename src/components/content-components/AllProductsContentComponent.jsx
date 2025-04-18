
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, List, Skeleton } from 'antd';
import axios from "axios";
import AuthContext from '../../context/AuthContext';

const count = 10;
const usersUrl = `${import.meta.env.VITE_BACKEND_API}/products`;


const AllProductsContentComponent = () => {

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const {isLoggedIn, isAdmin} = useContext(AuthContext);

    const navigate = useNavigate();
    

    const authToken = localStorage.getItem("authToken");

    useEffect(() => {   
        if(!(isLoggedIn)){
            navigate("/login");
        }

        axios.get(usersUrl,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then(res => {
            console.log(res.data);
            setInitLoading(false);
            setData(res.data.Products);
            setList(res.data.Products);

        })
        .catch(err=> console.log(err));

    }, []);
    
    const onLoadMore = () => {
      setLoading(true);
      setList(
        data.concat(
          Array.from({ length: count }).map(() => ({ loading: true, name: {}, picture: {} })),
        ),
      );
      fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
          const newData = data.concat(res.results);
          setData(newData);
          setList(newData);
          setLoading(false);
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
                          <a key={`${item.role_id}`} style={{color: "green"}}>Edit</a>, 
                          <a key={`${item.role_id}`} style={{color: "red"}}>Delete</a>
                      ]}
                  >
                      <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                          avatar={<Avatar src={item?.picture?.large} />}
                          title={`${item.product_name}`
                          }
                          description={`"Descriptiom" : "${item.product_description}" ,  "CompanyId": "${item.company_id}"  , "Product Quantity": ${item.available_stock}, "Product SKU: ${item.product_sku},"Product Image: ${item.product_image}`}
                      />
                      </Skeleton>
                  </List.Item>
                  );
              }}
          />
        </>
    );
};

export default AllProductsContentComponent;