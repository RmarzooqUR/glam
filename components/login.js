import React, { useState, useEffect, useContext }  from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from './common/authform';
import axios from 'axios';
import AuthContxt from './contexts/AuthContext';

export default function Login({ navigation }){
	const [values, setValues] =  useState({})
	const currContxt = useContext(AuthContxt)
	//const {loginUser} = useContext(AuthContext)


	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp)
	}


	const handleFormSubmit = () => {

		// currContxt.loginUser(values, navigation)


		axios.post(
				'http://192.168.0.106:8000/auth/login/',
				{
					...values
				}
			)
			.then((resp)=>{
				if(resp.status != 200){
					alert(JSON.stringify(resp))
				}
				else {
					// set user data to asyncstorage and to context here
					currContxt.setUser(resp.data)
					navigation.push('Products')
				}
			})
			.catch((e)=>alert(JSON.stringify(e)))
	}


  return (
	 	<AuthForm pword1='password' handleChangeText={handleChangeText}>
	 		<Button onPress={ () => handleFormSubmit() }>Login</Button>
	 		<Button onPress={ () => navigation.navigate('Signup') }>Signup Instead</Button>
   	</AuthForm>
 	);	
}