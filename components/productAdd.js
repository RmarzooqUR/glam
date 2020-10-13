import React , {useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, 
	Title,
	TextInput, } from 'react-native-paper';
import axios from 'axios';
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
    axios.post(
        `${route.params.baseAddr}/products/add`,
        {
            "title":values.title,
            "description":values.description,
            "price":values.price,
            "qty":values.qty,
            headers:{
              'Cookie':`Token ${currContext.userdata.access_token}`
            }
        })
        .then(alert("Item added"))
        .then(navigation.goBack())
        .then(route.params.setreRender((prev)=>!prev))
        .catch((e)=>alert(e))
	}

	return (
		<View style={styles.content}>
      <Button onPress={()=>{
      		axios.post(`${route.params.baseAddr}/auth/logout/`)
          .then(currContext.setUser(null))
      		.then(navigation.navigate('Login'))
      		.catch((e)=>alert(e))
				}
      }>
        Logout
      </Button>
			<Title>Add a new Product</Title>
			<TextInput label="Title"
        onChangeText={(e) => handleChangeText(e, "title")}
			/>
			<TextInput label="Description" multiline={true}
        onChangeText={(e) => handleChangeText(e, "description")}
			/>
			<TextInput label="Price"
        onChangeText={(e) => handleChangeText(e, "price")}
			/>
			<TextInput label="Quantity"
        onChangeText={(e) => handleChangeText(e, "qty")}
			/>
			<Button onPress={
				()=>handleFormSubmit()
			}>Add</Button>
		</View>
	)
}

const styles=StyleSheet.create({
	content:{
		padding:10
	}
});