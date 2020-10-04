import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button,
  Paragraph,
  Title } from 'react-native-paper'

export default function ProductDetails({ route, navigation }){
  return (
    <View style={styles.content}>
      <Title>{route.params.currentItem.title}</Title>
      <Paragraph>{route.params.currentItem.description}</Paragraph>
      <Paragraph>Price: {route.params.currentItem.price}</Paragraph>
      <Paragraph>Quantity left: {route.params.currentItem.qty}</Paragraph>
      <Button onPress={
        ()=>navigation.navigate('Edit', {
          currentItem:route.params.currentItem
        })}>
      Edit</Button>
      
      <Button onPress={
        ()=>alert('Item deleted')}>
      Delete</Button>

    </View>
  )
}


const styles = StyleSheet.create({
	content:{
		padding:10
	}
})