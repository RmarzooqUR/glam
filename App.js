import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json'
// import LoginSignup from './components/loginSignup';
// import Login from './components/login';
// import Signup from './components/signup';
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';
import ProductEdit from './components/productEdit';
import ProductAdd from './components/productAdd';



const Stack = createStackNavigator();



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'coral',
    accent: 'yellow',
  },
};



export default function App() {
  const [loggedin, checkLoggedin] = useState();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {/*<Stack.Screen
            name='Login/Signup'
            component={LoginSignup}
          />
          <Stack.Screen
            name='Login'
            component={Login}
          />
          <Stack.Screen
            name='Signup'
            component={Signup}
          />*/}
          <Stack.Screen
            name='Products'
            component={ProductList}
          />
          <Stack.Screen
            // should have conditional rendering
            // buttons for editing of product
            name='Details'
            component={ProductDetails}
          />
          <Stack.Screen
            name='Edit'
            component={ProductEdit}
          />
          <Stack.Screen
            name='Add'
            component={ProductAdd} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
