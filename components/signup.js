import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AuthForm from './common/authform';
import AuthContxt from './contexts/AuthContext';


export default function Signup({ navigation }){
	const [values, setValues] =  useState({})
	const {signupUser} = useContext(AuthContxt)

	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp)
	}

	const handleFormSubmit = () => {
		signupUser(values, navigation)
	}

  return (
  	<AuthForm pword1 = 'password1' handleChangeText={handleChangeText}>
  		<TextInput label='Re-enter Password' onChangeText={(e)=>handleChangeText(e,'password2')} />
  		<TextInput label='Email' onChangeText={(e)=>handleChangeText(e,'email')} />
  		<Button onPress={()=>handleFormSubmit()}>Signup</Button>
  		<Button onPress={()=>navigation.navigate('Login')}>Login instead</Button>
  	</AuthForm>
  )
}