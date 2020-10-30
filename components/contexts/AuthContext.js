import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { apiClient } from '../apiClient';

const AuthContxt = createContext();

function AuthContextProvider(
	{ children, setErrorVisibility, setErrorMsg, setLoadingState }){
	const [userdata, setUserdata] = useState();


	const setContextAndStorage = async (newdata) =>{
		try{
			setUserdata(newdata);
			setLoadingState(false);
			if(newdata){
				apiClient.defaults.headers.common['Authorization']=`Bearer ${newdata.access_token}`
			}
			const jsonString = JSON.stringify(newdata);
			await AsyncStorage.setItem('userdata', jsonString);
		}catch(e){
			console.log(e)
		}
	}


	const setErrors = (msg) =>{
		setErrorMsg(msg);
		setErrorVisibility(true);
	}

	const loginUser = (values, handleFormErrors)=>{
		apiClient.post('/auth/login/',{...values})
			.then((resp)=>{
				// set user data to asyncstorage and to context here
				setContextAndStorage(resp.data)
			},
			(e)=> {handleFormErrors(e.response.data)}
		)
		.catch(e=>setErrors(e))
	};


	const signupUser = (values, handleFormErrors)=>{
		apiClient.post('/auth/register/',{...values})
			.then((resp)=>{
				setContextAndStorage(resp.data)
			},
			(e)=>{handleFormErrors(e.response.data)}
		)
		.catch(e=>setErrors(e))
	};


	const logoutUser = () =>{
		delete apiClient.defaults.headers.common['Authorization']
		apiClient.post('/auth/logout/')
		.then(
			(res)=>{
				setContextAndStorage(null);
			},
			(e)=>setErrors(e.response.data)
		)
		.catch((e)=>setErrors(e))
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
	},[]);



	return (
			<AuthContxt.Provider value={{
					userdata:userdata, 
					setUser: setContextAndStorage,
					loginUser:loginUser,
					signupUser:signupUser,
					logoutUser:logoutUser,
					setErrors:setErrors,
				}
			}>
				{ children }
			</AuthContxt.Provider>
		)
}


export { AuthContextProvider };
export default AuthContxt;