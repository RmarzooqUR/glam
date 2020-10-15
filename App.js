import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json'
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';
import ProductEdit from './components/productEdit';
import ProductAdd from './components/productAdd';
import Login from './components/login';
import Signup from './components/signup';
import AuthContxt, { AuthContextProvider } from './components/contexts/AuthContext';



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'coral',
    accent: 'yellow',
  },
};

const Stack = createStackNavigator();


export default function App() {

  return (
    <AuthContextProvider>
      <PaperProvider theme={theme}>
        <AppContent />
      </PaperProvider>
    </AuthContextProvider>
  );
}



function AppContent(){
	const currContxt = useContext(AuthContxt);

	return (
			<NavigationContainer>
        <Stack.Navigator>
          {currContxt.userdata?(
          	<>
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
	          </>
        	):(
        		<>
          		<Stack.Screen
		            name='Login'
		            component={Login}
		          />
		          <Stack.Screen
		            name='Signup'
		            component={Signup}
          		/>
        		</>
          )}
        </Stack.Navigator>
      </NavigationContainer>
		)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
