import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button,
  Paragraph,
  Title } from 'react-native-paper';
import axios from 'axios';


export default function ProductDetails({ route, navigation }){
  const [active, setActive] = useState(route.params.currentItem);
  
  const handleDelete= () =>{
    axios.delete(
      `${route.params.baseAddr}/products/${active.id}/delete`,
      {
        withCredentials:true,
      })
    .then(alert("Item deleted"))
    .then(route.params.setreRender((prev)=>!prev))
    .then(navigation.goBack())
    .catch((e)=>alert(e))
  }


  return (
    <View style={styles.content}>
      <Title>{active.title}</Title>
      <Paragraph>{active.description}</Paragraph>
      <Paragraph>Price: {active.price}</Paragraph>
      <Paragraph>Quantity left: {active.qty}</Paragraph>
      <Button onPress={
        ()=>navigation.navigate('Edit', {
          ...route.params,
          setActive,
          baseAddr:route.params.baseAddr
        })}>
      Edit</Button>
      
      <Button onPress={
        ()=>handleDelete()}>
      Delete</Button>

    </View>
  )
}


const styles = StyleSheet.create({
	content:{
		padding:10
	}
})