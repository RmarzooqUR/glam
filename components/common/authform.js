import React from 'react';
import { TextInput, Button, } from 'react-native-paper';
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

export default function AuthForm(
	{ children, pword1, handleChangeText }){


	return (
			<KeyboardAvoidingView 
				style={styles.container} 
				behavior='padding'
				keyboardVerticalOffset={-300}
				>
					<TextInput 
						style={styles.input}
						mode='outlined'
						label='Username'
						onChangeText = {(e) => handleChangeText(e, 'username')} 
					/>
					<TextInput
						style={styles.input}
						mode='outlined'
						label='Password'
						secureTextEntry={true}
						onChangeText = {(e) => handleChangeText(e, pword1)}
					/>
					{children}
			</KeyboardAvoidingView>
		)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:24
  },
  input:{
  	backgroundColor:'#fff',marginBottom:24
  }
});
