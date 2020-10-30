import React, {useState, useEffect, useContext} from 'react';
import {View,
  FlatList, 
  StyleSheet,
  TouchableOpacity } from 'react-native';
import { Card,
  Title,
  Button,
  Paragraph,} from 'react-native-paper';
import {apiClient} from './apiClient';
import AuthContxt from './contexts/AuthContext';


export default function ProductList({navigation}){
	const [productList, setProductList] = useState([]);
	const [reRender, setreRender] = useState(false);
	const currContext = useContext(AuthContxt)



	useEffect(()=>{
		// https://gorest.co.in/public-api/posts
		//this logs the proper access token on signup
		apiClient.get('/products/')
				.then((jsonData)=>{
						setProductList(jsonData.data)},
					(e)=>{
		        if(e.response.status==401){
		          currContext.setErrors({'Error':['Your Session Has Expired']});
		          currContext.logoutUser();
		        }
		        else{
		          currContext.setErrors(e.response.data)
		        }
		      }
	  		);
		
	},[reRender]);


  return (
    <View>
      <View style={styles.content}>
    		{ currContext.userdata && currContext.userdata.user.is_admin && (
					<Button 
						onPress={()=>navigation.navigate('Add', {
	    			setreRender,
	    		})}>
	          Add a Product
	        </Button>)
	      }
			</View>

			{!productList.length?(
					<View>
						<Card>
							<Card.Content>
								<Title>Sold out</Title>
								<Paragraph>All the products have been sold</Paragraph>
							</Card.Content>
						</Card>
					</View>
				):(
					<View>
		      	<FlatList
							style={{flex:0}}
							contentContainerStyle={{paddingBottom:115}}
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
											<Button
												onPress={()=>navigation.navigate('Details', {
													currentItem:item,
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
				)}
    </View>
  )
}

const styles = StyleSheet.create({
	content:{
		padding:10
	}
})