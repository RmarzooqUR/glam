import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from './common/authform';
import axios from 'axios';

export default function Signup({ navigation }){
	const [values, setValues] =  useState({})

	// {registerUser} = useContext(AuthContext)

	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp)
	}

	const handleFormSubmit = () => {
		axios.post(
				'http://192.168.0.106:8000/auth/register/',
				{
					...values
				}
			)
			.then((resp)=>{
				if(resp.status != 201){
					alert(JSON.stringify(resp))
				}
				else {
					alert('You can now login')
					navigation.navigate('Login')
				}
			})
			.catch((e)=>alert(JSON.stringify(e)))
	}

  return (
  	<AuthForm pword1 = 'password1' handleChangeText={handleChangeText}>
  		<TextInput label='password2' onChangeText={(e)=>handleChangeText(e,'password2')} />
  		<TextInput label='email' onChangeText={(e)=>handleChangeText(e,'email')} />
  		<Button onPress={()=>handleFormSubmit()}>Signup</Button>
  		<Button onPress={()=>navigation.navigate('Login')}>Login instead</Button>
  	</AuthForm>
  )
}