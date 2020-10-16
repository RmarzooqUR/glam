import React , {useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, 
	Title,
	TextInput, } from 'react-native-paper';
import {apiClient} from './apiClient';
import AuthContxt from './contexts/AuthContext';


export default function ProductAdd({ route, navigation }){
  const currContext = useContext(AuthContxt);
	const [values, setValues] = useState({
        "title":'',
        "description":'',
        "price":null,
        "qty":null
  })
	
	const handleChangeText = (event, param) => {
		let temp = Object.assign(values);
    temp[param] = event;
    setValues((temp)=>temp);
	}

	const handleFormSubmit = () => {
    apiClient.post('/products/add',{...values,
            headers:{
              'Cookie':`Token ${currContext.userdata.access_token}`
            }
        })
        .then(
        	()=>alert("Item added"),
        	(e)=>{e.status == 401?currContext.setUser(null):alert(e)})
        .then(navigation.goBack())
        .then(route.params.setreRender((prev)=>!prev))
        .catch((e)=>alert(e))
	}

	return (
		<View style={styles.content}>
			<Title>Add a new Product</Title>
			<TextInput label="Title"
        mode='outlined'
        style={styles.text}
        onChangeText={(e) => handleChangeText(e, "title")}
			/>
			<TextInput label="Description" multiline={true}
        mode='outlined'
        style={styles.text}
        onChangeText={(e) => handleChangeText(e, "description")}
			/>
			<TextInput label="Price"
        mode='outlined'
        style={styles.text}
        onChangeText={(e) => handleChangeText(e, "price")}
			/>
			<TextInput label="Quantity"
        mode='outlined'
        style={styles.text}
        onChangeText={(e) => handleChangeText(e, "qty")}
			/>
			<Button
				style={styles.text}
				onPress={
				()=>handleFormSubmit()
			}>Add</Button>
		</View>
	)
}

const styles=StyleSheet.create({
	content:{
		padding:10
	},
	text:{
        marginTop:24
    }
});