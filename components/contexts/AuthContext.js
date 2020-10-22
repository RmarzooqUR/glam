import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { apiClient } from '../apiClient';

const AuthContxt = createContext();

function AuthContextProvider({ children }){
	const [userdata, setUserdata] = useState();

	const setContextAndStorage = async (newdata) =>{
		try{
			setUserdata(newdata);
			if(newdata){
				apiClient.defaults.headers.common['Authorization']=`Bearer ${newdata.access_token}`
			}
			const jsonString = JSON.stringify(newdata);
			await AsyncStorage.setItem('userdata', jsonString);
		}catch(e){
			console.log(e)
		}
	}


	const loginUser = (values)=>{
		apiClient.post('/auth/login/',{...values})
			.then((resp)=>{
				// set user data to asyncstorage and to context here
				setContextAndStorage(resp.data)
			},
			(e)=> {alert(JSON.stringify(e.response.data))}
		)
		.catch(e=>alert(e))
	};


	const signupUser = (values)=>{
		apiClient.post('/auth/register/',{...values})
			.then((resp)=>{
				// alert('You can now login')
				// navigation.navigate('Login')
				setContextAndStorage(resp.data)
			},
			(e)=>{alert(JSON.stringify(e.response.data))}
		)
		.catch(e=>alert(e))
	};


	const logoutUser = () =>{
		delete apiClient.defaults.headers.common['Authorization']
		apiClient.post('/auth/logout/')
		.then(
			(res)=>{
				setContextAndStorage(null);
			},
			(e)=>alert(JSON.stringify(e.response.data))
		)
		.catch((e)=>alert(e))
	}



	// useEffect to set context from AsyncStorage
	useEffect(()=>{
		const fetchFromStorage = async () =>{
			let jsonString = null;
			try{
	      jsonString = await AsyncStorage.getItem('userdata');
    	}catch(e){
      	console.log(e);
    	}
    	jsonString != null? setContextAndStorage(JSON.parse(jsonString)):setContextAndStorage(null)
		};

		fetchFromStorage();
		// could set default axios instance cookie here
	},[]);



	return (
			<AuthContxt.Provider value={{
					userdata:userdata, 
					setUser: setContextAndStorage,
					loginUser:loginUser,
					signupUser:signupUser,
					logoutUser:logoutUser,
				}
			}>
				{ children }
			</AuthContxt.Provider>
		)
}


export { AuthContextProvider };
export default AuthContxt;