import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
const AuthContxt = createContext();

function AuthContextProvider({ children }){
	const [userdata, setUserdata] = useState();

	const setContextAndStorage = async (newdata)=>{
		setUserdata(newdata);
		try{
			const jsonString = JSON.stringify(newdata);
			await AsyncStorage.setItem('userdata', newdata)
		}
		catch(e){
			console.log(e)
		}
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
	useEffect(()=>{
		const dataFromStorage = fetchFromStorage()
		if(dataFromStorage){
			setContext(dataFromStorage);
		}
	});

	return (
			<AuthContxt.Provider value={{
					userdata:userdata, 
					setUser: setContextAndStorage,
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