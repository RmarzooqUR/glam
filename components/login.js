import React, { useState }  from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from './common/authform';
import axios from 'axios';


export default function Login({ navigation }){
	const [values, setValues] =  useState({})

	const handleFormSubmit = () => {
		axios.post(
				'http://192.168.0.106:8000/auth/login/',
				{
					...values
				}
			)
			.then((resp)=>{
				if(resp.status != 200){
					alert(resp)
				}
				else {
					navigation.navigate('Products')
				}
			})
			.catch((e)=>alert(e))
	}
  return (
     	<AuthForm pword1='password' setValues={setValues} values={values}>
     		<Button onPress={ () => handleFormSubmit() }>Login</Button>
     		{/*<Button onPress={ navigation.navigate('Signup') }>Signup Instead</Button>*/}
     	</AuthForm>
  )
}