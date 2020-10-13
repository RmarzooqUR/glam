import React, {useState, useEffect, useContext} from 'react';
import {View,
  FlatList, 
  StyleSheet,
  TouchableOpacity } from 'react-native';
import { Card,
  Title,
  Button,
  Paragraph,} from 'react-native-paper';
import axios from 'axios';
import AuthContxt from './contexts/AuthContext';


export default function ProductList({navigation}){
	const [productList, setProductList] = useState();
	const [reRender, setreRender] = useState(false);
	const currContext = useContext(AuthContxt)

	const baseAddr = 'http://192.168.0.106:8000';


	useEffect(()=>{
		// https://gorest.co.in/public-api/posts
		axios.get(`${baseAddr}/products/`,{headers:{
			'Cookie':`Token ${currContext.userdata.access_token}`
		}})
			.then((jsonData)=>setProductList(
          jsonData.data
        ),
				(err)=>{err.status == 401?navigation.navigate('Login'):alert(err)}
      )
	},[reRender]);


  return (
    <View>
      <View style={styles.content}>

        <Button onPress={()=>{
        		axios.post(`${baseAddr}/auth/logout/`)
        		.then(currContext.setUser(null))
        		.then(navigation.navigate('Login'))
        		.catch((e)=>alert(e))
					}
        }>
          Logout
        </Button>

    		{ currContext.userdata && currContext.userdata.user.isAdmin && (
					<Button onPress={()=>navigation.navigate('Add', {
		    			setreRender,
		    			baseAddr:baseAddr
		    		})}>
		          Add a Product
	        </Button>)
	      }
			</View>


			<View>
      	<FlatList
					style={{flex:0}}
					contentContainerStyle={{paddingBottom:190}}
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