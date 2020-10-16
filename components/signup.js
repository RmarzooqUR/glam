import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, Pressable } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
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
  		<TextInput
  			mode='outlined'
				secureTextEntry={true}
  			style={styles.input}
  			label='Re-enter Password' 
  			onChangeText={(e)=>handleChangeText(e,'password2')} />
  		<TextInput
  			mode='outlined'
  			style={styles.input}
  			label='Email'
  			onChangeText={(e)=>handleChangeText(e,'email')} />
  		<Button
  			mode='contained'
  			style={{padding:8, marginBottom:24}}
  			onPress={()=>handleFormSubmit()}>Signup
			</Button>
  		<Pressable onPress={()=>navigation.navigate('Login')}>
  			<Text>Back to <Text style={{color:'coral'}}>Login</Text></Text>
  		</Pressable>
  	</AuthForm>
  )
}

const styles = StyleSheet.create({
	input:{
		backgroundColor:'#fff',
  	marginBottom:24,
  }
})