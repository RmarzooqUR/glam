import React, { useState, useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Title, Button, HelperText } from 'react-native-paper';
import {apiClient} from './apiClient';
import AuthContxt from './contexts/AuthContext';


export default function ProductEdit({ route, navigation }){
	const currContext = useContext(AuthContxt);
	const item = route.params.currentItem;

	const [values, setValues] = useState({
		"title":item.title,
		"description":item.description,
		"price":item.price,
		"qty":item.qty
	})

	const [localErrors, setLocalErrors] = useState({
		title:{visible:false, message:''},
		description:{visible:false, message:''},
		price:{visible:false, message:''},
		qty:{visible:false, message:''},
	})

	const handleTextChange = (event, param) =>{
		let temp = Object.assign(values);
		temp[param] = event;
		setValues((temp)=>temp);
		setLocalErrors((prev)=>{return {...prev, [param]:{visible:false, message:''}}})
	}


	const errHelper = (key,value) =>{
		setLocalErrors((prev)=>{
			return {
				...prev,
			 [key]:{visible:true, message:value[0]}
			}})
	}

	const handelFormErrors = (errObj) =>{
		for(const [key, value] of Object.entries(errObj)){
			switch(key){
				case 'title':
					errHelper(key, value)
					break;
				case 'description':
					errHelper(key,value)
					break;
				case 'price':
					errHelper(key,value)
					break;
				case 'qty':
					errHelper(key,value)
					break;
				default:
					throw({Error:["Unexpected Error"]})
			}
		}
	}


	const handleFormSubmit = ()=>{
		apiClient.put(`/products/${route.params.currentItem.id}/edit`, {...values})
			.then(
				()=>{
					currContext.setErrors({Success:["Item edited"]});
					route.params.setActive(values);
					navigation.goBack();
					route.params.setreRender((prev)=>!prev);
				},
				(e)=>{
					// use switch case to validate on 400
					switch(e.response.status){
						case 401:
							currContext.setErrors(e.response.data);
							currContext.logoutUser();
							break;
						case 400:
							handelFormErrors(e.response.data);	//change this
							break;
						default:
							throw(e.response.data)
					}
				}
			)
			.catch((e)=>currContext.setErrors(e))
	};

	return (
		<View style={styles.content}>
			<Title>Edit this Product</Title>
			<TextInput label="Title"
				mode='outlined'
				style={styles.text}
				defaultValue={item.title}
				onChangeText={(e) => handleTextChange(e, "title")}
			/>
			{localErrors.title.visible && 
				<HelperText type='error' visible={localErrors.title.visible}>
					{localErrors.title.message}
				</HelperText>}
			<TextInput label="Description" multiline={true}
				mode='outlined'
				style={styles.text}
				defaultValue = {item.description}
				onChangeText={(e) => handleTextChange(e, "description")}
			/>
			{localErrors.description.visible &&
				<HelperText type='error' visible={localErrors.description.visible}>
					{localErrors.description.message}
				</HelperText>}
			<TextInput label="Price"
				mode='outlined'
				style={styles.text}
				defaultValue = {''+item.price}
				keyboardType = {'numeric'}
				onChangeText={(e) => handleTextChange(+e, "price")}
			/>
			{localErrors.price.visible &&
				<HelperText type='error' visible={localErrors.price.visible}>
					{localErrors.price.message}
				</HelperText>}
			<TextInput label="Quantity"
				mode='outlined'
				style={styles.text}
				defaultValue={''+item.qty}
				keyboardType = {'numeric'}
				onChangeText={(e) => handleTextChange(+e, "qty")}
			/>
			{localErrors.qty.visible &&
				<HelperText type='error' visible={localErrors.qty.visible}>
					{localErrors.qty.message}
				</HelperText>}
			<Button
				style={styles.text}
				onPress={
				()=>handleFormSubmit()
			}>Edit</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	content:{
		padding:10
	},
	text:{
		marginTop:24
	}
});