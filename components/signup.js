import React, { useState, useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import AuthForm from './common/authform';
import AuthContxt from './contexts/AuthContext';

export default function Signup({ navigation }){
	const [values, setValues] =  useState({})
	const {signupUser} = useContext(AuthContxt)
  const [fieldErrors, setFieldErrors] = useState({
    username:{visible:false, message:''},
    password1:{visible:false, message:''},
    password2:{visible:false, message:''},
    email:{visible:false, message:''},
  })


	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp);
    setFieldErrors((prev)=>{return {...prev, [param]:{visible:false, message:''}}})
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
        case 'password1':
          errHelper(key,value);
          break;
        case 'password2':
          errHelper(key,value);
          break;
        case 'email':
          errHelper(key,value);
          break;
        default:
          throw(errObj);
          break;
      }
    }
  }


	const handleFormSubmit = () => {
		signupUser(values, handleFormErrors)
	}

  return (
  	<AuthForm 
      pword1 = 'password1' 
      handleChangeText={handleChangeText}
      fieldErrors={fieldErrors}>
    		<TextInput
    			mode='outlined'
  				secureTextEntry={true}
    			style={styles.input}
    			label='Re-enter Password' 
    			onChangeText={(e)=>handleChangeText(e,'password2')} />
          {fieldErrors.password2.visible &&
            <HelperText 
              visible={fieldErrors.password2.visible} 
              type='error'>
              {fieldErrors.password2.message}
            </HelperText>
          }
    		<TextInput
    			mode='outlined'
    			style={styles.input}
    			label='Email'
    			onChangeText={(e)=>handleChangeText(e,'email')} />
          {fieldErrors.email.visible &&
            <HelperText visible={fieldErrors.email.visible} type='error'>
              {fieldErrors.email.message}
            </HelperText>
          }
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
		backgroundColor:'#fff',marginBottom:10,
  }
})