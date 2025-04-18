import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import allUserContentComponent from "./content-components/AllUserContentComponent";
import AuthContext from "../context/AuthContext";

const contentComponent = () => {
    const {isLoggedIn, setIsLoggedIn, userData, setUserData, isAdmin, isUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/login");
        }
    });

    return(
        <>
    

        </>
    );

};

export default contentComponent;