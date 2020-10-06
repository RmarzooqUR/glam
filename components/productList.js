import React, {useState, useEffect} from 'react';
import {View,
  FlatList, 
  StyleSheet,
  TouchableOpacity } from 'react-native';
import { Card,
  Title,
  Button,
  Paragraph,} from 'react-native-paper'
import axios from 'axios'



export default function ProductList({navigation}){
	const [productList, setProductList] = useState();
	const [reRender, setreRender] = useState(false);
	const baseAddr = 'http://192.168.0.104:8000';
	useEffect(()=>{
		// https://gorest.co.in/public-api/posts
		axios.get(`${baseAddr}/products/`)
			.then((jsonData)=>setProductList(
          jsonData.data
        )
      )
			.catch((err)=> alert(err))
	},[reRender]);

	
  return (
    <View>
      <View style={styles.content}>
    		<Button onPress={()=>navigation.navigate('Add', {
    			setreRender,
    			baseAddr:baseAddr
    		})}>
          Add a Product
        </Button>
			</View>
			<View>
      	<FlatList
					style={{flex:0}}
					contentContainerStyle={{paddingBottom:110}}
        	data={productList}
        	keyExtractor={(item)=>''+item.id}
        	renderItem = {({item})=>(
            <TouchableOpacity style={styles.content}>
          		
							<Card>
								<Card.Content>
									<Title>{item.title}</Title>
									<Paragraph>{item.description}</Paragraph>
								</Card.Content>

								<Card.Actions>
									<Button onPress={()=>navigation.navigate('Details', {
										currentItem:item,
										baseAddr:baseAddr,
										setreRender
									})}>
											Details
									</Button>
								</Card.Actions>
							</Card>

            </TouchableOpacity>
      		)}
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