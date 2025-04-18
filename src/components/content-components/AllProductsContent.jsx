
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, List, Skeleton, Popconfirm } from 'antd';
import axios from "axios";
import AuthContext from '../../context/AuthContext';
import ProductsSelectContext from '../../context/ProductsSelectContext';

const count = 10;



const AllProductsContent = () => {

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    const {isLoggedIn, authToken, backendApi, userData} = useContext(AuthContext);
    const {productSelection, setProductSelection, siderSelection, setSideSelection} = useContext(ProductsSelectContext);

    const productsUrl = `${backendApi}/products/`;
    const navigate = useNavigate();

    useEffect(() => {   
        if(!(isLoggedIn)){
            navigate("/login"); 
        }

        axios.get(`${productsUrl}?page=${page}&limit=${count}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            count
        }).then(res => {
            const products = res.data.Products;
            console.log(products);
            setInitLoading(false);  
            setData(()=>products);
            setList(()=>products);

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
        axios.get(`${productsUrl}?page=${nextPage}&limit=${count}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => {
            const newData = data.concat(res.data.Products);
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
      navigate(`/${userData.company_id}/products/${e}`);
    };

    console.log(productSelection)

    const handleDelete = async(e) => {
      try{
          console.log(`Handle Delete: ${e}`);
        
          const res = await axios.delete(`${backendApi}/products/${e}`,{
            headers: {
              Authorization : `Bearer ${authToken}`,
            }
          })
    
          alert(res.data.message);

          const data = await axios.get(productsUrl,{
            headers: {
                Authorization: `Bearer ${authToken}`
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
                  if(!item || !item.loading){
                    return (
                      <List.Item
                          actions={[
                              <a key={`edit-${item.id}`} style={{color: "green"}}
                                onClick={()=>{handleEdit(item.id)}}
                              >Edit</a>, 
                              <Popconfirm
                              title="Are you sure you want to delete this product?"
                              onConfirm={() => handleDelete(item.id)}
                              okText="Yes"
                              cancelText="No"
                              key={`delete-${item.id}`}
                              >
                                <a style={{ color: "red" }}>Delete</a>
                              </Popconfirm>
                            ]}
                      >
                          <Skeleton avatar title={false} loading={item.loading} active>
                          <List.Item.Meta
                              avatar={<Avatar src={item?.picture?.large} />}
                              title={`${item?.product_name}`
                              }
                              description={`"Descriptiom" : "${item.product_description}" ,  "CompanyId": "${item.company_id}"  , "Product Quantity": ${item.available_stock}, "Product SKU: ${item.product_sku},"Product Image: ${item.product_image}`}
                          />
                          </Skeleton>
                      </List.Item>
                      );
                  }
              }}
          />
        </>
    );
};

export default AllProductsContent;