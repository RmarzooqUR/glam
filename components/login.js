import React, { useState, useEffect, useContext }  from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from './common/authform';
import AuthContxt from './contexts/AuthContext';

export default function Login({ navigation }){
	const [values, setValues] =  useState({})
	const {loginUser} = useContext(AuthContxt)

	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp)
	}

	const handleFormSubmit = () => {
		loginUser(values)
	}

  return (
	 	<AuthForm pword1='password' handleChangeText={handleChangeText}>
	 		<Button onPress={ () => handleFormSubmit() }>Login</Button>
	 		<Button onPress={ () => navigation.navigate('Signup') }>Signup Instead</Button>
   	</AuthForm>
 	);	
}