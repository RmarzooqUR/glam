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
    apiClient.delete(`/products/${active.id}/delete`)
    .then(
      ()=>{
        currContext.setErrors({Success: ["Item deleted"]});
        navigation.goBack();
        route.params.setreRender((prev)=>!prev);
      },
      (e)=>{
        if(e.response.status==401){
          currContext.setErrors({'Error':['Your Session Has Expired']});
          currContext.logoutUser();
        }
        else{
          currContext.setErrors(e.response.data)
        }
      }
    )
    .catch((e)=>currContext.setErrors(e))
  }


  return (
    <View style={styles.content}>
      <Title>{active.title}</Title>
      <Paragraph>{active.description}</Paragraph>
      <Paragraph>Price: {active.price}</Paragraph>
      <Paragraph>Quantity left: {active.qty}</Paragraph>
      { currContext.userdata && currContext.userdata.user.is_admin && (
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