import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';


export default function ProductDetails({ currentProduct, navigation }){
  return (
    <View style={styles.content}>
      <Text>Currently in ProductDetails</Text>
      <Button 
      	title='Edit' 
      	onPress={()=>navigation.navigate('Edit')}
			/>
		<Button 
    	title='Delete' 
		/>
    </View>
  )
}


const styles = StyleSheet.create({
	content:{
		padding:10
	}
})