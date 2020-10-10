import React, { useState, useEffect, useContext }  from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from './common/authform';
import axios from 'axios';
import Consumer from './contexts/globalcontext';

export default function Login({ navigation }){
	const [values, setValues] =  useState({})
	
	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp)
	}

	const handleFormSubmit = (ctx) => {
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
					// const currContxt = useContext(Contxt)
					ctx.setUserdata(resp.data)
					navigation.push('Products')
				}
			})
			.catch((e)=>alert(JSON.stringify(e)))
	}

	useEffect(()=>{
		// get data from value of context's consumer and
		// login with the given value
		// 		- this component uses values state 
		// if not found do nothing
		// or can do it in consumers value callback
	})


  return (
  	<Consumer>
  		{(ctx) => {
  			return (
		     	<AuthForm pword1='password' handleChangeText={handleChangeText}>
		     		<Button onPress={ () => handleFormSubmit(ctx) }>Login</Button>
		     		<Button onPress={ () => navigation.navigate('Signup') }>Signup Instead</Button>
		     	</AuthForm>);
  			}}
   	</Consumer>
  );
}