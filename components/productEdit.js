import React from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper'

export default function ProductEdit({ route }){
    return (
        <View style={styles.content}>
			<Title>Add a new Product</Title>
            <TextInput label="Title" 
                defaultValue={route.params.currentItem.title}
            />
			<TextInput label="Description" multiline={true}
                defaultValue = {route.params.currentItem.description}
            />
			<TextInput label="Price"
                defaultValue = {''+route.params.currentItem.price}
            />
			<TextInput label="Quantity"
                defaultValue={''+route.params.currentItem.qty}
            />
			<Button onPress={
                ()=>console.log('added')
            }>Add</Button>
		</View>
    )
}

const styles = StyleSheet.create({
    content:{
        padding:10
    }
});