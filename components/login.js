import React, { useState, useContext }  from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AuthForm from './common/authform';
import AuthContxt from './contexts/AuthContext';

export default function Login({ navigation }){
	const [values, setValues] =  useState({})
	const {loginUser} = useContext(AuthContxt)
  const [fieldErrors, setFieldErrors] = useState({
    username:{visible:false, message:''},
    password:{visible:true, message:''},
  })

	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp);
    setFieldErrors((prev)=>{return {...prev, [param]:{visible:false, message:''}}});
	}


  const errHelper = (key,value) =>{
    setFieldErrors((prev)=>{
      return {
        ...prev,
       [key]:{visible:true, message:value[0]}
      }})
  }
  const handleFormErrors = (errObj) =>{
    for(const [key,value] of Object.entries(errObj)){
      switch(key){
        case 'username':
          errHelper(key,value);
          break;
        case 'password':
          errHelper(key,value);
          break;
        default:
          throw(errObj);
          break;
      }
    }
  }

	const handleFormSubmit = () => {
		loginUser(values, handleFormErrors)
	}

  return (
	 	<AuthForm 
	 		pword1='password' 
	 		handleChangeText={handleChangeText}
	 		fieldErrors={fieldErrors}>
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
