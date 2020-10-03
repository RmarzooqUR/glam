import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper'

export default function ProductDetails({ currentProduct, navigation }){
  return (
    <View style={styles.content}>
      <Button onPress={()=>navigation.navigate('Edit')}>
      	Edit
			</Button>
      <Button>
        Delete
      </Button>
    </View>
  )
}


const styles = StyleSheet.create({
	content:{
		padding:10
	}
})