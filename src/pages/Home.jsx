import React, {useState,useEffect, useContext} from "react";
import {Flex, Card, Space} from "antd";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const home = () => {    

    const {backendApi} = useContext(AuthContext);
    const [productArr, setProductArr] = useState([]);

    const getAllUsers = async() => {
    
        try{
            const prodResponse = await axios.get(`${backendApi}/products`);
            setProductArr(prodResponse.data.Products);
        }
        catch(err){
            console.log(err);

        }
    };


    useEffect(()=>{ 
        getAllUsers();
    },[]);


    return(
        <>
            <div 
            style={{margin: 50}}
            >
                <h1>Home Products</h1>
                <Flex wrap gap="small" style={{margin: 30, gap: 20}}>
                    {
                        productArr.map((product)=>(
                            <Space direction="vertical" size={16} style={{textWrap: "wrap"}}>
                                <Card title= {<h3>{product.product_name}</h3>}
                                variant = "borderless"
                                style={{ width: 300, height: 500, textWrap: "wrap" }}
                                key={product.product_id}
                                >
                                    <img src={`${backendApi}/uploads/products/${product.product_image.replace(/^.*[\\/]/, '')}`} alt={`${product.product_name}`} 
                                    style={{ 
                                        width: "100%", 
                                        height: "200px", 
                                        objectFit: "contain", 
                                        display: "block", 
                                        marginBottom: "1rem" 
                                      }} 
                                    />
                                    <p><strong>Product Description:</strong> {product.product_description}</p>
                                    <p><strong>Product SKU:</strong> {product.product_sku}</p>
                                    <p><strong>Available Quantity:</strong> {product.available_stock}</p>
                                    <p><strong>Price:</strong> {product.product_price}</p>
                                </Card>
                            </Space>
                        ))
                    }
                </Flex>
            </div>
        </>
    );
};

export default home;