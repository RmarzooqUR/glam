import React, { useState, useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
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

    const handleTextChange = (event, param) =>{
        let temp = Object.assign(values);
        temp[param] = event;
        setValues((temp)=>temp);
    }

    const handleFormSubmit = ()=>{
        apiClient.put(`/products/${route.params.currentItem.id}/edit`, {
                ...values,
                headers:{
                    'Cookie':`Token ${currContext.userdata.access_token}`
                }
            })
            .then(
                ()=>alert("Item edited"),
                (e)=>{e.status == 401?currContext.setUser(null):alert(e)})
            .then(route.params.setActive(values))
            .then(navigation.navigate('Products'))
            .then(route.params.setreRender((prev)=>!prev))
            .catch((e)=>alert(e))
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
			<TextInput label="Description" multiline={true}
                mode='outlined'
                style={styles.text}
                defaultValue = {item.description}
                onChangeText={(e) => handleTextChange(e, "description")}
            />
			<TextInput label="Price"
                mode='outlined'
                style={styles.text}
                defaultValue = {''+item.price}
                onChangeText={(e) => handleTextChange(+e, "price")}
            />
			<TextInput label="Quantity"
                mode='outlined'
                style={styles.text}
                defaultValue={''+item.qty}
                onChangeText={(e) => handleTextChange(+e, "qty")}
            />
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