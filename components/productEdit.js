import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import axios from 'axios';


export default function ProductEdit({ route, navigation }){

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
        // setValues((prevValues)=>{
        //     prevValues[param] = event;
        //     console.log(prevValues)
        //     return prevValues;
        // });
        setValues((temp)=>temp);
    }

    const handleFormSubmit = ()=>{
        axios.put(
            route.params.baseAddr
            +'/products/'
            +route.params.currentItem.id
            +'/edit', {
                "title":values.title,
                "description":values.description,
                "price":values.price,
                "qty":values.qty,
                withCredentials:true,
            })
            .then(alert("Item edited"))
            .then(route.params.setActive(values))
            .then(route.params.setreRender((prev)=>!prev))
            .then(navigation.navigate('Products'))
            .catch((e)=>alert(e))
    };

    return (
        <View style={styles.content}>
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