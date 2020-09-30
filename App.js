import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginSignup from './components/loginSignup';
import Login from './components/login';
import Signup from './components/signup';
import ProductDetails from './components/productDetails';
import ProductList from './components/productDetails';
import ProductEdit from './components/productEdit'

const Stack = createStackNavigator();


export default function App() {
  const [loggedin, checkLoggedin] = useState();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login_signup_option_page'
          component={LoginSignup}
        />
        <Stack.Screen
          name='Login_screen'
          component={Login}
        />
        <Stack.Screen
          name='Signup_screen'
          component={Signup}
        />
        <Stack.Screen
          name='Products_list_screen'
          component={ProductList}
        />
        <Stack.Screen
          // should have conditional rendering
          // buttons for editing of product
          name='Product_details_screen'
          component={ProductDetails}
        />
        <Stack.Screen
          name='Product_edit_screen'
          component={ProductEdit}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
