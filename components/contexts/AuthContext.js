import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { apiClient } from '../apiClient';

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


	const loginUser = (values)=>{
		apiClient.post('/auth/login/',{...values})
			.then((resp)=>{
				if(resp.status != 200){
					alert(JSON.stringify(resp))
				}
				else {
					// set user data to asyncstorage and to context here
					setContextAndStorage(resp.data)
				}
			})
			.catch((e)=>alert(JSON.stringify(e)))
		};


	const signupUser = (values,navigation)=>{
		apiClient.post('/auth/register/',{...values})
			.then((resp)=>{
				if(resp.status != 201){
					alert(JSON.stringify(resp))
				}
				else {
					alert('You can now login')
					navigation.navigate('Login')
				}
			})
			.catch((e)=>alert(JSON.stringify(e)))};



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
					loginUser:loginUser,
					signupUser:signupUser,
				}
			}>
				{ children }
			</AuthContxt.Provider>
		)
}


export { AuthContextProvider };
export default AuthContxt;