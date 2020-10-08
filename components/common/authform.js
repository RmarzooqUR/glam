import React from 'react';
import { TextInput, Button, } from 'react-native-paper';
import { View } from 'react-native'

export default function AuthForm({ children, pword1, values, setValues }){

	const handleChangeText = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp)
	}

	return (
			<View>
				<TextInput 
					label='Username' placeholer='username'
					onChangeText = {(e) => handleChangeText(e, 'username')} 
				/>
				<TextInput
					label='Password' placeholer={pword1}
					onChangeText = {(e) => handleChangeText(e, pword1)}
				/>
				{children}
			</View>
		)
}