import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import axios from 'axios'

export default function ProductList({navigation}){
	const [productList, setProductList] = useState();

	useEffect(()=>{
		// https://gorest.co.in/public-api/posts
		// http://localhost:8000/products/
		axios.get('https://93bfb38deafe.ngrok.io/products/')
			.then((jsonData)=>setProductList(jsonData.data))
			.catch((err)=> alert("error"+err))
	},[]);

  return (
    <View style={styles.content}>
      <View>
      	<FlatList
        	data={productList}
        	keyExtractor={(item)=>item.id}
        	renderItem = {({item})=>(
        		<View>
        			<Text>{item.title}</Text>
        			<Button 
	            	title='Details' 
	            	onPress={()=>navigation.navigate('Details')}
        			/>
      			</View>
      		)}
      	/>
    	</View>
    	<View style={styles.content}>
	    	<Button
					title='Add'
					onPress={()=>navigation.navigate('Add')}
				/>	
    	</View>
    </View>
  )
}

const styles = StyleSheet.create({
	content:{
		padding:10
	}
})