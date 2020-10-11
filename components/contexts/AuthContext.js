import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
const AuthContxt = createContext();

function AuthContextProvider({ children }){
	const [userdata, setUserdata] = useState();

	const setContext = (newdata)=>{
		setUserdata(newdata)
	}

  const fetchFromStorage = async ()=>{
    try{
      const jsonString = await AsyncStorage.getItem('userdata');
      return jsonString != null? JSON.parse(jsonString): null;
    }catch(e){
      console.log(e)
    }
  }

	// const loginUser = (values, navigation)=>{};
	// const registerUser = (values, navigation)=>{};
	// const logoutUser = (navigation)=>{};

	// useEffect to set context from AsyncStorage


	return (
			<AuthContxt.Provider value={{
					userdata:userdata, 
					setUser: setContext,
					// loginUser:loginUser,
					// registerUser:registerUser
				}
			}>
				{ children }
			</AuthContxt.Provider>
		)
}
export { AuthContextProvider };
export default AuthContxt;