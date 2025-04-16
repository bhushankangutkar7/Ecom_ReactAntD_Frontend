import React, {useState,useEffect} from "react";
import ProductCard from "../components/ProductCard";
import {Flex, Card, Space} from "antd";
import axios from "axios";

const home = () => {    

    const [productArr, setProductArr] = useState([]);

    const getAllUsers = async() => {
        const backendApi = import.meta.env.VITE_BACKEND_API;
    
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
                                <Card title= {product.product_name}
                                variant = "borderless"
                                style={{ width: 300, textWrap: "wrap" }}>
                                    <p>{product.product_description}</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
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