import { jwtDecode } from 'jwt-decode';
import {useContext} from "react";
import AuthContext from '../context/AuthContext.jsx';

const verifyToken = async(token) => {
    const {setIsLoggedIn, setUserRole} = useContext(AuthContext);
    const backendApi = import.meta.env.VITE_BACKEND_API;

    if(token){
      try{
        const checkToken = await axios.get(`${backendApi}/verify-token`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });

          if(checkToken.status === 200){
            console.log(checkToken);
            setIsLoggedIn(true);
            const decodedToken = jwtDecode(token);
            console.log(`Decoded Token: ${decodedToken}`)
            setUserRole(decodedToken.role_id);
          }else{
            console.log(`Invalid Token`);
            setIsLoggedIn(false);
          }
      }
      catch(err){
        console.log(`Token Verification failed`);
        setIsLoggedIn(false);
      }
    };
  };

  export default verifyToken;