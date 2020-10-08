import React from 'react';
import { TextInput, Button, } from 'react-native-paper';
import { View } from 'react-native'

export default function AuthForm(
	{ children, pword1, handleChangeText }){


	return (
			<View>
				<TextInput 
					label='Username'
					onChangeText = {(e) => handleChangeText(e, 'username')} 
				/>
				<TextInput
					label={pword1}
					onChangeText = {(e) => handleChangeText(e, pword1)}
				/>
				{children}
			</View>
		)
}