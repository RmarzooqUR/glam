import React, {useState, useEffect} from 'react';
import {View,
  FlatList, 
  StyleSheet,
  TouchableOpacity } from 'react-native';
import { Card,
  Title,
  Button } from 'react-native-paper'
import axios from 'axios'



export default function ProductList({navigation}){
	const [productList, setProductList] = useState();

	useEffect(()=>{
		// https://gorest.co.in/public-api/posts
		// http://localhost:8000/products/
		axios.get('http://192.168.0.104:8000/products/')
			.then((jsonData)=>setProductList(
          jsonData.data
        )
      )
			.catch((err)=> alert(err))
	},[]);

  return (
    <View style={styles.content}>
      <View>
      	<FlatList
        	data={productList}
        	keyExtractor={(item)=>item.id}
        	renderItem = {({item})=>(
            <TouchableOpacity style={styles.content}>
          		<Card>
                <Card.Content>
            			<Title>{item.title}</Title>
            			<Button onPress={()=>navigation.navigate('Details')}>
                    Details
            			</Button>
                </Card.Content>
        			</Card>
            </TouchableOpacity>
      		)}
      	/>
    	</View>
    	<View style={styles.content}>
	    	<Button onPress={()=>navigation.navigate('Add')}>
          Add
        </Button>
    	</View>
    </View>
  )
}

const styles = StyleSheet.create({
	content:{
		padding:10
	}
})