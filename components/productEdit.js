import React, { useEffect, useState, useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import axios from 'axios';
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

    const handleTextChange = (event, param) =>{
        let temp = Object.assign(values);
        temp[param] = event;
        setValues((temp)=>temp);
    }

    const handleFormSubmit = ()=>{
        axios.put(
            route.params.baseAddr
            +'/products/'
            +route.params.currentItem.id
            +'/edit', {
                ...values,
                headers:{
                    'Cookie':`Token ${currContext.userdata.access_token}`
                }
            })
            .then(alert("Item edited"))
            .then(route.params.setActive(values))
            .then(navigation.navigate('Products'))
            .then(route.params.setreRender((prev)=>!prev))
            .catch((e)=>alert(e))
    };

    return (
        <View style={styles.content}>
            <Button onPress={()=>{
                    axios.post(`${route.params.baseAddr}/auth/logout/`)
                    .then(currContext.setUser(null))
                    .catch((e)=>alert(e))
                        }
            }>
              Logout
            </Button>
			<Title>Edit this Product</Title>
            <TextInput label="Title" 
                defaultValue={item.title}
                onChangeText={(e) => handleTextChange(e, "title")}
            />
			<TextInput label="Description" multiline={true}
                defaultValue = {item.description}
                onChangeText={(e) => handleTextChange(e, "description")}
            />
			<TextInput label="Price"
                defaultValue = {''+item.price}
                onChangeText={(e) => handleTextChange(+e, "price")}
            />
			<TextInput label="Quantity"
                defaultValue={''+item.qty}
                onChangeText={(e) => handleTextChange(+e, "qty")}
            />
			<Button onPress={
                ()=>handleFormSubmit()
            }>Edit</Button>
		</View>
    )
}

const styles = StyleSheet.create({
    content:{
        padding:10
    }
});