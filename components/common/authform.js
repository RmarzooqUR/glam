import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

export default function AuthForm(
	{ children, pword1, handleChangeText, fieldErrors }){


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
					{fieldErrors.username.visible &&
						<HelperText visible={fieldErrors.username.visible} type='error'>
							{fieldErrors.username.message}
						</HelperText>
					}
					<TextInput
						style={styles.input}
						mode='outlined'
						label='Password'
						secureTextEntry={true}
						onChangeText = {(e) => handleChangeText(e, pword1)}
					/>
					{fieldErrors[pword1].visible &&
						<HelperText visible={fieldErrors[pword1].visible} type='error'>
							{fieldErrors[pword1].message}
						</HelperText>
					}
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
  	backgroundColor:'#fff', marginBottom:10
  }
});
