import React, { useState, useEffect, useContext }  from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
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
	 		<Button 
	 			mode='contained'
	 			style={styles.input}
	 			onPress={ () => handleFormSubmit() }>Login
 			</Button>
	 		<Pressable 
	 			onPress={ () => navigation.navigate('Signup') }
	 			android_ripple>
	 				<Text>New User? <Text style={{color:'coral'}}>SignUp</Text></Text>
	 		</Pressable>
   	</AuthForm>
 	);	
}


const styles = StyleSheet.create({
  input:{
  	marginBottom:24,
  	padding:8
  }
});
