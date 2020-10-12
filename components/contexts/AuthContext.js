import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
const AuthContxt = createContext();

function AuthContextProvider({ children }){
	const [userdata, setUserdata] = useState();

	const setContextAndStorage = async (newdata) =>{
		setUserdata(newdata);
		try{
			const jsonString = JSON.stringify(newdata);
			await AsyncStorage.setItem('userdata', jsonString);
		}catch(e){
			console.log(e)
		}
	}


	// const loginUser = (values, navigation)=>{};
	// const registerUser = (values, navigation)=>{};
	// const logoutUser = (navigation)=>{};



	// useEffect to set context from AsyncStorage
	useEffect(()=>{
		const fetchFromStorage = async () =>{
			let jsonString = null;
			try{
	      jsonString = await AsyncStorage.getItem('userdata');
    	}catch(e){
      	console.log(e);
    	}
    	jsonString != null? setUserdata(JSON.parse(jsonString)):setUserdata(null)
		};

		fetchFromStorage();
	},[]);



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