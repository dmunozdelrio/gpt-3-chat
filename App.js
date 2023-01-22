import React, { useState, useMemo, useEffect} from "react";
import {  Text, View , Button} from 'react-native';
import jwtDecode from "jwt-decode";
import {  Provider as PaperProvider} from "react-native-paper";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi , getTokenApi , removeTokenApi } from "./src/api/token";
import AppNavigation from "./src/navigation/AppNavigation";
export default function App() {
  const [auth, setAuth] = useState(undefined)

  
  
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
         setAuth({
          token, 
          idUser: jwtDecode(token).id,
        }); 
      } else {
        console.log(token);
        console.log("No hay token");
        setAuth(null);
      }
    })();
  }, []);  

  const login =(user)=>{
    //console.log("LOGIN APP.JS")
    //console.log(user);
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id  
    })

  }

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo( 
    ()=>(
      {
        auth,
        login ,
        logout,
      }),
      [auth] 
  ) 
  if (auth=== undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
    <PaperProvider>{auth ? <AppNavigation/>: (<AuthScreen/>)}</PaperProvider>
    </AuthContext.Provider>
  );
}


