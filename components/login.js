import React, { useState }  from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from './common/authform';
import axios from 'axios';


export default function Login({ navigation }){
	const [values, setValues] =  useState({})
	

	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp)
	}

	const handleFormSubmit = () => {
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
  )
}