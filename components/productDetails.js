import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button,
  Paragraph,
  Title } from 'react-native-paper';
import {apiClient} from './apiClient';
import AuthContxt from './contexts/AuthContext';

export default function ProductDetails({ route, navigation }){
  const [active, setActive] = useState(route.params.currentItem);
  const currContext = useContext(AuthContxt);

  const handleDelete= () =>{
    apiClient.delete(`/products/${active.id}/delete`,{
        headers:{
          'Cookie':`Token ${currContext.userdata.access_token}`
        }})
    .then(alert("Item deleted"))
    .then(navigation.goBack())
    .then(route.params.setreRender((prev)=>!prev))
    .catch((e)=>{err.status == 401?currContext.setUser(null):alert(err)})
  }


  return (
    <View style={styles.content}>
      <Button onPress={()=>{
          apiClient.post('/auth/logout/')
          .then(currContext.setUser(null))
          .catch((e)=>alert(e))
        }
      }>
        Logout
      </Button>
      <Title>{active.title}</Title>
      <Paragraph>{active.description}</Paragraph>
      <Paragraph>Price: {active.price}</Paragraph>
      <Paragraph>Quantity left: {active.qty}</Paragraph>
      { currContext.userdata && currContext.userdata.user.isAdmin && (
        <View>
          <Button onPress={
                      ()=>navigation.navigate('Edit', {
                        ...route.params,
                        setActive,
                      })}>
                    Edit</Button>
                    
          <Button onPress={
            ()=>handleDelete()}>
          Delete</Button>
        </View>)
      }

    </View>
  )
}


const styles = StyleSheet.create({
	content:{
		padding:10
	}
})