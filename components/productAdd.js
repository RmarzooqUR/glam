import React , {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, 
	Title,
	TextInput, } from 'react-native-paper';
import axios from 'axios';


export default function ProductAdd(){
	return (
		<View style={styles.content}>
			<Title>Add a new Product</Title>
			<TextInput label="Title"/>
			<TextInput label="Description" multiline={true}/>
			<TextInput label="Price"/>
			<TextInput label="Quantity"/>
			<Button onPress={
				()=>console.log('added')
			}>Add</Button>
		</View>
	)
}

const styles=StyleSheet.create({
	content:{
		padding:10
	}
});